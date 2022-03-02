import { defineStore } from 'pinia';

export interface ISessionState {

  /**
   * Stores the theme id.
   */
  theme: string;
}

/**
 * Holds the name of the store.
 */
const storeName: string = 'session';

export default defineStore(storeName, {
  state: (): ISessionState => {
    const state: ISessionState = {
      theme: '01',
    };

    return state;
  },
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
