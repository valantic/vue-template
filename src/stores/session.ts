import { defineStore } from 'pinia';

export interface IModSessionState {
  theme: string;
}

export const useSessionStore = defineStore('session', {
  state: () => ({
    /**
     * Stores the theme id.
     */
    theme: '01',
  }),
  getters: {
    /**
     * Gets the current theme id.
     */
    getTheme(state: IModSessionState): string {
      return state.theme;
    },
  },
  actions: {
    /**
     * Sets the global theme id.
     */
    setTheme(id: string): void {
      this.theme = id;
    },
  },
});
