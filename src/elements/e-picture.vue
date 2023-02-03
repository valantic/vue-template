<template>
  <picture :class="b(modifiers)" :style="style">
    <source v-for="(mediaSrcset, mediaQuery) in sources"
            :key="mediaQuery"
            :media="mediaQuery"
            :srcset="mediaSrcset"
    >
    <img ref="image"
         :sizes="mappedSizes"
         :srcset="src"
         :src="fallback"
         :alt="alt"
         :loading="loading"
         :width="width || (ratio && ratio * fallbackHeight)"
         :height="height || (ratio && fallbackHeight)"
         :decoding="decoding"
         @load="onLoad"
         @error="handleError"
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
        default: null,
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
       * The special breakpoint 'fallback' can be used to set the max-width, the image will ever be displayed.
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
       * Allows to move the image decoding off the main thread. This should be 'sync' or 'auto' for images above the fold.
       *
       * For browser support @see https://caniuse.com/mdn-html_elements_img_decoding
       */
      decoding: {
        type: String,
        default: 'async',
        validator(value) {
          return [
            'sync',
            'async',
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
        default: true,
      },
    },
    data() {
      return {
        /**
         * @type {Boolean} - Becomes true if the image is loaded.
         */
        loaded: false,

        /**
         * @type {String} Holds srcset string of comma separated sources with width value.
         */
        src: this.srcset,

        /**
         * @type {Number} Holds a fallback width in case only the ratio is defined.
         */
        fallbackHeight: 400,

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
        const fallback = sizes.fallback ? `${sizes.fallback}px` : '100vw';
        const mappedSizes = Object
          .keys(sizes)
          .map((breakpoint) => {
            if (breakpoint === 'fallback') {
              return null;
            }

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
          });

        mappedSizes.push(fallback);

        return mappedSizes.join(',');
      },
    },

    // watch: {},
    // beforeCreate() {},
    // created() {},
    // beforeMount() {},
    mounted() {
      const hasSrcSet = !!this.srcset;

      if (process.env.NODE_ENV === 'production') {
        if (!hasSrcSet && !this.sources && !this.fallback) {
          console.error("Neither 'srcset' nor 'sources' or 'fallback' where defined.", this.$el); // eslint-disable-line no-console
        } else if (hasSrcSet && !this.sizes) {
          console.error("No 'sizes' where defined while using 'srcset'.", this.$el); // eslint-disable-line no-console
        }
      } else {
        if (hasSrcSet && (!this.ratio && (!this.width || !this.height))) { // eslint-disable-line no-lonely-if
          console.error("Neither a combination of 'width'/'height' nor 'ratio' was defined.", this.$el); // eslint-disable-line no-console
        }
      }
    },
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
      handleError() {
        this.src = this.fallback;
      }
    },
    // render() {},
  };
</script>

<style lang="scss">
  @use 'sass:list';
  @use '../setup/scss/variables';

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
        transition: opacity variables.$transition-duration--200;
      }
    }

    &--loaded img[loading] { // Attribute selector was required to increase weight.
      opacity: 1;
    }

    &--inline {
      display: inline-block;
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
        aspect-ratio: list.slash(var(--aspect-ratio), 1);

        &::before,
        &::after {
          content: none;
        }
      }
    }

    &--placeholder {
      background-color: variables.$color-grayscale--200;
    }
  }
</style>
