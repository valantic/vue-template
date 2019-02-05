/**
 * Creates a scale validation function for scale value props.
 *
 * @param {Array.<Number>} validNumbers - An Array of valid scale numbers.
 * @param {Number} [defaultValue = 500] - The default value for this prop.
 *
 * @returns {Object}
 */
export default function(validNumbers, defaultValue = 500) {
  if (process.env.NODE_ENV !== 'production') {
    if (!Array.isArray(validNumbers)) {
      throw new Error("'validNumbers' is not an array.");
    }
  }

  return {
    type: [Number, String],
    default: defaultValue,
    validator(value) {
      return validNumbers.includes(parseInt(value, 10));
    }
  };
}
