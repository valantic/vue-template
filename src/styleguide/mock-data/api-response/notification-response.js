import notification from '@/styleguide/mock-data/data-object/notification';

/**
 * Creates an empty API response with a notification.
 *
 * @param {Object} data - The notification object.
 *
 * @returns {Object}
 */
function createApiResponse(data) {
  return {
    data: {},
    notifications: [data], // TODO: Check if the Backend System provides the notifications Array like it's done here.
  };
}

export default {
  success: createApiResponse(notification.success),
  info: createApiResponse(notification.info),
  error: createApiResponse(notification.error),
  createApiResponse,
};
