import { NOTIFICATION_UNKNOWN_ERROR } from '@/setup/globals';
import i18n from '@/setup/i18n';
import api from '@/helpers/api';
import { IMessage, INotification } from '@/types/c-notification';
import { defineModule } from 'direct-vuex';
import { moduleActionContext } from '@/store';

interface IModNotificationState {
  notifications: INotification[];
  id: number;
}

/**
 * Pushes the given notification to the notification stack.
 *
 * This is a work around to handle app internal and external pushes of notifications.
 * A better way would be to refactor this to an action.
 *
 */
function pushNotification(state: IModNotificationState, options: INotification) {
  if (!options) {
    return;
  }

  const notification = {
    ...options,
    id: state.id,
    expire: options.expire !== false,
    delay: options.delay || 3
  };
  const metaData = notification?.message?.meta || { confirmationType: '', id: '' };

  // Attach confirmation actions (if confirmationType is missing, this is ignored)
  switch (metaData.confirmationType) {
    case 'cartChange':
      notification.confirm = notification.confirm || function(payload) {
        api
          .post(i18n.global.t('urls.confirmCartChange'), {
            id: metaData.id
          }, {}, {})
          .then(payload.resolve, payload.decline);
      };

      break;

      // no default
  }

  state.notifications.unshift(notification);

  state.id += 1;
}

const notificationModule = defineModule({
  namespaced: true,
  state: (): IModNotificationState => ({
    /**
     * Stores notifications.
     */
    notifications: [],

    /**
     * Stores notification id (needed for proper keying in frontend).
     */
    id: 1,
  }),
  getters: {
    /**
     * Gets all notifications that are bound to a selector.
     */
    // eslint-disable-next-line max-len
    getSelectorNotifications: (state: IModNotificationState) => state.notifications.filter(({ message }) => message?.source?.selector),

    /**
     * Gets all notifications that are not bound to a selector.
     */
    getNonSelectorNotifications: (state: IModNotificationState) => state.notifications
      .filter(({ message }) => !message?.source || !message.source.selector),

    /**
     * Gets the global notifications.
     */
    getGlobalNotifications: (state: IModNotificationState) => state.notifications
      .filter(({ message }) => !message?.source && message?.type !== 'add-to-cart'),

    /**
     * Gets the add-to-cart notifications.
     */
    // eslint-disable-next-line max-len
    getAddToCartNotifications: (state: IModNotificationState) => state.notifications.filter(({ message }) => message?.type === 'add-to-cart'),

    /**
     * Gets the field notifications.
     */
    // eslint-disable-next-line max-len
    getFieldNotifications: (state: IModNotificationState): INotification[] => state.notifications.filter(({ message }) => message?.source?.field),
  },

  mutations: {
    /**
     * Adds a notification.
     */
    pushNotification,

    /**
     * Removes a notification.
     */
    popNotification(state: IModNotificationState, id: number) {
      state.notifications = state.notifications.filter(notification => notification.id !== id);
    },

    /**
     * Flushes field notifications.
     */
    flushFieldNotifications(state: IModNotificationState) {
      state.notifications = state.notifications.filter(notification => !notification.message?.source || !notification.message.source.field); // eslint-disable-line max-len
    },
  },

  actions: {
    /**
     * Accepts the initial data Array of notification Objects.
     */
    data(context, payload: IMessage[]) {
      if (!Array.isArray(payload)) {
        throw Error("The payload data given to 'notification/data' is not of type Array.");
      }

      // eslint-disable-next-line no-use-before-define
      const { commit } = notificationActionContext(context);

      payload.forEach((message) => {
        commit.pushNotification({ message, delay: 6 });
      });
    },

    /**
     * Adds an "unknown error" to the notification stack.
     */
    showUnknownError(context) {
      // eslint-disable-next-line no-use-before-define
      const { commit } = notificationActionContext(context);

      commit.pushNotification(NOTIFICATION_UNKNOWN_ERROR);
    }
  },
});

export default notificationModule;

const notificationActionContext = (context: any) => moduleActionContext(context, notificationModule);
