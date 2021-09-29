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
    notifications: [data],
  };
}

export default {
  success: createApiResponse(notification.success),
  info: createApiResponse(notification.info),
  error: createApiResponse(notification.error),
  createApiResponse,
};
