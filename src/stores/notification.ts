import { defineStore } from 'pinia';
import { IS_STORAGE_AVAILABLE, NOTIFICATION_UNKNOWN_ERROR } from '@/setup/globals';

export interface INotificationItem {
  id: number;
  type?: string;
  message?: string;
  expire?: boolean;
  selector?: string | null;
  redirectUrl?: string;
}

export interface INotificationState {
  notifications: INotificationItem[];
}

function handleRedirect(notification: INotificationItem) {
  const { redirectUrl } = notification || {};

  // Redirect Handler
  if (redirectUrl && IS_STORAGE_AVAILABLE) {
    localStorage.setItem('notification', JSON.stringify({
      ...notification,
      redirectUrl: null,
    }));

    window.location.href = redirectUrl;
  }
}

/**
 * Holds the name of the store.
 */
const storeName: string = 'notification';

/**
 * Holds the number of the most recently added notification.
 */
let currentId: number = 1;

export const useNotificationStore = defineStore(storeName, {
  state: (): INotificationState => {
    const initialData = window.initialData?.[storeName] || {};
    const { notifications } = initialData || {};

    const state: INotificationState = {
      /**
       * Stores notifications.
       */
      notifications: [],
    };

    if (Array.isArray(notifications) && notifications.length) {
      state.notifications = notifications.map((notification: INotificationItem) => {
        handleRedirect(notification);

        currentId += 1;

        return notification;
      });
    }

    return state;
  },
  getters: {
    /**
     * Gets the current list of notifications.
     */
    getNotifications(): INotificationItem[] {
      return this.notifications;
    },
  },
  actions: {
    /**
     * Adds a notification.
     */
    pushNotification(notification: INotificationItem) {
      handleRedirect(notification);

      this.notifications.push(notification);
    },

    /**
     * Removes a notification.
     */
    popNotification(id: number) {
      this.notifications = this.notifications.filter((notification: INotificationItem) => notification.id !== id);
    },

    /**
     * Adds an "unknown error" to the notification stack.
     */
    showUnknownError() {
      // this.pushNotification(NOTIFICATION_UNKNOWN_ERROR);
    }
  },
});
