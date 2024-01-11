import { defineStore } from 'pinia';
import { IS_STORAGE_AVAILABLE, Store } from '@/setup/globals';
import i18n from '@/setup/i18n';

export type NotificationItem = {
  id: number;
  type?: string;
  message?: string;
  expire?: boolean;
  selector?: string | null;
  redirectUrl?: string;
}

type NotificationState = {

  /**
   * Holds the notification items.
   */
  notifications: NotificationItem[];
}

export type MappedNotificationItem = NotificationItem & {

  /**
   * The ID of the notification.
   */
  id: number;
}

type InitialStoreData = {

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

const storeName = Store.Notification;

let currentId = 1;

/**
 * Handles notification redirects.
 */
function handleRedirect(notification: NotificationItem): void {
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
function addId(notification: NotificationItem): NotificationItem {
  currentId += 1;

  return {
    ...notification,
    id: currentId,
  };
}

export default defineStore(storeName, {
  state: () => {
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
    showNotification(notification: NotificationItem): MappedNotificationItem {
      handleRedirect(notification);

      const mappedNotification = addId(notification);

      this.notifications.push(mappedNotification);

      return mappedNotification;
    },

    popNotification(id: number): void {
      this.notifications = this.notifications.filter(notification => notification.id !== id);
    },

    showUnknownError(): void {
      this.showNotification(NOTIFICATION_UNKNOWN_ERROR);
    },
  },
});
