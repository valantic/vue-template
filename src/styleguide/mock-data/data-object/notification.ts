import { NotificationItem } from '@/stores/notification';

type MockNotifications = {
  success: NotificationItem;
  info: NotificationItem;
  error: NotificationItem;
  createNotification(notificationOptions: object): NotificationItem;
};

/**
 * Creates a notification object with the given params.
 */
function createNotification({
  type,
  message,
  expire,
  selector,
  redirectUrl,
}: {
  type?: string;
  message?: string;
  expire?: boolean;
  selector?: string;
  redirectUrl?: string;
}): NotificationItem {
  return {
    type: type || 'success',
    message: message || `This is an example ${type} message.`,
    expire: typeof expire === 'boolean' ? expire : true,
    selector: selector || null,
    redirectUrl: redirectUrl || '',
  };
}

const mockNotifications: MockNotifications = {
  success: createNotification({ type: 'success' }),
  info: createNotification({ type: 'info' }),
  error: createNotification({ type: 'error' }),
  createNotification,
};

export default mockNotifications;
