// store/modules/session/index.js

export default {
  namespaced: true,
  state: {
    /**
     * @type {String}   theme id
     */
    theme: '02' // TODO: set this value dynamic
  },
  getters: {
    /**
     * Gets the current theme id
     *
     * @param {Object}    state   Current state
     *
     * @returns {String}  theme   Current theme id
     */
    getTheme: state => state.theme
  },
  mutations: {},
  actions: {},
};
