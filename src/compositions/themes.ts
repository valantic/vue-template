import { computed, ComputedRef } from 'vue';
import sessionStore from '@/stores/session';

export interface ITheme {
  theme: ComputedRef<string>;
}

export default (customTheme?: string): ITheme => {
  /**
   * Holds the current theme name.
   */
  const theme: ComputedRef<string> = computed(() => customTheme || sessionStore().getTheme);

  return {
    theme,
  };
};
