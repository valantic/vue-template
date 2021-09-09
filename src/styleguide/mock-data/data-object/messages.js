/**
 * Creates a notification object with the given params.
 *
 * @param {String} [type] - The message type.
 * @param {String} [message] - The message to display.
 * @param {Boolean} [expire] - Defines if the message should expire or stay.
 * @param {String|null} [selector] - Defines an optional container selector.
 * @param {String|null} [redirectUrl] - Defines the optional redirect URL.
 *
 * @returns {Object}
 */
function createMessage( // eslint-disable-line max-params
  type = 'success',
  message = '',
  expire = false,
  selector = null,
  redirectUrl = '',
) {
  return {
    type,
    message: message || `This is an example ${type} message.`,
    expire,
    selector,
    redirectUrl,
  };
}

export default {
  success: createMessage('success'),
  info: createMessage('info'),
  error: createMessage('error'),
  createMessage,
};
