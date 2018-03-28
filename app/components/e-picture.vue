<template>
  <span :class="b()">
    <!-- IF has sizes -->
    <v-lazy-image
      v-if="lazyload"
      :class="b('image')"
      :srcset="parsedSrcset"
      :sizes="parsedSizes"
      :src="fallback"
    @load="load"/>
    <img v-else
         :class="b('image')"
         :srcset="parsedSrcset"
         :sizes="parsedSizes"
         src=""
         alt="">
    <!-- ELSE -->
    <!-- picture as before -->
  </span>
</template>

<script>
  import { BREAKPOINTS } from '@/setup/globals';
  import VLazyImage from 'v-lazy-image';

  export default {
    name: 'e-picture',
    components: {
      VLazyImage
    },
    // mixins: [],

    props: {
      /**
       * TODO: Could be realized with CSS variables (would only close out IE) else I guess we have to use JS (=> window.CSS.supports())
       * attr() is not working outside of "content"
       *
       * https://css-tricks.com/aspect-ratio-boxes/
       */
      ratio: {
        type: String,
        default: null
      },
      sizes: {
        type: Object,
        default: () => ({
          1024: 500,
          xs: 250,
          md: 350,
        })
      },
      srcset: {
        type: Object,
        default: () => ({
          180: 'http://via.placeholder.com/180x150',
          1440: 'http://via.placeholder.com/1440x150',
          800: 'http://via.placeholder.com/800x150',
          350: 'http://via.placeholder.com/350x150',
        })
      },
      lazyload: { // Note: breaks srcset in IE11, because picturefill will be initialized AFTER the fallback has been loaded
        type: Boolean,
        default: true
      }
    },
    // data() {
    //   return {};
    // },

    computed: {
      parsedSrcset() {
        const srcBreakpoints = Object.keys(this.srcset);

        return srcBreakpoints.map(breakpoint => `${this.srcset[breakpoint]} ${breakpoint}w`).join(',');
      },
      parsedSizes() {
        const mappedSizesBreakpoints = {};
        const sizesBreakpoints = Object
          .keys(this.sizes)
          .map((breakpoint) => {
            const key = typeof BREAKPOINTS[breakpoint] === 'number' ? BREAKPOINTS[breakpoint] : breakpoint;

            mappedSizesBreakpoints[key] = this.sizes[breakpoint];

            return key;
          })
          .sort((a, b) => (a < b ? 1 : -1)); // eslint-disable-line no-extra-parens
        const fallback = ',100vw';

        console.log("parsedSizeBreakpoints", sizesBreakpoints, sizesBreakpoints[sizesBreakpoints.length - 1]);

        return sizesBreakpoints
        // Converts sizes to query string and width pixel values to vw
          .map(breakpoint => {
            return breakpoint ? `(min-width: ${breakpoint}px) ${(mappedSizesBreakpoints[breakpoint] / breakpoint) * 100}vw` : '';
          })
          .filter(breakpoint => !!breakpoint)
          .join(',') + fallback;
      },

      /**
       * Gets the biggest possible image from srcset
       *
       * @returns {*}
       */
      fallback() {
        const sources = Object
          .keys(this.srcset)
          .map(key => parseInt(key))
          .sort((a, b) => (a < b ? -1 : 1)); // eslint-disable-line no-extra-parens

        return this.srcset[sources[sources.length - 1]];
      }
    },
    // watch: {},

    // beforeCreate() {},
    // created() {},
    // beforeMount() {},
    // mounted() {},
    // beforeUpdate() {},
    // updated() {},
    // activated() {},
    // deactivated() {},
    // beforeDestroy() {},
    // destroyed() {},

    methods: {
      /**
       * On v-lazy-image load, refresh picturefill instance for this image
       */
      load() {
        window.picturefill({
          reevaluate: true,
          elements: [this.$el.querySelector('img')],
        });
      }
    },
    // render() {},
  };
</script>

<style lang="scss">
  .e-picture {
    &__image {
      max-width: 100%;
    }
  }
</style>
