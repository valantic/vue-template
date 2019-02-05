/**
 * Creates a scale validation function for scale value props.
 *
 * @param {Array.<Number>} validNumbers - An Array of valid scale numbers.
 * @param {Number} [defaultValue = 500] - The default value for this prop.
 *
 * @returns {Object}
 */
export default function(validNumbers, defaultValue = 500) {
  const propConfig = {
    type: [Number, String],
    default: defaultValue
  };

  if (process.env.NODE_ENV !== 'production') {
    if (!Array.isArray(validNumbers)) {
      throw new Error("'validNumbers' is not an array.");
    }

    propConfig.validator = function(value) { // Note, that validators are not triggered in production mode.
      return validNumbers.includes(parseInt(value, 10));
    };
  }

  return propConfig;
}
