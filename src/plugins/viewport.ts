import { Plugin, reactive } from 'vue';
import { BREAKPOINTS } from '@/setup/globals';

/**
 * Adds an viewport instance to Vue itself, which can be used by calling this.$viewport.
 */
const plugin: Plugin = {
  install(app) {
    /**
     * TODO:
     * Event Listener (Updates values)
     *
     * Refs (hold current values)
     *
     * Methods (update values)
     *
     * $viewport Object (publishes computed values that relate to Refs)
     */
    app.config.globalProperties.$viewport = reactive({
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
        isXxs(): boolean {
          // @ts-ignore
          return this.viewport < BREAKPOINTS.xs;
        },

        /**
         * Returns TRUE if viewport is at least XS.
         *
         * @public
         *
         * @returns {Boolean}
         */
        isXs(): boolean {
          // @ts-ignore
          return this.viewport >= BREAKPOINTS.xs;
        },

        /**
         * Returns TRUE if viewport is at least SM.
         *
         * @public
         *
         * @returns {Boolean}
         */
        isSm(): boolean {
          // @ts-ignore
          return this.viewport >= BREAKPOINTS.sm;
        },

        /**
         * Returns TRUE if viewport is at least MD.
         *
         * @public
         *
         * @returns {Boolean}
         */
        isMd():boolean {
          // @ts-ignore
          return this.viewport >= BREAKPOINTS.md;
        },

        /**
         * Returns TRUE if viewport is at least LG.
         *
         * @public
         *
         * @returns {Boolean}
         */
        isLg(): boolean {
          // @ts-ignore
          return this.viewport >= BREAKPOINTS.lg;
        },

        /**
         * Returns TRUE if viewport is at least XL.
         *
         * @public
         *
         * @returns {Boolean}
         */
        isXl(): boolean {
          // @ts-ignore
          return this.viewport >= BREAKPOINTS.xl;
        },

        /**
         * Checks if current viewport is mobile (<= md).
         *
         * @public
         *
         * @returns {Boolean}
         */
        isMobile(): boolean {
          return !this.isSm;
        },

        /**
         * Returns the short name of the current viewport (e.g. 'md').
         *
         * @public
         *
         * @returns {String}
         */
        currentViewport(): string {
          // @ts-ignore
          return Object.entries(BREAKPOINTS)
            .reverse()
            // @ts-ignore
            .find(breakpoint => this.viewport >= breakpoint[1])[0];
        },
      },
      created() {
        // @ts-ignore
        window.addEventListener('resizeend', this.update);

        // @ts-ignore
        this.update();
      },
      beforeUnmount() {
        // @ts-ignore
        window.removeEventListener('resizeend', this.update);
      },
      methods: {
        /**
         * Event handler for the resize event.
         */
        update() {
          // @ts-ignore
          this.viewport = window.innerWidth;
        }
      }
    });
  }
};

export default plugin;
