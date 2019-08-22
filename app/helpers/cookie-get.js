/**
 * Gets the value of a cookie by it's name. Returns NULL if cookie is not found.
 *
 * @param {String} name - The identifier name of the cookie.
 *
 * @returns {String|null}
 */
export default function getCookie(name) {
  const identifier = `${name}=`;
  const cookie = document.cookie
    .split(';')
    .find(item => item.trim().startsWith(identifier));

  return cookie
    ? cookie.substring(identifier.length + 1)
    : null;
}
