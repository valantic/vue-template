<template>
  <picture
    :class="b(modifiers)"
    :style="style"
  >
    <source
      v-for="(mediaSrcset, mediaQuery) in sources"
      :key="mediaQuery"
      :media="mediaQuery"
      :srcset="mediaSrcset"
    />
    <img
      :sizes="mappedSizes"
      :srcset="internalSrcSet"
      :src="fallback"
      :alt="alt"
      :loading="loading"
      :width="width || (ratio && ratio * fallbackHeight)"
      :height="height || (ratio && fallbackHeight)"
      :decoding="decoding"
      @load="onLoad"
      @error="onError"
    />
  </picture>
</template>

<script lang="ts">
  import { PropType, StyleValue, defineComponent } from 'vue';
  import { BREAKPOINTS_MAX } from '@/setup/globals';
  import { Modifiers } from '@/plugins/vue-bem-cn/src/globals';

  export type ImageSizes = {
    [key: keyof typeof BREAKPOINTS_MAX | 'fallback' | string]: number;
  };

  type SizePerBreakpoint = {
    [key: string]: number;
  };

  type Data = {
    loaded: boolean;
    fallbackHeight: number;
    internalSrcSet: string;
  };

  /**
   * Renders a picture element with srcset or sources, depending on provided data.
   */
  export default defineComponent({
    name: 'e-picture',

    // components: {},

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
        type: Number,
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
        type: Object as PropType<ImageSizes>,
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
        type: String as PropType<'lazy' | 'eager'>,
        default: 'lazy',
        validator: (value: string) => ['lazy', 'eager'].includes(value),
      },

      /**
       * Allows to move the image decoding off the main thread. This should be 'sync' or 'auto' for images above the fold.
       *
       * For browser support @see https://caniuse.com/mdn-html_elements_img_decoding
       */
      decoding: {
        type: String as PropType<'sync' | 'async' | 'auto'>,
        default: 'async',
        validator: (value: string) => ['sync', 'async', 'auto'].includes(value),
      },

      /**
       * Allows to set the image width.
       */
      width: {
        type: Number,
        default: null,
      },

      /**
       * Allows to set the image height.
       */
      height: {
        type: Number,
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
    data(): Data {
      return {
        /**
         * Becomes true if the image is loaded.
         */
        loaded: false,

        /**
         * Holds a fallback width in case only the ratio is defined.
         */
        fallbackHeight: 400,

        /**
         *  Holds srcset string of comma separated sources with width value.
         */
        internalSrcSet: this.srcset,
      };
    },

    computed: {
      /**
       * Returns an object of BEM modifiers.
       */
      modifiers(): Modifiers {
        return {
          inline: this.inline,
          ratio: !!this.ratio,
          loaded: this.loaded,
          placeholder: this.placeholder,
        };
      },

      /**
       * Calculates root element styles.
       */
      style(): StyleValue | undefined {
        const { ratio } = this;

        return ratio ? { '--aspect-ratio': ratio } : undefined;
      },

      /**
       * Converts sizes object to string.
       */
      mappedSizes(): string | undefined {
        if (!this.sizes) {
          return undefined;
        }

        const mappedSizesPerBreakpoints: SizePerBreakpoint = {};
        const fallback = this.sizes.fallback ? `,${this.sizes.fallback}px` : ',100vw';

        return (
          Object.keys(this.sizes)
            .map((size: string) => {
              if (size === 'fallback') {
                return null;
              }

              // check if the provided size key exists as breakpoint key
              // if yes, take the corresponding breakpoint value,
              // otherwise take the size key (which is a pixel value)
              const breakpointValue = BREAKPOINTS_MAX[size as keyof typeof BREAKPOINTS_MAX] || size;
              const imageSize = this.sizes[size];

              if (!imageSize) {
                return null;
              }

              mappedSizesPerBreakpoints[breakpointValue] = imageSize;

              return breakpointValue;
            })
            .filter((breakpointValue) => breakpointValue)
            // @ts-ignore Needed because typescript cannot detect if a/b is not null.
            .sort((a, b) => (a > b ? 1 : -1))
            .map((breakpoint) => {
              // @ts-ignore Needed because typescript cannot assign index.
              const viewWidth = Math.floor((mappedSizesPerBreakpoints[breakpoint] / breakpoint) * 100);

              return `(max-width: ${breakpoint}px) ${viewWidth}vw`;
            })
            .join(',') + fallback
        );
      },
    },
    // watch: {},

    // beforeCreate() {},
    // created() {},
    // beforeMount() {},
    mounted() {
      const hasSrcSet = !!this.srcset;

      if (import.meta.env.MODE === 'production') {
        if (!hasSrcSet && !this.sources && !this.fallback) {
          console.error("Neither 'srcset' nor 'sources' or 'fallback' where defined.", this.$el); // eslint-disable-line no-console
        } else if (hasSrcSet && !this.sizes) {
          console.error("No 'sizes' where defined while using 'srcset'.", this.$el); // eslint-disable-line no-console
        }
      } else {
        // eslint-disable-next-line no-lonely-if
        if (hasSrcSet && !this.ratio && (!this.width || !this.height)) {
          console.error("Neither a combination of 'width'/'height' nor 'ratio' was defined.", this.$el); // eslint-disable-line no-console
        }
      }
    },
    // beforeUpdate() {},
    // updated() {},
    // activated() {},
    // deactivated() {},
    // beforeUnmount() {},
    // unmounted() {},

    methods: {
      /**
       * Load event handler for the image element.
       */
      onLoad(): void {
        this.loaded = true;
      },

      /**
       * Load event handler when an error occurs with a image element.
       */
      onError(): void {
        this.internalSrcSet = this.fallback;
      },
    },
    // render() {},
  });
</script>

<style lang="scss">
  @use 'sass:list';
  @use '../setup/scss/variables';

  .e-picture {
    // Can be <picture> or <img>!
    display: block;
    max-width: 100%;

    img {
      display: block;
      width: 100%;

      &[loading='lazy'] {
        opacity: 0;
        transition: opacity variables.$transition-duration--200;
      }
    }

    &--loaded img[loading] {
      // Attribute selector was required to increase weight.
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
