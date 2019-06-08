<template>
  <span :class="b(componentModifiers)">
    <!-- <span> needed for inline usage. -->
    <img v-if="!inline"
         :class="b('icon')"
         :src="src"
         :alt="alt"
         :width="width"
         :height="height"
         :title="title"
    >
  </span>
</template>

<script>
  const cache = {};
  const nodeCache = {};

  export default {
    name: 'e-icon',
    // status: 1,

    props: {
      /**
       * Name of the svg icon
       */
      icon: {
        type: String,
        required: true,
      },

      /**
       * Flag to determine if icon should be used inline or as img tag
       */
      inline: {
        type: Boolean,
        default: false,
      },

      /**
       * Custom width value
       */
      width: {
        type: String,
        default: null,
      },

      /**
       * Custom height value
       */
      height: {
        type: String,
        default: null,
      },

      /**
       * Color of the icon, if it is rendered inline
       */
      color: {
        type: String,
        default: 'default',
        validator(value) {
          return [
            'default',
            'gray',
            'lightgray',
            'white',
          ].includes(value);
        },
      },

      /**
       * Title attribute for <img> usage
       */
      title: {
        type: String,
        default: null,
      },

      /**
       * Alternative text for image usage. This will not be added in case of inline usage as alt attribute is not
       * allowed on svg elements.
       */
      alt: {
        type: String,
        default: '', // A11y 1.1.1
      },

      /**
       * IE will focus inline svg. Therefore by default `focusable` on the `<svg>` element is set to `false`.
       * Use this prop to change the value.
       */
      focusable: {
        type: Boolean,
        default: false,
      },

      /**
       * Native tabindex attribute for the svg-element (inline usage).
       */
      tabindex: {
        type: String,
        default: '-1',
      },
    },
    computed: {
      src() {
        try {
          return require.context('../assets/icons/', false, /\.svg/)(`./${this.icon}.svg`) || null;
        } catch (e) {
          // eslint-disable-next-line no-console
          console.warn(`e-icon was unable to find icon "${this.icon}"`);

          return null;
        }
      },

      /**
       * Returns all modifiers for the component main class.
       *
       * @returns {Object}
       */
      componentModifiers() {
        return {
          color: this.color,
          [this.icon]: true,
        };
      },
    },

    watch: {
      icon: {
        immediate: true,
        handler() {
          this.loadIcon();
        },
      },
    },

    methods: {
      /**
       * Sets the attributes for the icon.
       *
       * @param {Node} svg - Element for which the attributes should be set.
       */
      setAttributes(svg) {
        if (this.width || this.height) {
          svg.removeAttribute('width');
          svg.removeAttribute('height');

          if (this.width) {
            svg.setAttribute('width', this.width);
          }

          if (this.height) {
            svg.setAttribute('height', this.height);
          }
        }

        svg.setAttribute('tabindex', this.tabindex);
        svg.setAttribute('role', 'img');
        svg.setAttribute('aria-label', this.icon);
        svg.setAttribute('focusable', this.focusable);
      },

      /**
       * Creates a new SVG element if not already in cache.
       *
       * @param {String} content - The SVG content as string.
       *
       * @returns {Node}
       */
      createSvgElement(content) {
        if (!nodeCache[this.icon]) {
          const container = document.createElement('div');

          container.innerHTML = content;

          nodeCache[this.icon] = container;
        }

        return nodeCache[this.icon].cloneNode(true).children[0];
      },

      /**
       * Gets an SVG element for the given content.
       *
       * @param {String} content - The SVG content as string.
       *
       * @returns {Node}
       */
      getSvgElement(content) {
        const svg = this.createSvgElement(content);

        this.setAttributes(svg);

        return svg;
      },

      /**
       * Load the icon.
       */
      loadIcon() {
        if (!this.inline || !this.src) {
          return;
        }

        if (!cache[this.icon]) {
          cache[this.icon] = this.$axios
            .get(this.src)
            .then(response => response.data);
        }

        cache[this.icon].then((svg) => {
          this.$el.appendChild(this.getSvgElement(svg));
        });
      },
    },
  };
</script>

<style lang="scss">
  .e-icon {
    display: inline-block;

    svg {
      pointer-events: none; // Prevents IE11 from swallowing events.
    }

    &--color-gray svg path {
      fill: $color-grayscale--400;
    }

    &--color-lightgray svg path {
      fill: $color-grayscale--600;
    }

    &--color-white svg path {
      fill: $color-grayscale--1000;
    }
  }
</style>
