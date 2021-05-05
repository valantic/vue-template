import { BREAKPOINTS } from '@/setup/globals';

/**
 * Adds an viewport instance to Vue itself, which can be used by calling this.$viewport.
 */
export default {
  install(Vue) {
    Vue.prototype.$viewport = new Vue({
      data: {
        viewport: 0,
      },
      computed: {
        /**
         * Returns TRUE if viewport is smaller than XS.
         *
         * @public
         *
         * @returns {Boolean}
         */
        isXxs() {
          return this.viewport < BREAKPOINTS.xs;
        },

        /**
         * Returns TRUE if viewport is at least XS.
         *
         * @public
         *
         * @returns {Boolean}
         */
        isXs() {
          return this.viewport >= BREAKPOINTS.xs;
        },

        /**
         * Returns TRUE if viewport is at least SM.
         *
         * @public
         *
         * @returns {Boolean}
         */
        isSm() {
          return this.viewport >= BREAKPOINTS.sm;
        },

        /**
         * Returns TRUE if viewport is at least MD.
         *
         * @public
         *
         * @returns {Boolean}
         */
        isMd() {
          return this.viewport >= BREAKPOINTS.md;
        },

        /**
         * Returns TRUE if viewport is at least LG.
         *
         * @public
         *
         * @returns {Boolean}
         */
        isLg() {
          return this.viewport >= BREAKPOINTS.lg;
        },

        /**
         * Returns TRUE if viewport is at least XL.
         *
         * @public
         *
         * @returns {Boolean}
         */
        isXl() {
          return this.viewport >= BREAKPOINTS.xl;
        },

        /**
         * Checks if current viewport is mobile (<= md).
         *
         * @public
         *
         * @returns {Boolean}
         */
        isMobile() {
          return !this.isSm;
        },

        /**
         * Returns the short name of the current viewport (e.g. 'md').
         *
         * @public
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
      beforeDestroy() {
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
