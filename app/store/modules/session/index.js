// store/modules/session/index.js

export default {
  namespaced: true,
  state: {
    /**
     * @type {String}   theme id
     */
    theme: '01' // TODO: set this value dynamic (initial)
  },
  getters: {
    /**
     * Gets the current theme id
     *
     * @param {Object}    state   Current state
     *
     * @returns {String}  theme   Current theme id
     */
    getTheme(state) {
      return state.theme;
    }
  },
  mutations: {
    /**
     * Sets the global theme id
     *
     * @param {Object}  state   session/state
     * @param {String}  id      theme id
     */
    setTheme(state, id) {
      state.theme = id;
    }
  },
  actions: {},
};
