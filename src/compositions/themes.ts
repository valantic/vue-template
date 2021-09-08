import { computed, ComputedRef } from 'vue';
import store from '@/store';

export interface ITheme {
  theme: ComputedRef<string>;
}

export default (customTheme?: string): ITheme => {
  const theme: ComputedRef<string> = computed(() => customTheme || store.getters.session.getTheme);

  return {
    theme,
  };
};
