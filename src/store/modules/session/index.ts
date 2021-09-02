import { defineModule } from 'direct-vuex';

export interface IModSessionState {
  theme: string;
}

const sessionModule = defineModule({
  namespaced: true,
  state: (): IModSessionState => ({
    /**
     * Stores the theme id.
     */
    theme: '01'
  }),

  getters: {
    /**
     * Gets the current theme id.
     */
    getTheme(state: IModSessionState): string {
      return state.theme;
    }
  },

  mutations: {
    /**
     * Sets the global theme id.
     */
    setTheme(state, id: string): void {
      state.theme = id;
    }
  },

  // actions: {}
});

export default sessionModule;
