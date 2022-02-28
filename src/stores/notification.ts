import { defineStore } from 'pinia';
import { INotification } from '@/types/c-notification';
import { IS_STORAGE_AVAILABLE, NOTIFICATION_UNKNOWN_ERROR } from '@/setup/globals';

interface INotificationState {
  notifications: INotification[];
}

function handleRedirect(notification: INotification) {
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

const storeName = 'notification';
let lastId = 1;

export default defineStore(storeName, {
  state: (): INotificationState => {
    const initialData = window.initialData?.[storeName] || {};
    const { notifications } = initialData || {};

    const state = {
      /**
       * Stores notifications.
       */
      notifications: [],
    };

    if (Array.isArray(notifications) && notifications.length) {
      notifications.map((notification: INotification) => {
        handleRedirect(notification);

        lastId += 1;

        return notification;
      });
    }

    return state;
  },
  getters: {
    /**
     * Gets the current list of notifications.
     */
    getNotifications(): INotification[] {
      return this.notifications;
    },
  },
  actions: {
    /**
     * Adds a notification.
     */
    pushNotification(notification: INotification) {
      handleRedirect(notification);

      this.notifications.push(notification);
    },

    /**
     * Removes a notification.
     */
    popNotification(id: number) {
      this.notifications = this.notifications.filter((notification: INotification) => notification.id !== id);
    },

    /**
     * Adds an "unknown error" to the notification stack.
     */
    showUnknownError() {
      // this.pushNotification(NOTIFICATION_UNKNOWN_ERROR);
    }
  },
});
