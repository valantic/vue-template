type PropConfig = {
  type: (NumberConstructor | StringConstructor)[];
  default: number;
  validator?(value: string): boolean;
};

/**
 * Creates a scale validation function for scale value props.
 */
export default function (defaultValue: number, validNumbers: number[]): PropConfig {
  const propConfig: PropConfig = {
    type: [Number, String],
    default: defaultValue,
  };

  if (import.meta.env.MODE !== 'production') {
    if (!Array.isArray(validNumbers)) {
      throw new Error("'validNumbers' is not an array.");
    }

    if (typeof defaultValue !== 'number') {
      throw new Error("'defaultValue' is not a Number.");
    }

    propConfig.validator = function (value): boolean {
      // Note, that validators are not triggered in production mode.
      return validNumbers.includes(parseInt(value, 10));
    };
  }

  return propConfig;
}
