import { defineModule } from 'direct-vuex';
import { moduleActionContext } from '@/store';
import { IS_STORAGE_AVAILABLE, NOTIFICATION_UNKNOWN_ERROR } from '@/setup/globals';
import { INotification } from '@/types/c-notification';

interface IModNotificationState {
  notifications: INotification[];
  id: number;
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
     * Gets the current list of notifications.
     */
    getNotifications: (state: IModNotificationState): INotification[] => state.notifications,
  },

  mutations: {
    /**
     * Adds a notification.
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

      state.notifications.push({
        ...notification,
        id: Date.now(),
      });
    },

    /**
     * Removes a notification.
     */
    popNotification(state: IModNotificationState, id: number) {
      state.notifications = state.notifications.filter(notification => notification.id !== id);
    },
  },

  actions: {
    /**
     * Accepts the initial data Array of notification Objects.
     */
    data(context, payload: INotification[]) {
      if (!Array.isArray(payload)) {
        throw Error("The payload data given to 'notification/data' is not of type Array.");
      }

      // eslint-disable-next-line no-use-before-define
      const { commit } = notificationActionContext(context);

      payload.forEach((notification) => {
        commit.pushNotification(notification);
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const notificationActionContext = (context: any) => moduleActionContext(context, notificationModule);
