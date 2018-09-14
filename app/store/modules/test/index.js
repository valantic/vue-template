export default {
  namespaced: true,
  state: {
    /**
     * @type {String} Stores the test data.
     */
    test: 'foo',
  },
  getters: {
    /**
     * Gets the current test data.
     *
     * @param {Object} state - Current state object.
     *
     * @returns {String}
     */
    getTestData(state) {
      return state.test;
    },
  },
  mutations: {
    /**
     * Sets the global theme id.
     *
     * @param {Object} state - Current state object.
     * @param {String} data - Some test data.
     */
    setTestData(state, data) {
      state.test = data;
    },
  },
  // actions: {},
};
