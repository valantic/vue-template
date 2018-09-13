import { i18n } from '@/setup/i18n';
import api from '../../utils/api';

export default {
  namespaced: true,
  state: {
    /**
     * @type {Array} Stores the user list.
     */
    users: process.env.NODE_ENV !== 'production'
      ? require('../../../styleguide/mock-data/users').default // eslint-disable-line global-require
      : [],

    /**
     * @type {Boolean} Flag says if there is currently any cart request running.
     */
    requestIsRunning: false,
  },
  getters: {
    /**
     * Gets the user data object.
     *
     * @param {Object} state - The current state object.
     *
     * @returns {Array}
     */
    getUsers: state => state.users,

    /**
     * Gets the state of the requests.
     *
     * @param {Object} state - Current state object.
     *
     * @returns {Boolean}
     */
    getRequestIsRunning: state => state.requestIsRunning,
  },
  mutations: {
    /**
     * Sets the user data object.
     *
     * @param {Object} state - The current state object.
     * @param {Array} data - The user data object.
     */
    dataUsers(state, data) {
      state.users = data || [];
    },

    /**
     * Sets the flag of the request state.
     *
     * @param {Object} state - Current state object.
     * @param {Boolean} isRunning - State of the request.
     */
    setRequestIsRunningState(state, isRunning) {
      state.requestIsRunning = isRunning;
    },
  },
  actions: {

    /**
     * TODO: check after backend integration is done.
     *
     * Sends create user request.
     *
     * @param {Object} context - The vuex context object.
     * @param {Object} context.commit - The current commit object.
     * @param {Object} payload - Payload object to create user.
     *
     * @returns {Promise}
     */
    createUser({ commit }, payload) {
      commit('setRequestIsRunningState', true);

      return api.post(i18n.t('urls.createUser'), { ...payload })
        .then((response) => {
          if (response.data && response.data.data) {
            return response.data.data;
          }

          return Promise.reject(new Error('Api Failure'));
        })
        .finally(() => {
          commit('setRequestIsRunningState', false);
      });
    },
  },
};
