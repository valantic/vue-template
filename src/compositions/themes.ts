import { computed, ComputedRef } from 'vue';
import { useSessionStore } from '@/stores/session';

export interface ITheme {
  theme: ComputedRef<string>;
}

export default (customTheme?: string): ITheme => {
  const sessionStore = useSessionStore();

  /**
   * Holds the current theme name.
   */
  const theme: ComputedRef<string> = computed(() => customTheme || sessionStore.getTheme);

  return {
    theme,
  };
};
