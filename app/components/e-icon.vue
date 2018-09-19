<template>
  <span :class="b({ color })"><!-- needed for inline usage -->
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

  export default {
    name: 'e-icon',
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
            'blue',
            'white',
            'yellow'
          ].includes(value);
        },
      },

      /**
       * Title attribute for <img> usage
       */
      title: {
        type: String,
        default: null
      },

      /**
       * Alternative text for image usage
       */
      alt: {
        type: String,
        default: '' // A11y 1.1.1
      },

      /**
       * IE will focus inline svg. Therefore by default `focusable` on the `<svg>` element is set to `false`.
       * Use this prop to change the value.
       */
      focusable: {
        type: Boolean,
        default: false
      }
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
    },
    mounted() {
      if (!this.inline || !this.src) {
        return;
      }

      if (!cache[this.icon]) {
        cache[this.icon] = this.$axios
          .get(this.src)
          .then(response => response.data);
      }

      cache[this.icon].then((svg) => {
        this.$el.innerHTML = svg;

        this.setAttributes(this.$el.children[0]);
      });
    },
    methods: {
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

        if (this.$props.alt) {
          svg.setAttribute('alt', this.$props.alt);
        }

        svg.setAttribute('role', 'img');
        svg.setAttribute('aria-label', this.icon);
        svg.setAttribute('focusable', this.focusable);
      },
    },
  };
</script>

<style lang="scss">
  .e-icon {
    display: inline-block;
  }
</style>
