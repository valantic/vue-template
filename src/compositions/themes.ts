import { ComputedRef, computed } from 'vue';
import sessionStore from '@/stores/session';

export type Theme = {
  theme: ComputedRef<string>;
};

export default (customTheme?: string): Theme => {
  /**
   * Holds the current theme name.
   */
  const theme: ComputedRef<string> = computed(() => customTheme || sessionStore().getTheme);

  return {
    theme,
  };
};
