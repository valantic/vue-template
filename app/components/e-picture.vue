<template>
  <div :class="b({ lazyload })">
    <!-- IF is img with srcset and sizes -->
    <template v-if="sizes && srcset">
      <img
        v-if="lazyload"
        :class="b('image')"
        :data-srcset="parsedSrcset"
        :sizes="parsedSizes"
        :data-src="fallback"
        src=""
        alt=""
        class="lazyload">
      <img
        v-else
        :class="b('image')"
        :srcset="parsedSrcset"
        :sizes="parsedSizes"
        src=""
        alt="">
    </template>

    <!-- IF is picture element -->
    <template v-else-if="sources">
      <picture v-if="lazyload">
        <source
          v-for="source in parsedSources"
          :key="source.sort"
          :data-srcset="source.srcset"
          :media="source.media">
        <img
          :class="b('image')"
          :data-src="fallback"
          class="lazyload"
          alt="">
      </picture>
      <picture v-else>
        <source
          v-for="source in parsedSources"
          :key="source.sort"
          :srcset="source.srcset"
          :media="source.media">
        <img
          :class="b('image')"
          :src="fallback"
          alt="">
      </picture>
    </template>

    <img
      v-else-if="lazyload"
      :class="b('image')"
      :data-src="fallback"
      class="lazyload"
      alt="">

    <img
      v-else
      :class="b('image')"
      :src="fallback"
      alt="">
  </div>
</template>

<script>
  import { BREAKPOINTS } from '@/setup/globals';

  export default {
    name: 'e-picture',
    // components: {},
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
        default: null // () => ({
        // 180: 'http://via.placeholder.com/180x150',
        // 1440: 'http://via.placeholder.com/1440x150',
        // 800: 'http://via.placeholder.com/800x150',
        // 350: 'http://via.placeholder.com/350x150',
        // })
      },
      sources: {
        type: Object,
        default: () => ({
          0: ['http://via.placeholder.com/180x150 1x', 'http://via.placeholder.com/360x300 2x'],
          1440: ['http://via.placeholder.com/1440x150 1x', 'http://via.placeholder.com/2880x300 2x'],
          800: ['http://via.placeholder.com/800x150 1x', 'http://via.placeholder.com/1600x300 2x'],
          sm: ['http://via.placeholder.com/350x150 1x', 'http://via.placeholder.com/700 2x'],
        })
      },
      lazyload: { // Note: breaks srcset in IE11, because picturefill will be initialized AFTER the fallback has been loaded
        type: Boolean,
        default: true
      },
      fallback: {
        type: String,
        default: 'http://via.placeholder.com/180x150/0000ff'
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
        if (!this.sizes) {
          return null;
        }

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

        return sizesBreakpoints
          .map(breakpoint => breakpoint // eslint-disable-line no-confusing-arrow
            // Converts sizes to query string and width pixel values to vw
            ? `(min-width: ${breakpoint}px) ${(mappedSizesBreakpoints[breakpoint] / breakpoint) * 100}vw`
            : '')
          .filter(breakpoint => !!breakpoint)
          .join(',') + fallback;
      },

      parsedSources() {
        if (!this.sources) {
          return null;
        }

        const mappedSourcesBreakpoints = [];

        Object
          .keys(this.sources)
          .forEach((breakpoint) => {
            const minWidth = typeof BREAKPOINTS[breakpoint] === 'number' ? BREAKPOINTS[breakpoint] : breakpoint;

            if (Number.isNaN(minWidth)) {
              throw new Error('Invalid breakpoint value for e-picture source.');
            }

            mappedSourcesBreakpoints.push({
              sort: minWidth,
              media: `(min-width: ${minWidth}px)`,
              srcset: this.sources[breakpoint].join(',')
            });
          });

        return mappedSourcesBreakpoints.sort((a, b) => (a.sort < b.sort ? 1 : -1)); // eslint-disable-line no-extra-parens
      },
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

    // methods: {},
    // render() {},
  };
</script>

<style lang="scss">
  .e-picture {
    padding-bottom: 200px;

    &__image {
      max-width: 100%;
    }
  }
</style>
