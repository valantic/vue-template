/**
 * Formats the e-number with spaces after each 3 digits.
 *
 * @param {String} number - The e-number in the default format.
 *
 * @returns {String}
 */
export default function splitENumber(number) {
  if (!number) {
    return '';
  }

  const trimmedENumber = number.replace(/\s/g, '');

  return trimmedENumber.replace(/(.{3})(?!$)/g, '$1 ');
}
