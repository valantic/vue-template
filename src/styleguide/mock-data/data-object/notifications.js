/**
 * Creates a notification object with the given params.
 *
 * @param {String} [type] - The message type.
 * @param {String} [message] - The message to display.
 * @param {Boolean} [expire] - Defines if the message should expire or stay.
 *
 * @returns {Object}
 */
function createMessage(type = 'success', message = '', expire = false) {
  return {
    type,
    message: message || `This is an example ${type} message.`,
    expire,
  };
}

export default {
  success: createMessage('success'),
  info: createMessage('info'),
  error: createMessage('error'),
  createMessage,
};
