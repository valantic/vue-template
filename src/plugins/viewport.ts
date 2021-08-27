import {
  computed,
  ComputedRef,
  Plugin,
  reactive,
  ref
} from 'vue';
import { BREAKPOINTS, BreakPointType } from '@/setup/globals';

export interface IViewport {
  isXxs: boolean;
  isXs: boolean;
  isSm: boolean;
  isMd: boolean;
  isLg: boolean;
  isXl: boolean;
  isMobile: boolean;
  currentViewport: BreakPointType;
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
    const isXxs: ComputedRef<boolean> = computed(() => viewport.value < BREAKPOINTS.xs);

    /**
     * Returns TRUE if viewport is at least XS.
     */
    const isXs: ComputedRef<boolean> = computed(() => viewport.value >= BREAKPOINTS.xs);

    /**
     * Returns TRUE if viewport is at least SM.
     */
    const isSm: ComputedRef<boolean> = computed(() => viewport.value >= BREAKPOINTS.sm);

    /**
     * Returns TRUE if viewport is at least MD.
     */
    const isMd: ComputedRef<boolean> = computed(() => viewport.value >= BREAKPOINTS.md);

    /**
     * Returns TRUE if viewport is at least LG.
     */
    const isLg: ComputedRef<boolean> = computed(() => viewport.value >= BREAKPOINTS.lg);

    /**
     * Returns TRUE if viewport is at least XL.
     */
    const isXl: ComputedRef<boolean> = computed(() => viewport.value >= BREAKPOINTS.xl);

    /**
     * Checks if current viewport is mobile (<= md).
     */
    const isMobile: ComputedRef<boolean> = computed(() => !isSm);

    /**
     * Returns the short name of the current viewport (e.g. 'md').
     */
    // @ts-ignore
    const currentViewport: ComputedRef<string> = computed(() => Object.entries(BREAKPOINTS)
        .reverse()
        // @ts-ignore
        .find(breakpoint => viewport.value >= breakpoint[1])[0]);

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
      currentViewport
    });
  }
};

export default plugin;
