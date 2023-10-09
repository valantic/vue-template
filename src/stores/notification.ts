import { StateTree, Store, _GettersTree, defineStore } from 'pinia';
import { GlobalStore, S_STORAGE_AVAILABLE } from '@/setup/globals';
import i18n from '@/setup/i18n';

export interface NotificationItem {
  id: number;
  type?: string;
  message?: string;
  expire?: boolean;
  selector?: string | null;
  redirectUrl?: string;
}

interface NotificationState extends StateTree {
  /**
   * Holds the notification items.
   */
  notifications: NotificationItem[];
}

interface NotificationGetters extends _GettersTree<NotificationState> {
  /**
   * Gets the current list of notifications.
   */
  getNotifications(state: NotificationState): NotificationItem[];
}

interface NotificationActions {
  /**
   * Shows the given notification and returns its instance.
   */
  showNotification(notificationItem: NotificationItem): NotificationItem;

  /**
   * Removes a notification.
   */
  popNotification(id: number): void;

  /**
   * Adds an "unknown error" to the notification stack.
   */
  showUnknownError(): void;
}

export type NotificationStore = Store<string, NotificationState, NotificationGetters, NotificationActions>;

interface InitialStoreData {
  /**
   * Holds the initial notification items.
   */
  notifications?: NotificationItem[];
}

/**
 * Default unknown error notification template.
 */
const NOTIFICATION_UNKNOWN_ERROR: NotificationItem = {
  id: 0,
  type: 'error',
  message: i18n.global.t('globalMessages.unknownApiError'),
};

const storeName = GlobalStore.Notification;

let currentId = 1;

/**
 * Handles notification redirects.
 */
function handleRedirect(notification: NotificationItem): void {
  const { redirectUrl } = notification || {};

  if (redirectUrl && S_STORAGE_AVAILABLE) {
    localStorage.setItem(
      'notification',
      JSON.stringify({
        ...notification,
        redirectUrl: null,
      }),
    );

    window.location.href = redirectUrl;
  }
}

/**
 * Adds a unique ID to a notification.
 */
function addId(notification: NotificationItem): NotificationItem {
  currentId += 1;

  return {
    ...notification,
    id: currentId,
  };
}

export default defineStore<typeof storeName, NotificationState, NotificationGetters, NotificationActions>(storeName, {
  state: (): NotificationState => {
    const initialData: InitialStoreData = window.initialData?.[storeName] || {};

    const state: NotificationState = {
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
      this.notifications = this.notifications.filter((notification) => notification.id !== id);
    },

    showUnknownError() {
      this.showNotification(NOTIFICATION_UNKNOWN_ERROR);
    },
  },
});
