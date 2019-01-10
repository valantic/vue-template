export default {
  namespaced: true,
  state: {
    /**
     * @type {Array} Stores breadcrumb items.
     */
    items: process.env.NODE_ENV !== 'production'
      ? require('../../../styleguide/mock-data/initial-data/breadcrumbs').default // eslint-disable-line global-require
      : null,
  },
  getters: {
    /**
     * Gets the list of current breadcrumb items.
     *
     * @param {Object} state - Current state.
     *
     * @returns {Array}
     */
    items: state => state.items,
  },
  mutations: {
    /**
     * Sets the list of breadcrumbs in the state.
     *
     * @param {Object} state - Current state.
     * @param {Array} data - List of breadcrumb items.
     */
    data(state, data) {
      state.items = data || null;
    }
  },
  actions: {},
};
