import { INotification } from '@/types/c-notification';

interface IMockNotifications {
  success: INotification;
  info: INotification;
  error: INotification;
  createNotification: (notificationOptions: object) => INotification;
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
}): INotification {
  return {
    id: Date.now(),
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
