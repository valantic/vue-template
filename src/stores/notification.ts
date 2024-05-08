import { defineStore } from 'pinia';
import { ApiResponseMessageAction, IS_STORAGE_AVAILABLE, Store, WindowsStorage } from '@/setup/globals';
import i18n from '@/setup/i18n';
import { ApiResponseMessages } from '@/types/api-response';
import { ApiResponseMessage } from '@/types/api-response-message';

export type NotificationItem = {
  type?: string;
  message?: string;
  expire?: boolean;
  selector?: string | null;
  pageReload?: boolean;
  redirectUrl?: string;
  showToUser?: boolean;
};

export type MappedNotificationItem = NotificationItem & {
  /**
   * The ID of the notification.
   */
  id: number;
};

type NotificationState = {
  /**
   * Holds the notification items.
   */
  notifications: MappedNotificationItem[];

  /**
   * Defines if the global default notifications should be displayed.
   * Can be used to disable them for cases like when the global notifications
   * are displayed already at another place, e.g. in a modal.
   */
  showDefaultGlobalNotifications: boolean;
};

type InitialData = {
  /**
   * Holds the initial response messages.
   */
  messages?: ApiResponseMessages;
};

/**
 * Default unknown error notification template.
 */
const NOTIFICATION_UNKNOWN_ERROR: NotificationItem = {
  type: 'error',
  message: i18n.global.t('globalMessages.unknownApiError'),
};

const storeName = Store.Notification;

let currentId = 1;

/**
 * Handles notification redirects.
 */
function handleRedirectOrReload(notification: NotificationItem): void {
  const { redirectUrl } = notification || {};

  if (redirectUrl && IS_STORAGE_AVAILABLE) {
    localStorage.setItem(
      'notification',
      JSON.stringify({
        ...notification,
        redirectUrl: null,
      })
    );

    if (notification.pageReload) {
      window.location.reload();
    } else {
      window.location.href = redirectUrl;
    }
  }
}

/**
 * Gets localStorage messages and pushes them in the notification store to display.
 */
function getNotificationsFromStorage(): MappedNotificationItem[] {
  try {
    const messages = window.localStorage.getItem(WindowsStorage.Notifications);
    const messagesParsed = messages ? JSON.parse(messages) : null;

    if (Array.isArray(messagesParsed) && messagesParsed.length) {
      window.localStorage.removeItem(WindowsStorage.Notifications);

      return messagesParsed;
    }
  } catch (error) {
    console.error(new Error('An error occurred while retrieving messages from the localStorage.')); // eslint-disable-line no-console
  }

  return [];
}

/**
 * Adds a unique ID to a notification.
 */
function addId(notification: NotificationItem): MappedNotificationItem {
  currentId += 1;

  return {
    ...notification,
    id: currentId,
  };
}

function mapApiResponseMessage(message: ApiResponseMessage, type: 'success' | 'info' | 'error'): NotificationItem {
  const { secondsToShow } = message || {};

  return {
    type,
    message: message.message,
    expire: typeof secondsToShow === 'number' && secondsToShow > 0,
    pageReload: message.action === ApiResponseMessageAction.PageReload,
    redirectUrl: message.redirectUrl,
  };
}

export function mapApiResponseMessages(messages: ApiResponseMessages): NotificationItem[] {
  const { success, info, error } = messages || {};

  const notifications: NotificationItem[] = [];

  if (Array.isArray(success) && success.length) {
    notifications.push(...success.map((message) => mapApiResponseMessage(message, 'success')));
  }

  if (Array.isArray(info) && info.length) {
    notifications.push(...info.map((message) => mapApiResponseMessage(message, 'info')));
  }

  if (Array.isArray(error) && error.length) {
    notifications.push(...error.map((message) => mapApiResponseMessage(message, 'error')));
  }

  return notifications;
}

export default defineStore(storeName, {
  state: () => {
    const initialData: InitialData = window.initialData?.[storeName] || {};
    const { messages } = initialData || {};

    const state: NotificationState = {
      notifications: getNotificationsFromStorage(),
      showDefaultGlobalNotifications: true,
    };

    if (messages) {
      state.notifications = mapApiResponseMessages(messages).map((notification) => {
        handleRedirectOrReload(notification);

        return addId(notification);
      });
    }

    return state;
  },
  getters: {
    getNotifications(state) {
      return state.notifications;
    },
  },
  actions: {
    /**
     * Shows the given notification and returns its instance.
     */
    showNotification(notification: NotificationItem): void {
      handleRedirectOrReload(notification);

      if (notification.showToUser === false) {
        return;
      }

      const mappedNotification = addId(notification);

      this.notifications.push(mappedNotification);
    },

    /**
     * Removes a notification.
     */
    popNotification(id: number): void {
      this.notifications = this.notifications.filter((notification) => notification.id !== id);
    },

    showUnknownError(): void {
      this.showNotification(NOTIFICATION_UNKNOWN_ERROR);
    },
  },
});
