import { INotification } from '@/types/c-notification';
import mockNotifications from '@/styleguide/mock-data/data-object/notification';

interface INotificationResponse {
  data: object,
  notifications: INotification[]
}

/**
 * Creates an empty API response with a notification.
 */
function createApiResponse(notification: INotification): INotificationResponse {
  return {
    data: {},
    notifications: [notification], // TODO: Check if the Backend System provides the notifications Array like it's done here.
  };
}

export default {
  success: createApiResponse(mockNotifications.success),
  info: createApiResponse(mockNotifications.info),
  error: createApiResponse(mockNotifications.error),
  createApiResponse,
};
