/**
 * Checks if the given value is a non empty String.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isString = (value: any): boolean => value && typeof value === 'string';

/**
 * Checks if the given value is a native JS Object with values.
 */
// eslint-disable-next-line max-len, @typescript-eslint/no-explicit-any
export const isPObject = (value: any): boolean =>
  !!(value && typeof value === 'object' && value.constructor === Object && Object.keys(value).length);

/**
 * Checks if the given value is a finite number.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isNumber = (value: any): boolean => !Number.isNaN(value) && Number.isFinite(value);

/**
 * Converts the given camelCase String to kebab-case.
 */
export const hyphenate = (value: string): string => value.replace(/\B([A-Z])/g, '-$1').toLowerCase();
