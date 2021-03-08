<template>
  <div :class="b()" :style="style">
    <!-- @slot Default slot -->
    <slot></slot>
  </div>
</template>

<script>
  import scrollbarWidth from '@/helpers/scrollbar-width';

  /**
   * Allows to display a full width element inside a container with limited width.
   */
  export default {
    name: 'e-fullwidth',

    // components: {},
    // mixins: [],

    // props: {},
    data() {
      return {
        /**
         * @type {Number} Holds the width of the page scrollbar.
         */
        scrollbarWidth: scrollbarWidth(),

        /**
         * @type {Object} If available initializes a resize observer. Compared to the resize event, the observer
         * will also be triggered, if the height of the page changes, and the scrollbar becomes visible.
         * The resize event was only triggered, when the user manually changes the screen size.
         */
        resizeObserver: window.ResizeObserver && new ResizeObserver(this.updateScrollbarWidth),

        /**
         * @type {Number} Holds the ID of the currently running resize timeout.
         */
        resizeTimeout: null,
      };
    },

    computed: {
      /**
       * Calculates a dynamic width style, since the scrollbar needs to be taken into account.
       *
       * @returns {Object}
       */
      style() {
        if (this.scrollbarWidth) {
          const margin = `calc((50vw - ${this.scrollbarWidth / 2}px) * -1)`;

          return {
            width: `calc(100vw - ${this.scrollbarWidth}px)`,
            marginLeft: margin,
            marginRight: margin,
          };
        }

        return null;
      },
    },
    // watch: {},

    // beforeCreate() {},
    // created() {},
    beforeMount() {
      if (this.resizeObserver) {
        this.resizeObserver.observe(window.document.body);
      } else { // Fallback for browsers without ResizeObserver support.
        window.addEventListener('resizeend', this.updateScrollbarWidth);
      }
    },
    mounted() {
      if (!this.resizeObserver) { // IE11 fallback.
        this.updateScrollbarWidth();
      }
    },
    // beforeUpdate() {},
    // updated() {},
    // activated() {},
    // deactivated() {},
    beforeUnmount() {
      if (this.resizeObserver) {
        this.resizeObserver.unobserve(window.document.body);
      } else { // IE11 fallback.
        window.removeEventListener('resizeend', this.updateScrollbarWidth);
      }
    },
    // unmounted() {},

    methods: {
      /**
       * Recalculates the scrollbar width.
       */
      updateScrollbarWidth() {
        clearTimeout(this.resizeTimeout);

        this.resizeTimeout = setTimeout(() => {
          this.scrollbarWidth = scrollbarWidth();
        }, 100);
      },
    },

    // render() {},
  };
</script>

<style lang="scss">
  .e-fullwidth {
    position: relative;
    left: 50%;
    right: 50%;
    width: 100vw;
    margin-left: -50vw;
    margin-right: -50vw;
  }
</style>
