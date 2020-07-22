/**
 * Creates a deep clone of the given value.
 *
 * @param {*} value - The to be cloned value.
 *
 * @returns {*}
 */
export default function(value) {
  return JSON.parse(JSON.stringify(value));
}
