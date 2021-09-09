import notifications from '@/styleguide/mock-data/data-object/notifications';

/**
 * Creates an empty API response with a notification.
 *
 * @param {Object} notification - The notification object.
 *
 * @returns {Object}
 */
function createApiResponse(notification) {
  return {
    data: {},
    messages: [notification],
  };
}

export default {
  success: createApiResponse(notifications.success),
  info: createApiResponse(notifications.info),
  error: createApiResponse(notifications.error),
};
