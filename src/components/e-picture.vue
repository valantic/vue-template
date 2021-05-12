<template>
  <picture :class="b(modifiers)" :style="style">
    <source v-for="(mediaSrcset, mediaQuery) in sources"
            :key="mediaQuery"
            :media="mediaQuery"
            :srcset="mediaSrcset"
    >
    <img :sizes="mappedSizes"
         :srcset="srcset"
         :src="fallback"
         :alt="alt"
         :loading="loading"
         :width="width || (ratio && fallbackWidth)"
         :height="height || (ratio && ratio * fallbackWidth)"
         @load="onLoad"
    >
  </picture>
</template>

<script>
  import { BREAKPOINTS_MAX } from '@/setup/globals';

  /**
   * Renders a picture element with srcset or sources, depending on provided data.
   */
  export default {
    name: 'e-picture',
    status: 0, // TODO: remove when component was prepared for current project.

    // components: {},
    // mixins: [],

    props: {
      /**
       * Accepts a srcset string of comma separated sources with width value.
       *
       * `'large.jpg 800w, medium.jpg 600w, ...'`
       */
      srcset: {
        type: String,
        default: null,
      },

      /**
       * Accepts an Object of key/value pairs which represent media/srcset for sources.
       *
       * `{ <media>: <srcset>, ... }`
       */
      sources: {
        type: Object,
        default: null,
      },

      /**
       * The alternative text, which is displayed if the image can not be loaded.
       */
      alt: {
        type: String,
        required: true,
      },

      /**
       * The fallback image path.
       */
      fallback: {
        type: String,
        required: true,
      },

      /**
       * Allows to add a ratio keeper pseudo element, which will preserve the vertical space of the final image.
       *
       * e.g. `1` is a ratio of 1:1 (600px x 600px), `0.75` is a ratio of 0.75:1 (600px x 800px)
       */
      ratio: {
        type: [Number, String],
        default: null,
      },

      /**
       * Sizes definition for srcset use
       *
       * `{ <breakpoint (px value|short name)>: <minWidth>, ... }`
       */
      sizes: {
        type: Object,
        default: null,
      },

      /**
       * Defines if image is displayed as inline-block element.
       */
      inline: {
        type: Boolean,
        default: false,
      },

      /**
       * Allows to enable native lazy loading.
       *
       * For browser support @see https://caniuse.com/?search=load
       */
      loading: {
        type: String,
        default: 'lazy',
        validator(value) {
          return [
            'lazy',
            'eager',
            'auto',
          ].includes(value);
        },
      },

      /**
       * Allows to set the image width.
       */
      width: {
        type: [String, Number],
        default: null,
      },

      /**
       * Allows to set the image height.
       */
      height: {
        type: [String, Number],
        default: null,
      },

      /**
       * Show a placeholder image while the image is loading or is not available.
       */
      placeholder: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        /**
         * @type {Boolean} - Becomes true if the image is loaded.
         */
        loaded: false,

        /**
         * @type {Number} Holds a fallback width in case only the ratio is defined.
         */
        fallbackWidth: 400,
      };
    },

    computed: {
      /**
       * Returns an object of BEM modifiers.
       *
       * @returns {Object}
       */
      modifiers() {
        return {
          inline: this.inline,
          ratio: !!this.ratio,
          loaded: this.loaded,
          placeholder: this.placeholder,
        };
      },

      /**
       * Calculates root element styles.
       *
       * @returns {Object}
       */
      style() {
        const { ratio } = this;

        return ratio
          ? { '--aspect-ratio': ratio }
          : null;
      },

      /**
       * Converts sizes object to string.
       *
       * @returns {String|null}
       */
      mappedSizes() {
        const { sizes } = this;

        if (!sizes) {
          return null;
        }

        const mappedSizesBreakpoints = {};
        const fallback = ',100vw';

        return Object
          .keys(sizes)
          .map((breakpoint) => {
            const key = Number.isNaN(BREAKPOINTS_MAX[breakpoint]) // The viewport could be 0, so we need to test the type.
              ? breakpoint
              : BREAKPOINTS_MAX[breakpoint];

            mappedSizesBreakpoints[key] = sizes[breakpoint];

            return key;
          })
          .filter(Boolean)
          .sort((a, b) => (a > b ? 1 : -1))
          .map((breakpoint) => {
            const viewWidth = Math.floor((mappedSizesBreakpoints[breakpoint] / breakpoint) * 100);

            return `(max-width: ${breakpoint}px) ${viewWidth}vw`;
          })
          .join(',') + fallback;
      },
    },
    // watch: {},

    // beforeCreate() {},
    created() {
      if (process.env.NODE_ENV === 'production') {
        if (!this.srcset && !this.sources && !this.fallback) {
          console.error("Neither 'srcset' nor 'sources' or 'fallback' where defined."); // eslint-disable-line no-console
        } else if (this.srcset && !this.sizes) {
          console.error("No 'sizes' where defined while using 'srcset'."); // eslint-disable-line no-console
        }
      }
    },
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
       * Load event handler for the image element.
       */
      onLoad() {
        this.loaded = true;
      },
    },
    // render() {},
  };
</script>

<style lang="scss">
  .e-picture { // Can be <picture> or <img>!
    display: block;
    max-width: 100%;
    height: auto;

    img {
      display: block;
      max-width: 100%;
      width: 100%;
      height: auto;

      &[loading='lazy'] {
        opacity: 0;
        transition: opacity $transition-duration-200;
      }
    }

    &--loaded img[loading] { // Attribute selector was required to increase weight.
      opacity: 1;
    }

    &--inline {
      display: inline-block;

      img {
        display: inline-block;
      }
    }

    &--ratio {
      &::before {
        display: block;
        content: '';
        float: left;
        padding-top: calc(100% / var(--aspect-ratio));
      }

      &::after {
        display: table;
        content: '';
        clear: both;
      }

      @supports (aspect-ratio: initial) {
        aspect-ratio: var(--aspect-ratio) / 1;

        &::before,
        &::after {
          content: none;
        }
      }
    }

    &--placeholder {
      background-color: $color-grayscale--500;
    }
  }
</style>
