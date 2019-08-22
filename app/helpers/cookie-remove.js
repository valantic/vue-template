/**
 * Removes the cookie with the given name.
 *
 * @param {String} name - The identifier name of the to be removed cookie.
 */
export default function removeCookie(name) {
  document.cookie = `${name}=; max-age=0;`;
}
