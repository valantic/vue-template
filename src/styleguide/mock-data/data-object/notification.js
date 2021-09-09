/**
 * Creates a notification object with the given params.
 *
 * @param {Object} payload - The config payload.
 * @param {String} [payload.type] - The message type.
 * @param {String} [payload.message] - The message to display.
 * @param {Boolean} [payload.expire] - Defines if the message should expire or stay.
 * @param {String|null} [payload.selector] - Defines an optional container selector.
 * @param {String|null} [payload.redirectUrl] - Defines the optional redirect URL.
 *
 * @returns {Object}
 */
function createNotification({
  type,
  message,
  expire,
  selector,
  redirectUrl,
}) {
  return {
    type: type || 'success',
    message: message || `This is an example ${type} message.`,
    expire: typeof expire === 'boolean' ? expire : true,
    selector: selector || null,
    redirectUrl: redirectUrl || '',
  };
}

export default {
  success: createNotification({ type: 'success' }),
  info: createNotification({ type: 'info' }),
  error: createNotification({ type: 'error' }),
  createNotification,
};
