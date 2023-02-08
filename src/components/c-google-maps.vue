<template>
  <div :class="b()">
    <div
      ref="container"
      :class="b('container')"
    ></div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import store from '@/store/index';
  import loadScript from '@/helpers/load-script';
  import { GOOGLE_MAPS_THEME_GRAY } from '@/setup/globals';

  const callbackStack = [];
  let geocoder;
  let isMapsAPILoaded = false;

  /**
   * Set isMapsAPILoaded to true, call the callback, then remove all callbacks in callbackStack array.
   */
  window.cGoogleMapsInitMap = () => {
    isMapsAPILoaded = true;

    callbackStack.forEach(callback => callback());

    callbackStack.length = 0;
  };

  /**
   * This function checks whether the Map API has already been loaded once.
   *
   * @param {Function} callback - Callback method that is called when the Map API has been initialized successfully.
   */
  function loadMapsAPI(callback) {
    const apiKey = store.getters['session/getGoogleMapsApiKey'];

    if (!apiKey) {
      throw new Error('No Google Maps API key provided.');
    }

    if (isMapsAPILoaded) {
      callback();
    } else {
      const url = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&callback=cGoogleMapsInitMap`;

      callbackStack.push(callback);

      loadScript(url);
    }
  }

  /**
   * Renders a Google Map.
   */
  export default {
    name: 'c-google-maps',

    // components: {},
    // mixins: [],

    props: {
      /**
       * Expects a list of locations (markers). You can define additional properties if required.
       *
       * lat/lng OR geocode MUST be defined!
       *
       * @property {Number} [lat] - The latitude of the location.
       * @property {Number} [lng] - The longitude of the location.
       * @property {String} [geocode] - An address string, that should be used to geocode lat/lng if they are missing.
       * @property {String} [icon] - A specific icon source for the location.
       * @property {String} [title] - A title for the marker icon.
       */
      locations: {
        type: Array,
        required: true,
      },

      /**
       * Allows to use an alternative map theme.
       *
       * Valid values: `[default, gray]`
       */
      theme: {
        type: String,
        default: 'default',
        validator(value) {
          return [
            'default',
            'gray',
          ].includes(value);
        },
      },

      /**
       * Allows to set a custom bounds or en-/disable the auto bounding.
       *
       * @see https://developers.google.com/maps/documentation/javascript/reference/coordinates#LatLngBounds
       */
      bounds: {
        type: [Boolean, Object],
        default: true,
      },

      /**
       * Allows to set a size for custom icons.
       */
      iconSize: {
        type: Number,
        default: 40,
      },

      /**
       * Allows to define additional styles for the current theme. e.g. to hide business POIs
       */
      styles: {
        type: Array,
        default: () => [],
      },

      /**
       * Allows to specify a custom Google Maps config.
       *
       * @see https://developers.google.com/maps/documentation/javascript/reference/map
       */
      mapsConfig: {
        type: Object,
        default: null,
      },
    },
    data() {
      return {
        /**
         * @type {Object} Holds the related Google Maps instance.
         */
        mapInstance: null,

        /**
         * @type {Array.<Object>} Holds a list of map markers.
         */
        markers: [],

        /**
         * @type {Number} Holds the debounce timeout for the bounding.
         */
        boundingTimeout: null,

        /**
         * @type {Boolean} Determines if the component is allowed to auto update the bounding.
         */
        allowAutoUpdates: true,
      };
    },

    computed: {
      ...mapGetters('session', [
        'getGoogleMapsApiKey',
      ]),

      /**
       * Maps the locations to the Google Maps required format.
       *
       * @returns {Array.<Object>}
       */
      mappedLocations() {
        return this.locations?.map(location => ({
          lat: parseFloat(location.lat),
          lng: parseFloat(location.lng),
          icon: location.icon,
          geocode: location.geocode,
          title: location.title,
          referer: location, // Keep a reference to the original for event payloads.
        })) || [];
      },

      /**
       * Returns a style definition based on the given theme.
       *
       * @returns {Array.<Object>}
       */
      mapStyles() {
        switch (this.theme) {
          case 'gray':
            return [...GOOGLE_MAPS_THEME_GRAY, ...this.styles];

          default:
            return this.styles;
        }
      },
    },
    // watch: {},

    beforeCreate() {
      loadMapsAPI(() => {
        geocoder = new window.google.maps.Geocoder();

        this.$nextTick(() => {
          this.createMapInstance();
        });
      });
    },
    // created() {},
    // beforeMount() {},
    mounted() {
      this.$el.addEventListener('mousedown', this.disableAutoUpdates, { once: true, passive: true });
    },
    // beforeUpdate() {},
    // updated() {},
    // activated() {},
    // deactivated() {},
    beforeDestroy() {
      this.$el.removeEventListener('mousedown', this.disableAutoUpdates);
    },
    // destroyed() {},

    methods: {
      /**
       * Updates the 'allowAutoUpdates' flag.
       */
      disableAutoUpdates() {
        this.allowAutoUpdates = false;
      },

      /**
       * Initialize the google maps with the default values.
       *
       * TODO: note, that Google does not support destroying an instance... @see https://stackoverflow.com/questions/10485582/what-is-the-proper-way-to-destroy-a-map-instance
       */
      createMapInstance() {
        if (!this.mappedLocations?.length && !this.center) {
          const errorMsg = 'Neither locations nor a center coordinate was given. At least one of them is needed to create a Google Maps.';

          throw new Error(errorMsg);
        }

        this.mapInstance = new window.google.maps.Map(this.$refs.container, {
          // Fallbacks
          maxZoom: 18,
          zoom: 12,

          // Custom
          ...this.mapsConfig,

          // Static
          center: this.mapsConfig?.center || { lat: 0, lng: 0 },
          styles: this.mapStyles,
        });

        this.createMarkersForLocations();

        // Make sure something is visible.
        if (this.bounds) {
          this.fitBounds();
        } else if (!this.center && this.markers[0]) {
          this.mapInstance.setCenter(this.markers[0].getPosition());
        }
      },

      /**
       * Maps custom icons for the Google Maps. If no source is given, the default icon will be used.
       *
       * @param {String} [iconSrc] - Accepts an url for a custom icon.
       *
       * @returns {Object|null}
       */
      mapIcon(iconSrc) {
        if (!iconSrc || typeof iconSrc !== 'string') {
          return null;
        }

        return {
          url: iconSrc,
          scaledSize: new window.google.maps.Size(this.iconSize, this.iconSize),
        };
      },

      /**
       * Updates the markers on the map for the component locations.
       */
      createMarkersForLocations() {
        this.mappedLocations.forEach((location) => {
          if (!location.lat || !location.lng) {
            this.createMakerFromAddress(location);

            return;
          }

          this.createMarker(location);
        });

        if (this.bounds && this.markers.length) {
          this.fitBounds();
        }
      },

      /**
       * Try to create a marker from an address string.
       *
       * @param {Object} location - A location object.
       * @param {String} location.geocode - An address string, that will be used to calculate the coordinates.
       */
      createMakerFromAddress(location) {
        if (!location.geocode) {
          throw new Error("Unable to geocode a location without 'geocode' information.");
        }

        geocoder.geocode({ address: location.geocode }, (results, status) => {
          if (status === 'OK') {
            const fitBounds = this.allowAutoUpdates && !this.center && this.bounds !== false;

            this.createMarker({
              ...location,
              lat: results[0].geometry.location.lat(),
              lng: results[0].geometry.location.lng(),
            });

            if (fitBounds) {
              this.fitBounds();
            }
          } else {
            throw new Error(`Geocode was not successful for the following reason: ${status}`);
          }
        });
      },

      /**
       * Creates a new marker on the current map.
       *
       * @param {Object} location - The location for which the marker should be added.
       * @param {Number} location.lat - The latitude for the location.
       * @param {Number} location.lng - The longitude for the location.
       *
       * @returns {Property.Marker}
       */
      createMarker(location) {
        const marker = new window.google.maps.Marker({
          position: {
            lat: location.lat,
            lng: location.lng,
          },
          map: this.mapInstance,
          icon: this.mapIcon(location.icon),
          title: location.title,
        });

        marker.addListener('click', () => {
          this.$emit('click', { location: location.referer, marker });
        });

        this.markers.push(marker);

        return marker;
      },

      /**
       * Function zooms the map to fit all the pointers on the map.
       */
      fitBounds() {
        clearTimeout(this.boundingTimeout);

        this.boundingTimeout = setTimeout(() => {
          const { bounds } = this;

          if (bounds instanceof window.google.maps.LatLngBounds) {
            this.mapInstance.fitBounds(bounds);
          } else {
            const locationsBounds = new window.google.maps.LatLngBounds();

            this.markers.forEach(marker => locationsBounds.extend(marker.position));

            this.mapInstance.fitBounds(locationsBounds);
          }
        }, 200);
      },
    },
    // render() {},
  };
</script>

<style lang="scss">
  @use '../setup/scss/variables' as *;
  @use '../setup/scss/mixins' as *;
  @use '../setup/scss/functions' as *;
  // @use '../setup/scss/extends' as *;

  .c-google-maps {
    height: 50vh;

    &__container {
      height: 100%;
    }
  }
</style>
