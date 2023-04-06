import {
  computed,
  Plugin,
  reactive,
  ref,
} from 'vue';
import { BREAKPOINTS, TViewportBreakPoint } from '@/setup/globals';

export interface IViewport {
  isXxs: boolean;
  isXs: boolean;
  isSm: boolean;
  isMd: boolean;
  isLg: boolean;
  isXl: boolean;
  isMobile: boolean;
  currentViewport: TViewportBreakPoint | string; // TODO: 'string' is a workaround, because I did not know how to use the type TViewportBreakPoint on line 66.
}

/**
 * Adds an viewport instance to Vue itself, which can be used by calling this.$viewport.
 */
const plugin: Plugin = {
  install(app) {
    // sets initial viewport width
    const viewport = ref<number>(window.innerWidth);

    /**
     * Returns TRUE if viewport is smaller than XS.
     */
    const isXxs = computed(() => viewport.value < BREAKPOINTS.xs);

    /**
     * Returns TRUE if viewport is at least XS.
     */
    const isXs = computed(() => viewport.value >= BREAKPOINTS.xs);

    /**
     * Returns TRUE if viewport is at least SM.
     */
    const isSm = computed(() => viewport.value >= BREAKPOINTS.sm);

    /**
     * Returns TRUE if viewport is at least MD.
     */
    const isMd = computed(() => viewport.value >= BREAKPOINTS.md);

    /**
     * Returns TRUE if viewport is at least LG.
     */
    const isLg = computed(() => viewport.value >= BREAKPOINTS.lg);

    /**
     * Returns TRUE if viewport is at least XL.
     */
    const isXl = computed(() => viewport.value >= BREAKPOINTS.xl);

    /**
     * Checks if current viewport is mobile (<= md).
     */
    const isMobile = computed(() => !isSm.value);

    /**
     * Returns the short name of the current viewport (e.g. 'md').
     */
    const currentViewport = computed(
      () => Object
        .entries(BREAKPOINTS)
        ?.reverse()
        ?.find(breakpoint => viewport.value >= breakpoint[1])?.[0] || ''
    );

    window.addEventListener('resizeend', () => {
      viewport.value = window.innerWidth;
    });

    app.config.globalProperties.$viewport = reactive({
      isXxs,
      isXs,
      isSm,
      isMd,
      isLg,
      isXl,
      isMobile,
      currentViewport,
    });
  },
};

export default plugin;
