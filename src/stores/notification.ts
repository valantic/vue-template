import { defineStore } from 'pinia';
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

export interface INotificationState {
  notifications: INotificationItem[];
}

const NOTIFICATION_UNKNOWN_ERROR = {
  id: 0,
  type: 'error',
  message: i18n.global.t('globalMessages.unknownApiError'),
};

/**
 * Holds the name of the store.
 */
const storeName: string = 'notification';

/**
 * Holds the number of the most recently added notification.
 */
let currentId: number = 1;

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

function mapNotification(notification: INotificationItem): INotificationItem {
  currentId += 1;

  return {
    ...notification,
    id: currentId
  };
}

export const useNotificationStore = defineStore(storeName, {
  state: (): INotificationState => {
    const initialData = window.initialData?.[storeName] || {};

    const state: INotificationState = {
      /**
       * Stores notifications.
       */
      notifications: [],
    };

    if (Array.isArray(initialData.notifications) && initialData.notifications.length) {
      state.notifications = initialData.notifications.map((notification: INotificationItem) => {
        handleRedirect(notification);

        return mapNotification(notification);
      });

      delete initialData.notifications;
    }

    return state;
  },
  getters: {
    /**
     * Gets the current list of notifications.
     */
    getNotifications(state: INotificationState): INotificationItem[] {
      return state.notifications;
    },
  },
  actions: {
    /**
     * Adds a notification.
     */
    pushNotification(notification: INotificationItem): void {
      handleRedirect(notification);

      this.notifications.push(mapNotification(notification));
    },

    /**
     * Removes a notification.
     */
    popNotification(id: number): void {
      this.notifications = this.notifications.filter((notification: INotificationItem) => notification.id !== id);
    },

    /**
     * Adds an "unknown error" to the notification stack.
     */
    showUnknownError() {
      this.pushNotification(NOTIFICATION_UNKNOWN_ERROR);
    }
  },
});
