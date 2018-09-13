import userManagement from './user-management';
import profile from './profile';

/**
 * This store module is the "wrapper" for the sub modules in the user-account.
 */
export default {
  namespaced: true,
  modules: {
    userManagement,
    profile,
  },
  state: {
    /**
     * @type {Array} Stores a list of account url objects.
     */
    accountLinks: process.env.NODE_ENV !== 'production'
      ? require('../../../styleguide/mock-data/user').default.accountLinks // eslint-disable-line global-require
      : {},
  },
  getters: {
    /**
     * Gets the current list of account urls for the account navigation.
     *
     * @param {Object} state - The current state object.
     *
     * @returns {Array|null}
     */
    getAccountLinks: state => state.accountLinks,
  },
  mutations: {
    /**
     * Sets a list of account url objects in the state.
     *
     * @param {Object} state - The current state object.
     * @param {Array} data - The list of account url objects.
     */
    dataAccountLinks(state, data) {
      state.accountLinks = Array.isArray(data) && data.length ? data : null;
    }
  },
  actions: {},
};
