import { NOTIFICATION_UNKNOWN_ERROR, IS_STORAGE_AVAILABLE } from '@/setup/globals';

export default {
  namespaced: true,
  state: {
    /**
     * @type {Array} Stores notifications.
     */
    notifications: [],
  },
  getters: {
    /**
     * Gets the current list of notifications.
     *
     * @param {Object} state - The current module state.
     *
     * @returns {Array.<Object>}
     */
    getNotifications: state => state.notifications,
  },
  mutations: {
    /**
     * Adds a notification.
     *
     * @param {Object} state - The current module state.
     * @param {Object} notification - Notification object.
     */
    pushNotification(state, notification) {
      if (!notification) {
        return;
      }

      const { redirectUrl } = notification || {};

      // Redirect Handler
      if (redirectUrl && IS_STORAGE_AVAILABLE) {
        localStorage.setItem('notification', JSON.stringify({
          ...notification,
          redirectUrl: null,
        }));

        window.location = redirectUrl;

        return;
      }

      state.notifications.unshift({
        ...notification,
        id: Date.now(),
      });
    },

    /**
     * Removes a notification.
     *
     * @param {Object} state - The current module state.
     * @param {Number} id - Id of the notification.
     */
    popNotification(state, id) {
      state.notifications = state.notifications.filter(notification => notification.id !== id);
    },
  },
  actions: {
    /**
     * Accepts the initial data Array of notification Objects.
     *
     * @param {Object} context - The current module context.
     * @param {Function} context.commit - Triggers a mutation on the current module.
     * @param {Array.<Object>} [payload] - An Array of notification Objects.
     */
    data({ commit }, payload) {
      if (!Array.isArray(payload)) {
        throw Error("The payload data given to 'notification/data' is not of type Array.");
      }

      payload.forEach((notification) => {
        commit('pushNotification', notification);
      });
    },

    /**
     * Adds an "unknown error" to the notification stack.
     *
     * @param {Object} context - The current module context.
     * @param {Function} context.commit - Triggers a mutation on the current module.
     */
    showUnknownError({ commit }) {
      commit('pushNotification', NOTIFICATION_UNKNOWN_ERROR);
    },
  },
};
