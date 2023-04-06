<template>
  <div :class="b()">
    <div
      ref="container"
      :class="b('container')"
    ></div>
  </div>
</template>

<script lang="ts">
  import {
    defineComponent,
    PropType,
    Ref,
    ref,
  } from 'vue';
  import loadScript from '@/helpers/load-script';
  import sessionStore from '@/stores/session';

  interface ISetup {
    container: Ref<HTMLDivElement>;
  }

  interface IData {

    /**
     * Holds the related Google Maps instance.
     */
    mapInstance: google.maps.Map | null;

    /**
     * Holds a list of map markers.
     */
    markers: google.maps.Marker[];

    /**
     * Holds the debounce timeout for the bounding.
     */
    boundingTimeout: ReturnType<typeof setTimeout> | null;

    /**
     * Determines if the component is allowed to auto update the bounding.
     */
    allowAutoUpdates: boolean;
  }

  type TCGoogleMapsCallback = () => void;

  export interface ICGoogleMapsLocation {
    lat?: string | number | null;
    lng?: string | number | null;
    geocode?: string;
    icon?: string;
    title?: string;
  }

  interface ICGoogleMapsInternalLocation extends ICGoogleMapsLocation{
    referer: ICGoogleMapsLocation;
  }

  interface IEventClick {
    location: ICGoogleMapsLocation;
    marker: google.maps.Marker;
  }

  declare global {
    interface Window {
      cGoogleMapsInitMap: TCGoogleMapsCallback;
    }
  }

  const callbackStack: TCGoogleMapsCallback[] = [];
  const callbackFunctionName = 'cGoogleMapsInitMap';

  let geocoder: google.maps.Geocoder | null = null;
  let isMapsAPILoaded = false;

  export const GOOGLE_MAPS_THEME_GRAY: google.maps.MapTypeStyle[] = [ // @see https://snazzymaps.com/style/15/subtle-grayscale
    {
      featureType: 'administrative',
      elementType: 'all',
      stylers: [{ saturation: '-100' }],
    },
    {
      featureType: 'administrative.province',
      elementType: 'all',
      stylers: [{ visibility: 'off' }],
    },
    {
      featureType: 'landscape',
      elementType: 'all',
      stylers: [
        {
          saturation: -100,
        },
        {
          lightness: 65,
        },
        {
          visibility: 'on',
        },
      ],
    },
    {
      featureType: 'landscape.man_made',
      elementType: 'all',
      stylers: [
        {
          lightness: -10,
        },
      ],
    },
    {
      featureType: 'poi',
      elementType: 'all',
      stylers: [
        {
          saturation: -100,
        },
        {
          lightness: '50',
        },
        {
          visibility: 'simplified',
        },
      ],
    },
    {
      featureType: 'road',
      elementType: 'all',
      stylers: [
        {
          saturation: '-100',
        },
      ],
    },
    {
      featureType: 'road.highway',
      elementType: 'all',
      stylers: [
        {
          visibility: 'simplified',
        },
      ],
    },
    {
      featureType: 'road.arterial',
      elementType: 'all',
      stylers: [
        {
          lightness: '30',
        },
      ],
    },
    {
      featureType: 'road.local',
      elementType: 'all',
      stylers: [
        {
          lightness: '40',
        },
      ],
    },
    {
      featureType: 'transit',
      elementType: 'all',
      stylers: [
        {
          saturation: -100,
        },
        {
          visibility: 'simplified',
        },
      ],
    },
    {
      featureType: 'water',
      elementType: 'geometry',
      stylers: [
        {
          hue: '#ffff00',
        },
        {
          lightness: -25,
        },
        {
          saturation: -97,
        },
      ],
    },
    {
      featureType: 'water',
      elementType: 'labels',
      stylers: [
        {
          lightness: -25,
        },
        {
          saturation: -100,
        },
      ],
    },
  ];

  /**
   * Set isMapsAPILoaded to true, call the callback, then remove all callbacks in callbackStack array.
   */
  window[callbackFunctionName] = (): void => {
    isMapsAPILoaded = true;
    callbackStack.forEach(callback => callback());
    callbackStack.length = 0;
  };

  /**
   * This function checks whether the Map API has already been loaded once.
   */
  function loadMapsAPI(callback: TCGoogleMapsCallback): void {
    const useSessionStore = sessionStore();
    const apiKey = useSessionStore.googleMapsApiKey;

    if (!apiKey) {
      throw new Error('No Google Maps API key provided.');
    }

    if (isMapsAPILoaded) {
      callback();
    } else {
      const url = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&callback=${callbackFunctionName}`;

      callbackStack.push(callback);

      loadScript(url);
    }
  }

  /**
   * Renders a Google Map.
   */
  export default defineComponent({
    name: 'c-google-maps',

    // components: {},

    props: {
      /**
       * Expects a list of locations (markers). You can define additional properties if required.
       *
       * lat/lng OR geocode MUST be defined!
       */
      locations: {
        type: Array as PropType<ICGoogleMapsLocation[]>,
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
        validator(value: string) {
          return [
            'default',
            'gray',
          ].includes(value);
        },
      },

      /**
       * Allows enabling/disabling auto bounding.
       */
      bounds: {
        type: Boolean,
        default: true,
      },

      /**
       * Allows defining the map to be centered.
       */
      center: {
        type: Boolean,
        default: true,
      },

      /**
       * Allows passing custom bounds.
       *
       * @see https://developers.google.com/maps/documentation/javascript/reference/coordinates#LatLngBounds
       */
      customBounds: {
        type: Object as PropType<google.maps.LatLngBounds>,
        default: null,
      },

      /**
       * Allows to set a size for custom icons.
       */
      iconSize: {
        type: Number,
        default: 40,
      },

      /**
       * Allows defining additional styles for the current theme. e.g. to hide business POIs
       */
      styles: {
        type: Array as PropType<google.maps.MapTypeStyle[]>,
        default: () => [],
      },

      /**
       * Allows to specify a custom Google Maps config.
       *
       * @see https://developers.google.com/maps/documentation/javascript/reference/map
       */
      mapsConfig: {
        type: Object as PropType<google.maps.MapOptions>,
        default: null,
      },
    },
    emits: {
      click: (payload: IEventClick) => !!(payload?.location && payload?.marker),
    },

    setup(): ISetup {
      const container = ref();

      return {
        container,
      };
    },
    data(): IData {
      return {
        mapInstance: null,
        markers: [],
        boundingTimeout: null,
        allowAutoUpdates: true,
      };
    },

    computed: {
      /**
       * Maps the locations to the Google Maps required format.
       */
      mappedLocations(): ICGoogleMapsInternalLocation[] {
        return this.locations?.map((location) => {
          const { lat, lng } = location;

          return {
            lat: lat ? parseFloat(`${lat}`) : null,
            lng: lng ? parseFloat(`${lng}`) : null,
            icon: location.icon,
            geocode: location.geocode,
            title: location.title,
            referer: location, // Keep a reference to the original for event payloads.
          };
        }) || [];
      },

      /**
       * Returns a style definition based on the given theme.
       */
      mapStyles(): google.maps.MapTypeStyle[] {
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
    beforeUnmount() {
      this.$el.removeEventListener('mousedown', this.disableAutoUpdates);
    },
    // unmounted() {},

    methods: {
      /**
       * Updates the 'allowAutoUpdates' flag.
       */
      disableAutoUpdates(): void {
        this.allowAutoUpdates = false;
      },

      /**
       * Initialize the google maps with the default values.
       *
       * TODO: note, that Google does not support destroying an instance... @see https://stackoverflow.com/questions/10485582/what-is-the-proper-way-to-destroy-a-map-instance
       */
      createMapInstance(): void {
        if (!this.mappedLocations?.length && !this.center) {
          const errorMsg = 'Neither locations nor a center coordinate was given. At least one of them is needed to create a Google Maps.'; // eslint-disable-line vue/max-len

          throw new Error(errorMsg);
        }

        this.mapInstance = new window.google.maps.Map(this.container, {
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
          const markerPosition = this.markers[0].getPosition();

          if (markerPosition) {
            this.mapInstance?.setCenter(markerPosition);
          }
        }
      },

      /**
       * Maps custom icons for the Google Maps. If no source is given, the default icon will be used.
       */
      mapIcon(iconSrc: string): google.maps.Icon|google.maps.Symbol | null {
        if (!iconSrc || typeof iconSrc !== 'string') {
          return null;
        }

        const { iconSize } = this;

        return {
          url: iconSrc,
          scaledSize: iconSize ? new window.google.maps.Size(iconSize, iconSize) : null,
        };
      },

      /**
       * Updates the markers on the map for the component locations.
       */
      createMarkersForLocations(): void {
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
      createMakerFromAddress(location: ICGoogleMapsInternalLocation): void {
        if (!location.geocode) {
          throw new Error("Unable to geocode a location without 'geocode' information.");
        }

        geocoder?.geocode({ address: location.geocode }, (results, status) => {
          if (status === 'OK') {
            const fitBounds = this.allowAutoUpdates && !this.center && this.bounds !== false;

            if (!results?.length) {
              return;
            }

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
       * @returns {Property.Marker}
       */
      createMarker(location: ICGoogleMapsInternalLocation): google.maps.Marker {
        const marker = new window.google.maps.Marker({
          position: {
            lat: location.lat,
            lng: location.lng,
          },
          map: this.mapInstance,
          icon: location.icon ? this.mapIcon(location.icon) : null,
          title: location.title,
        } as google.maps.MarkerOptions);

        marker.addListener('click', () => {
          this.$emit('click', { location: location.referer, marker });
        });

        this.markers.push(marker);

        return marker;
      },

      /**
       * Function zooms the map to fit all the pointers on the map.
       */
      fitBounds(): void {
        if (this.boundingTimeout) {
          clearTimeout(this.boundingTimeout);
        }

        this.boundingTimeout = setTimeout(() => {
          const { customBounds } = this;

          if (!this.mapInstance) {
            return;
          }

          if (customBounds) {
            this.mapInstance.fitBounds(customBounds);
          } else {
            const locationsBounds = new window.google.maps.LatLngBounds();

            this.markers.forEach(marker => locationsBounds.extend(marker.getPosition() as google.maps.LatLng));
            this.mapInstance.fitBounds(locationsBounds);
          }
        }, 200);
      },
    },
    // render() {},
  });
</script>

<style lang="scss">
  // @use '../setup/scss/variables';

  .c-google-maps {
    height: 50vh;

    &__container {
      height: 100%;
    }
  }
</style>
