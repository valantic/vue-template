import { defineStore } from 'pinia';

export interface ISessionState {
  theme: string;
}

/**
 * Holds the name of the store.
 */
const storeName: string = 'session';

export const useSessionStore = defineStore(storeName, {
  state: (): ISessionState => ({
    /**
     * Stores the theme id.
     */
    theme: '01',
  }),
  getters: {
    /**
     * Gets the current theme id.
     */
    getTheme(state: ISessionState): string {
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
