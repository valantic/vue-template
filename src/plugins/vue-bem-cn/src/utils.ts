/**
 * Checks if the given value is a non empty String.
 */
export const isString = (value: any): boolean => value && typeof value === 'string';

/**
 * Checks if the given value is a native JS Object with values.
 */
export const isPObject = (value: any): boolean => !!(value && typeof value === 'object' && value.constructor === Object && Object.keys(value).length); // eslint-disable-line max-len

/**
 * Checks if the given value is a finite number.
 */
export const isNumber = (value: any): boolean => !Number.isNaN(value) && Number.isFinite(value);

/**
 * Converts the given camelCase String to kebab-case.
 */
export const hyphenate = (value: string): string => value.replace(/\B([A-Z])/g, '-$1').toLowerCase();
