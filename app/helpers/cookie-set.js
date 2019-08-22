/**
 * Creates and sets a new cookie with the given values.
 *
 * @param {String} name - The identifier name of the cookie.
 * @param {String} value - The cookies value;
 * @param {Number} maxAge - The max age of the cookie in seconds. Negative or 0 will expire immediately.
 */
export default function setCookie(name, value, maxAge) {
  const maxAgeString = Number.isInteger(maxAge) ? ` max-age=${maxAge};` : '';

  document.cookie = `${name}=${value || ''};${maxAgeString}`;
}
