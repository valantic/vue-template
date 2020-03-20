import { NOTIFICATION_UNKNOWN_ERROR } from '@/setup/globals';
import { i18n } from '@/setup/i18n';
import api from '@/helpers/api';

/**
 * Pushes the given notification to the notification stack.
 *
 * This is a work around to handle app internal and external pushes of notifications.
 * A better way would be to refactor this to an action.
 *
 * @param {Object} state - The current Vuex module state.
 * @param {Object} options - Notification object.
 * @param {Object} options.message - The message configuration.
 * @param {String} options.message.type - The message type (success, error, warning, info).
 * @param {String} options.message.message - The message text.
 * @param {Boolean} [options.message.expire] - Defines if the notification should auto expire.
 * @param {Object} [options.message.meta] - Additional information for the current message.
 * @param {String} [options.message.meta.id] - A unique id to handle anything related to the message on backend side.
 * @param {String} [options.message.meta.confirmationType] - A type name to assign specific confirmation actions.
 */
function pushNotification(state, options) {
  if (!options) {
    return;
  }

  const notification = {
    ...options,
    id: state.id,
    expire: options.expire !== false,
    delay: options.delay || 3
  };
  const metaData = (notification.message && notification.message.meta && notification.message.meta) || {};

  // Attach confirmation actions (if confirmationType is missing, this is ignored)
  switch (metaData.confirmationType) {
    case 'cartChange':
      notification.confirm = notification.confirm || function(payload) {
        api
          .post(i18n.t('urls.confirmCartChange'), {
            id: metaData.id
          })
          .then(payload.resolve, payload.decline);
      };

      break;

      // no default
  }

  state.notifications.unshift(notification);

  state.id += 1;
}

export default {
  namespaced: true,
  state: {
    /**
     * @type {Array} Stores notifications.
     */
    notifications: [],

    /**
     * @type {Number} Stores notification id (needed for proper keying in frontend).
     */
    id: 1,
  },
  getters: {

    /**
     * Gets all notifications that are bound to a selector.
     *
     * @param {Object} state - Current state.
     *
     * @returns {Array} selectorNotifications - All notifications bound to a selector.
     */
    selectorNotifications: state => state.notifications.filter(({ message }) => message.source && message.source.selector),

    /**
     * Gets all notifications that are not bound to a selector.
     *
     * @param {Object} state - Current state.
     *
     * @returns {Array} nonSelectorNotifications - All notifications not bound to a selector.
     */
    nonSelectorNotifications: state => state.notifications.filter(({ message }) => !message.source || !message.source.selector),

    /**
     * Gets the global notifications.
     *
     * @param {Object} state - Current state.
     *
     * @returns {Array} globalNotifications - The global notifications.
     */
    globalNotifications: state => state.notifications.filter(({ message }) => !message.source && message.type !== 'add-to-cart'),

    /**
     * Gets the add-to-cart notifications.
     *
     * @param {Object} state - Current state.
     *
     * @returns {Array} addToCartNotifications - The add-to-cart notifications.
     */
    addToCartNotifications: state => state.notifications.filter(({ message }) => message.type === 'add-to-cart'),

    /**
     * Gets the field notifications.
     *
     * @param {Object} state - Current state.
     *
     * @returns {Array} fieldNotifications - The field notifications.
     */
    fieldNotifications: state => state.notifications.filter(({ message }) => message.source && message.source.field),

    /**
     * Gets the global and add-to-cart notifications.
     *
     * @param {Object} state - Current state.
     *
     * @returns {Array} globalAndAddToCartNotifications - The global and add-to-cart notifications.
     */
    globalAndAddToCartNotifications: state => state.notifications.filter(({ message }) => !message.source),
  },
  mutations: {
    /**
     * Adds a notification.
     *
     * @param {Object} state - Current state.
     * @param {Object} options - Notification object.
     * @param {Object} options.message - The message configuration.
     * @param {String} options.message.type - The message type (success, error, warning, info).
     * @param {String} options.message.message - The message text.
     */
    pushNotification,

    /**
     * Removes a notification.
     *
     * @param {Object} state - Current state.
     * @param {Number} id - Id of the notification.
     */
    popNotification(state, id) {
      state.notifications = state.notifications.filter(notification => notification.id !== id);
    },

    /**
     * Flushes field notifications.
     *
     * @param {Object} state - Current state.
     */
    flushFieldNotifications(state) {
      state.notifications = state.notifications.filter(notification => !notification.message.source || !notification.message.source.field); // eslint-disable-line max-len
    },
  },
  actions: {
    /**
     * Accepts the initial data Array of notification Objects.
     *
     * @param {Object} context - An object of context related methods.
     * @param {Function} context.commit - The vuex commit method.
     * @param {Array.<Object>} [payload] - An Array of notification Objects.
     */
    data({ commit }, payload) {
      if (!Array.isArray(payload)) {
        throw Error("The payload data given to 'notification/data' is not of type Array.");
      }

      payload.forEach((message) => {
        commit('pushNotification', { message, delay: 6 });
      });
    },

    /**
     * Adds an "unknown error" to the notification stack.
     *
     * @param {Object} context - An object of context related methods.
     * @param {Function} context.commit - The vuex commit method.
     */
    showUnknownError({ commit }) {
      commit('pushNotification', NOTIFICATION_UNKNOWN_ERROR);
    }
  },
};
