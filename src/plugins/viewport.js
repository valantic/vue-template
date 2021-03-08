import { reactive } from 'vue';
import { BREAKPOINTS } from '@/setup/globals';

/**
 * Adds an viewport instance to Vue itself, which can be used by calling this.$viewport.
 */
export default {
  install(app) {
    app.config.globalProperties.$viewport = reactive({
      data: {
        viewport: 0,
      },
      computed: {
        /**
         * Returns TRUE if viewport is smaller than XS.
         *
         * @returns {Boolean}
         */
        isXxs() {
          return this.viewport < BREAKPOINTS.xs;
        },

        /**
         * Returns TRUE if viewport is at least XS.
         *
         * @returns {Boolean}
         */
        isXs() {
          return this.viewport >= BREAKPOINTS.xs;
        },

        /**
         * Returns TRUE if viewport is at least SM.
         *
         * @returns {Boolean}
         */
        isSm() {
          return this.viewport >= BREAKPOINTS.sm;
        },

        /**
         * Returns TRUE if viewport is at least MD.
         *
         * @returns {Boolean}
         */
        isMd() {
          return this.viewport >= BREAKPOINTS.md;
        },

        /**
         * Returns TRUE if viewport is at least LG.
         *
         * @returns {Boolean}
         */
        isLg() {
          return this.viewport >= BREAKPOINTS.lg;
        },

        /**
         * Returns TRUE if viewport is at least XL.
         *
         * @returns {Boolean}
         */
        isXl() {
          return this.viewport >= BREAKPOINTS.xl;
        },

        /**
         * Checks if current viewport is mobile (<= md).
         *
         * @returns {Boolean}
         */
        isMobile() {
          return !this.isSm;
        },

        /**
         * Returns the short name of the current viewport (e.g. 'md').
         *
         * @returns {String}
         */
        currentViewport() {
          return Object.entries(BREAKPOINTS)
            .reverse()
            .find(breakpoint => this.viewport >= breakpoint[1])[0];
        },
      },
      created() {
        window.addEventListener('resizeend', this.update);

        this.update();
      },
      beforeUnmount() {
        window.removeEventListener('resizeend', this.update);
      },
      methods: {
        /**
         * Event handler for the resize event.
         */
        update() {
          this.viewport = window.innerWidth;
        }
      }
    });
  }
};
