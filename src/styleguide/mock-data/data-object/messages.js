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
function createMessage({
  type,
  message,
  expire,
  selector,
  redirectUrl,
}) {
  return {
    type: type || 'success',
    message: message || `This is an example ${type} message.`,
    expire: !!expire,
    selector: selector || null,
    redirectUrl: redirectUrl || '',
  };
}

export default {
  success: createMessage({ type: 'success' }),
  info: createMessage({ type: 'info' }),
  error: createMessage({ type: 'error' }),
  createMessage,
};
