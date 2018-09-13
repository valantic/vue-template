import Vue from 'vue';
import { BREAKPOINTS } from '@/setup/globals';

/**
 * Service can be integrated in vue components to get the current viewport.
 * Possible viewports: xxs, xs, sm, lg, xl
 */
export default new Vue({
  data: {
    viewport: 0,
  },
  computed: {
    isXxs() {
      return this.viewport < BREAKPOINTS.xs;
    },
    isXs() {
      return this.viewport >= BREAKPOINTS.xs;
    },
    isSm() {
      return this.viewport >= BREAKPOINTS.sm;
    },
    isMd() {
      return this.viewport >= BREAKPOINTS.md;
    },
    isLg() {
      return this.viewport >= BREAKPOINTS.lg;
    },
    isXl() {
      return this.viewport >= BREAKPOINTS.xl;
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
    update() {
      this.viewport = window.innerWidth;
    }
  }
});
