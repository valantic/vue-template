import { createStore } from 'vuex';

interface IThemeState {
  theme: string;
}

export default createStore<IThemeState>({
  state: {
    /**
     * @type {String} Stores the theme id.
     */
    theme: '01',
  },
  getters: {
    /**
     * Gets the current theme id.
     *
     * @param {Object} state - The current module state.
     *
     * @returns {String}
     */
    getTheme(state: IThemeState) {
      return state.theme;
    },
  },
  mutations: {
    /**
     * Sets the global theme id.
     *
     * @param {Object} state - Current state object.
     * @param {String} id - Theme id which should be set.
     */
    setTheme(state: IThemeState, id: string) {
      state.theme = id;
    },
  },
  // actions: {},
});
