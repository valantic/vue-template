/**
 * Validates if the given value is a non empty string.
 *
 * @param {*} val - The to be tested value.
 *
 * @returns {Boolean}
 */
export const isString = val => val && typeof val === 'string';

/**
 * Validates if the given value is a native Object.
 *
 * @param {*} val - The to be tested value.
 *
 * @returns {Boolean}
 */
export const isPObject = val => !!(val && typeof val === 'object' && val.constructor === Object && Object.keys(val).length);

/**
 * Converts the given string into kebab-case.
 *
 * @param {String} str - The to be converted String.
 *
 * @returns {String}
 */
export const hyphenate = str => str.replace(/\B([A-Z])/g, '-$1').toLowerCase();

/**
 * Validates if the given value is a Number.
 *
 * @param {*} val - The to be tested value.
 *
 * @returns {Boolean}
 */
export const isNumber = val => typeof val === 'number' && Number.isFinite(val);
