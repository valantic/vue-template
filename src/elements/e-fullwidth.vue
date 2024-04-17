<template>
  <div
    :class="b()"
    :style="style"
  >
    <!-- @slot Default slot -->
    <slot></slot>
  </div>
</template>

<script lang="ts">
  import { StyleValue, defineComponent } from 'vue';
  import scrollbarWidth from '@/helpers/scrollbar-width';

  type ResizeObserverCallback = () => void;

  type Data = {
    scrollbarWidth: number;
    resizeObserver: ResizeObserver;
    resizeTimeout: ReturnType<typeof setTimeout> | null;
  };

  /**
   * Allows to display a full width element inside a container with limited width.
   */
  export default defineComponent({
    name: 'e-fullwidth',

    // components: {},

    // props: {},
    data(): Data {
      return {
        /**
         * Holds the width of the page scrollbar.
         */
        scrollbarWidth: scrollbarWidth(),

        /**
         * If available initializes a resize observer. Compared to the resize event, the observer
         * will also be triggered, if the height of the page changes, and the scrollbar becomes visible.
         * The resize event was only triggered, when the user manually changes the screen size.
         */
        resizeObserver:
          window.ResizeObserver && new ResizeObserver(this.updateScrollbarWidth as ResizeObserverCallback),

        /**
         * Holds the ID of the currently running resize timeout.
         */
        resizeTimeout: null,
      };
    },

    computed: {
      /**
       * Calculates a dynamic width style, since the scrollbar needs to be taken into account.
       */
      style(): StyleValue | undefined {
        if (this.scrollbarWidth) {
          const margin = `calc((50vw - ${this.scrollbarWidth / 2}px) * -1)`;

          return {
            width: `calc(100vw - ${this.scrollbarWidth}px)`,
            marginLeft: margin,
            marginRight: margin,
          };
        }

        // eslint-disable-next-line no-undefined
        return undefined;
      },
    },
    // watch: {},

    // beforeCreate() {},
    // created() {},
    beforeMount() {
      if (this.resizeObserver) {
        this.resizeObserver.observe(window.document.body);
      } else {
        // Fallback for browsers without ResizeObserver support.
        window.addEventListener('resizeend', this.updateScrollbarWidth);
      }
    },
    mounted() {
      if (!this.resizeObserver) {
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
      } else {
        window.removeEventListener('resizeend', this.updateScrollbarWidth);
      }
    },
    // unmounted() {},

    methods: {
      /**
       * Recalculates the scrollbar width.
       */
      updateScrollbarWidth() {
        if (this.resizeTimeout) {
          clearTimeout(this.resizeTimeout);
        }

        this.resizeTimeout = setTimeout(() => {
          this.scrollbarWidth = scrollbarWidth();
        }, 100);
      },
    },

    // render() {},
  });
</script>

<style lang="scss">
  .e-fullwidth {
    position: relative;
    right: 50%;
    left: 50%;
    width: 100vw;
    margin-right: -50vw;
    margin-left: -50vw;
  }
</style>
