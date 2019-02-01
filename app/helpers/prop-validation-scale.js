/**
 * Creates a scale validation function for scale value props.
 *
 * @param {Array.<Number>} validNumbers - An Array of valid scale numbers.
 *
 * @returns {Function}
 */
export default function(validNumbers) {
  if (process.env.NODE_ENV !== 'production') {
    if (!Array.isArray(validNumbers)) {
      throw new Error("'validNumbers' is not an array.");
    }
  }

  /**
   * Validates if the given value is part of the available scales.
   *
   * @param {*} value - The to be tested value.
   *
   * @returns {Boolean}
   */
  return function(value) {
    return validNumbers.includes(parseInt(value, 10));
  };
}
