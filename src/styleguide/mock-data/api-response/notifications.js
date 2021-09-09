import messages from '@/styleguide/mock-data/data-object/messages';

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
  success: createApiResponse(messages.success),
  info: createApiResponse(messages.info),
  error: createApiResponse(messages.error),
  createApiResponse,
};
