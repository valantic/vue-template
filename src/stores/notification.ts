import {
  Store,
  defineStore,
  StateTree,
  _GettersTree,
} from 'pinia';
import { IS_STORAGE_AVAILABLE } from '@/setup/globals';
import i18n from '@/setup/i18n';

export interface INotificationItem {
  id: number;
  type?: string;
  message?: string;
  expire?: boolean;
  selector?: string | null;
  redirectUrl?: string;
}

interface INotificationState extends StateTree {

  /**
   * Holds the notification items.
   */
  notifications: INotificationItem[];
}

interface INotificationGetters extends _GettersTree<INotificationState> {

  /**
   * Gets the current list of notifications.
   */
  getNotifications: (state: INotificationState) => INotificationItem[];
}

interface INotificationActions {

  /**
   * Shows the given notification and returns its instance.
   */
  showNotification: (notificationItem: INotificationItem) => INotificationItem;

  /**
   * Removes a notification.
   */
  popNotification: (id: number) => void;

  /**
   * Adds an "unknown error" to the notification stack.
   */
  showUnknownError: () => void;
}

export type TNotificationStore = Store<string, INotificationState, INotificationGetters, INotificationActions>;

interface IInitialStoreData {

  /**
   * Holds the initial notification items.
   */
  notifications?: INotificationItem[];
}

/**
 * Default unknown error notification template.
 */
const NOTIFICATION_UNKNOWN_ERROR: INotificationItem = {
  id: 0,
  type: 'error',
  message: i18n.global.t('globalMessages.unknownApiError'),
};

const storeName = 'notification';

let currentId = 1;

/**
 * Handles notification redirects.
 */
function handleRedirect(notification: INotificationItem): void {
  const { redirectUrl } = notification || {};

  if (redirectUrl && IS_STORAGE_AVAILABLE) {
    localStorage.setItem('notification', JSON.stringify({
      ...notification,
      redirectUrl: null,
    }));

    window.location.href = redirectUrl;
  }
}

/**
 * Adds a unique ID to a notification.
 */
function addId(notification: INotificationItem): INotificationItem {
  currentId += 1;

  return {
    ...notification,
    id: currentId,
  };
}

export default defineStore<typeof storeName, INotificationState, INotificationGetters, INotificationActions>(storeName, {
  state: (): INotificationState => {
    const initialData: IInitialStoreData = window.initialData?.[storeName] || {};

    const state: INotificationState = {
      notifications: [],
    };

    if (Array.isArray(initialData.notifications) && initialData.notifications.length) {
      state.notifications = initialData.notifications.map((notification) => {
        handleRedirect(notification);

        return addId(notification);
      });

      delete initialData.notifications;
    }

    return state;
  },
  getters: {
    getNotifications(state) {
      return state.notifications;
    },
  },
  actions: {
    showNotification(notification) {
      handleRedirect(notification);

      const mappedNotification = addId(notification);

      this.notifications.push(mappedNotification);

      return mappedNotification;
    },

    popNotification(id) {
      this.notifications = this.notifications.filter(notification => notification.id !== id);
    },

    showUnknownError() {
      this.showNotification(NOTIFICATION_UNKNOWN_ERROR);
    },
  },
});
