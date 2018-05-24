<!-- This component has no <template> because of dynamic root element -->

<script>
  import { BREAKPOINTS } from '@/setup/globals';

  export default {
    name: 'e-picture',
    // components: {},
    // mixins: [],

    props: {
      /**
       * Alt text if no image found
       */
      alt: {
        type: String,
        required: true
      },

      /**
       * Fallback image (assigned to img[src])
       */
      fallback: {
        type: String,
        required: true
      },

      /**
       * Allows to add a ratio keeper pseudo element, which will preserve the vertical space of the final image.
       *
       * e.g. `1` is a ratio of 1:1 (600px x 600px), `0.75` is a ratio of 0.75:1 (600px x 800px)
       */
      ratio: {
        type: [Number, String],
        default: null
      },

      /**
       * Sizes definition for srcset use
       *
       * `{ <breakpoint (px value|short name)>: <minWidth>, ... }`
       */
      sizes: {
        type: Object,
        default: null
      },

      /**
       * A list of image sources
       *
       * `{ <width>: <url>, ... }`
       */
      srcset: {
        type: Object,
        default: null,
      },

      /**
       * A list of source definitions
       *
       * `{ <breakpoint (px value|short name)>: [<url> & <density>], ... }`
       */
      sources: {
        type: Object,
        default: null,
      },
      lazyload: { // Note: breaks srcset in IE11, because picturefill will be initialized AFTER the fallback has been loaded
        type: Boolean,
        default: true,
      },
      inline: {
        type: [Boolean, String],
        default: false,
      }
    },
    // data() {
    //   return {};
    // },

    computed: {
      /**
       * Converts srcset object to string
       *
       * @returns {String|null}
       */
      parsedSrcset() {
        if (!this.srcset) {
          return null;
        }

        const srcBreakpoints = Object.keys(this.srcset);

        return srcBreakpoints.map(breakpoint => `${this.srcset[breakpoint]} ${breakpoint}w`).join(',');
      },

      /**
       * Converts sizes object to string
       *
       * @returns {String|null}
       */
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
          .filter(breakpoint => breakpoint > 0)
          .sort((a, b) => (a < b ? 1 : -1));
        const fallback = ',100vw';

        return sizesBreakpoints
          .map((breakpoint) => {
            const viewWidth = Math.ceil((mappedSizesBreakpoints[breakpoint] / breakpoint) * 100);

            return `(min-width: ${breakpoint}px) ${viewWidth}vw`;
          })
          .filter(breakpoint => !!breakpoint)
          .join(',') + fallback;
      },

      /**
       * Converts sources to definition to <source> attribute data
       *
       * @returns {Object[]|null}
       */
      parsedSources() {
        if (!this.sources) {
          return null;
        }

        return Object
          .keys(this.sources)
          .map((breakpoint) => {
            const breakpointWidth = typeof BREAKPOINTS[breakpoint] === 'number' ? BREAKPOINTS[breakpoint] : breakpoint;

            if (Number.isNaN(breakpointWidth)) {
              throw new Error('Invalid breakpoint value for e-picture source.');
            }

            return {
              sort: parseInt(breakpointWidth, 10),
              media: `(min-width: ${breakpointWidth}px)`,
              srcset: this.sources[breakpoint].join(',')
            };
          })
          .sort((a, b) => (a.sort < b.sort ? 1 : -1));
      },
      isInline() {
        return this.inline === 'true' || this.inline === true;
      }
    },
    // watch: {},

    // beforeCreate() {},
    created() {
      if (this.parsedSources && this.parsedSrcset) {
        // eslint-disable-next-line no-console
        console.warn('You can not use sources and srcset at the same time for e-picture! Source is used.');
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

    // methods: {},
    render(createElement) {
      const { lazyload, ratio, parsedSizes } = this;
      const pictureChilds = [];
      const imgAttributes = {
        ...this.$attrs,
        alt: this.alt,
        [lazyload ? 'data-src' : 'src']: this.fallback
      };
      const style = {};
      let element = 'img';

      // Create picture element
      if (this.parsedSources) {
        element = 'picture';

        // sources
        this.parsedSources.forEach((source) => {
          pictureChilds.push(createElement(
            'source',
            {
              class: this.b('source'),
              attrs: {
                media: source.media,
                [lazyload ? 'data-srcset' : 'srcset']: source.srcset,
              },
            }
          ));
        });

        // img
        pictureChilds.push(createElement(
          'img',
          {
            class: this.b('image', lazyload ? 'lazyload' : null),
            attrs: imgAttributes,
          }
        ));
      } else if (this.parsedSizes && this.parsedSrcset) {
        imgAttributes.sizes = parsedSizes;
        imgAttributes[lazyload ? 'data-srcset' : 'srcset'] = this.parsedSrcset;
        imgAttributes[lazyload ? 'data-src' : 'src'] = this.fallback;
      }

      if (ratio > 0 && parsedSizes) { // <picture> would need dynamic ratios
        style['--aspect-ratio'] = ratio;
      }

      return createElement( // Wrapper
        'span',
        {
          class: this.b({
            inline: this.isInline,
            image: !this.parsedSources,
            ratio: ratio > 0,
            lazyload
          }),
          style,
        },
        [createElement( // img / picture
          element,
          {
            class: this.b(element === 'img' ? 'image' : 'picture', lazyload ? 'lazyload' : null),
            attrs: imgAttributes,
          },
          pictureChilds // picture sources
        )]
      );
    },
  };
</script>

<style lang="scss">
  :root {
    --aspect-ratio: 1000; // Makes sure the variable is defined and creates a very small spacer
  }

  .e-picture { // Can be <picture> or <img>!
    display: block;
    max-width: 100%;
    height: auto;

    img {
      display: block;
      max-width: 100%;
      height: auto;
    }

    &--inline {
      display: inline-block;
    }

    &__image {
      max-width: 100%;
    }

    &--ratio {
      &::before {
        display: block;
        content: '';
        float: left;
        padding-top: calc(100% / (var(--aspect-ratio)));
      }

      &::after {
        display: table;
        content: '';
        clear: both;
      }
    }
  }
</style>
