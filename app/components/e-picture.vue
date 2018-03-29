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
       * TODO: Could be realized with CSS variables (would only close out IE) else I guess we have to use JS (=> window.CSS.supports())
       * attr() is not working outside of "content"
       *
       * https://css-tricks.com/aspect-ratio-boxes/
       */
      ratio: {
        type: String,
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
            const breakpointWidth = typeof BREAKPOINTS[breakpoint] === 'number' ? BREAKPOINTS[breakpoint] : breakpoint;

            if (Number.isNaN(breakpointWidth)) {
              throw new Error('Invalid breakpoint value for e-picture source.');
            }

            mappedSourcesBreakpoints.push({
              sort: breakpointWidth,
              media: `(min-width: ${breakpointWidth}px)`,
              srcset: this.sources[breakpoint].join(',')
            });
          });

        return mappedSourcesBreakpoints.sort((a, b) => (a.sort < b.sort ? 1 : -1)); // eslint-disable-line no-extra-parens
      },
      isInline() {
        return this.inline === 'true' || this.inline === true;
      }
    },
    // watch: {},

    // beforeCreate() {},
    created() {
      if (this.parsedSources && this.parsedSrcset) {
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
      const { lazyload } = this;
      const pictureChilds = [];
      const imgAttributes = {
        ...this.$attrs,
        alt: this.alt,
        [lazyload ? 'data-src' : 'src']: this.fallback
      };
      let element = 'img';

      if (this.parsedSources) {
        element = 'picture';

        this.parsedSources.forEach((source) => {
          pictureChilds.push(createElement(
            'source',
            {
              attrs: {
                media: source.media,
                [lazyload ? 'data-srcset' : 'srcset']: source.srcset,
              },
            }
          ));
        });

        pictureChilds.push(createElement(
          'img',
          {
            class: {
              lazyload,
              'e-picture__image': true
            },
            attrs: imgAttributes,
          }
        ));
      } else if (this.parsedSizes && this.parsedSrcset) {
        imgAttributes.sizes = this.parsedSizes;
        imgAttributes[lazyload ? 'data-srcset' : 'srcset'] = this.parsedSrcset;
        imgAttributes[lazyload ? 'data-src' : 'src'] = this.fallback;
      }

      return createElement(
        element,
        {
          class: this.b({
            lazyload,
            inline: this.isInline,
            image: !this.parsedSources
          }, !this.parsedSources ? 'lazyload' : null),
          attrs: imgAttributes
        },
        pictureChilds
      );
    },
  };
</script>

<style lang="scss">
  .e-picture { // Can be <picture> or <img>!
    display: block;
    max-width: 100%;
    height: auto;

    img {
      max-width: 100%;
      height: auto;
    }

    &--inline {
      display: inline-block;
    }

    &__image {
      max-width: 100%;
    }
  }
</style>
