import { INotificationItem } from '@/stores/notification';

interface IMockNotifications {
  success: INotificationItem;
  info: INotificationItem;
  error: INotificationItem;
  createNotification: (notificationOptions: object) => INotificationItem;
}

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
  type?: string,
  message?: string,
  expire?: boolean,
  selector?: string,
  redirectUrl?: string,
}): INotificationItem {
  return {
    id: 0,
    type: type || 'success',
    message: message || `This is an example ${type} message.`,
    expire: typeof expire === 'boolean' ? expire : true,
    selector: selector || null,
    redirectUrl: redirectUrl || '',
  };
}

const mockNotifications: IMockNotifications = {
  success: createNotification({ type: 'success' }),
  info: createNotification({ type: 'info' }),
  error: createNotification({ type: 'error' }),
  createNotification,
};

export default mockNotifications;
