<template>
  <span :class="b()">
    <img :class="b('icon')" v-if="!inline" :src="src" :alt="icon" :width="width" :height="height">
  </span>
</template>

<script>
  const cache = {};

  export default {
    name: 'c-icon',
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
        default: false
      },
      /**
       * Custom width value
       */
      width: {
        type: String
      },
      /**
       * Custom height value
       */
      height: {
        type: String
      }
    },
    computed: {
      src() {
        try {
          return require.context('../assets/icons/', false, /\.svg/)(`./${this.icon}.svg`) || null;
        } catch (e) {
          // eslint-disable-next-line no-console
          console.error(`c-icon was unable to find icon "${this.icon}"`);

          return null;
        }
      }
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

        svg.setAttribute('role', 'img');
        svg.setAttribute('aria-label', this.icon);
      }
    },
    mounted() {
      if (!this.inline || !this.src) {
        return;
      }

      if (!cache[this.icon]) {
        cache[this.icon] = this.$axios
          .get(this.src)
          .then(response => {
            return response.data;
          });
      }

      cache[this.icon].then(svg => {
        this.$el.innerHTML = svg;

        this.setAttributes(this.$el.children[0]);
      })
    },
  };
</script>

<style lang="scss">
  .c-icon {
    display: inline-block;
  }
</style>
