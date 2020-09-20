interface PropScale {
  type: object[];
  default: any;
  validator?: (value: string | number) => boolean;
}

/**
 * Creates a scale validation function for scale value props.
 *
 * @param {Number} [defaultValue = 500] - The default value for this prop.
 * @param {Array.<Number>} validNumbers - An Array of valid scale numbers.
 *
 * @returns {Object}
 */
export default function(defaultValue: number, validNumbers: number[]): PropScale {
  const propConfig: PropScale = {
    type: [Number, String],
    default: defaultValue
  };

  if (process.env.NODE_ENV !== 'production') {
    if (!Array.isArray(validNumbers)) {
      throw new Error("'validNumbers' is not an array.");
    }

    propConfig.validator = function validator(value) { // Note, that validators are not triggered in production mode.
      return validNumbers.includes(parseInt(`${value}`, 10));
    };
  }

  return propConfig;
}
