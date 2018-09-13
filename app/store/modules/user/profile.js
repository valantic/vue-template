import { i18n } from '@/setup/i18n';
import api from '../../utils/api';

export default {
  namespaced: true,
  state: {
    /**
     * @type {Object} Stores the user data.
     */
    userData: process.env.NODE_ENV !== 'production'
      ? require('../../../styleguide/mock-data/user').default.profile // eslint-disable-line global-require
      : {},

    /**
     * @type {Boolean} Flag says if there is currently any user-profile request running.
     */
    requestIsRunning: false,
  },
  getters: {
    /**
     * Gets the user data object.
     *
     * @param {Object} state - The current state object.
     *
     * @returns {Object}
     */
    getUserData: state => state.userData,

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
    dataUserData(state, data) {
      state.userData = data || {};
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
     * Place order action.
     *
     * @param {Object} context - The vuex context object.
     * @param {Object} context.commit - The current commit object.
     * @param {Object} payload - The payload data.
     *
     * @returns {Promise}
     */
    updateUserData({ commit, state }, payload) {
      const refreshPage = payload.language && state.userData.language !== payload.language;

      commit('setRequestIsRunningState', true);

      return api.post(i18n.t('urls.updateUser'), payload)
        .then((response) => {
          commit('setRequestIsRunningState', false);

          if (response.data && response.data.data) {
            commit('dataUserData', response.data.data);

            if (refreshPage) {
              window.location.reload();
            }

            return response.data.data;
          }

          return Promise.reject(new Error('Api Failure'));
        })
        .finally(() => {
          commit('setRequestIsRunningState', false);
      });
    },

    /**
     * TODO: Update as soon as data contract is ready.
     *
     * Update password action.
     *
     * @param {Object} context - The vuex context object.
     * @param {Object} context.commit - The current commit object.
     * @param {Object} payload - The payload data.
     * @param {String} payload.newPassword - The new password to set.
     * @param {String} payload.confirmPassword - The confirm password to set.
     *
     * @returns {Promise}
     */
    updatePassword({ commit }, payload) {
      commit('setRequestIsRunningState', true);

      return api.post(i18n.t('urls.updatePassword'), { passwordForm: payload })
        .then((response) => {
          commit('setRequestIsRunningState', false);

          if (response) {
            return response;
          }

          return Promise.reject(new Error('Api Failure'));
        })
        .finally(() => {
          commit('setRequestIsRunningState', false);
      });
    },

    /**
     * TODO: Update as soon as data contract is ready.
     *
     * Removes the account.
     *
     * @param {Object} context - The vuex context object.
     * @param {Object} context.commit - The current commit object.
     * @param {String} userId - The userId you want to remove.
     *
     * @returns {Promise}
     */
    deleteAccount({ commit }, userId) {
      commit('setRequestIsRunningState', true);

      return api.delete(i18n.t('urls.deleteAccount'), { userId })
        .then((response) => {
          if (response) {
            return response;
          }

          return Promise.reject(new Error('Api Failure'));
        })
        .finally(() => {
          commit('setRequestIsRunningState', false);
      });
    },
  },
};
