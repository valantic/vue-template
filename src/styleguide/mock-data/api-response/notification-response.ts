import { INotificationItem } from '@/stores/notification';
import mockNotifications from '@/styleguide/mock-data/data-object/notification';

interface INotificationResponse {
  data: object,
  notifications: INotificationItem[]
}

/**
 * Creates an empty API response with a notification.
 */
function createApiResponse(notification: INotificationItem): INotificationResponse {
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
