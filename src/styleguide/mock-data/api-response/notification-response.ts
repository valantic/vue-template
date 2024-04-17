import { NotificationItem } from '@/stores/notification';
import mockNotifications from '@/styleguide/mock-data/data-object/notification';

type NotificationResponse = {
  data: object;
  notifications: NotificationItem[];
};

/**
 * Creates an empty API response with a notification.
 */
function createApiResponse(notification: NotificationItem): NotificationResponse {
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
