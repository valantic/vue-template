/**
 * get's a given URL param from the current location, if there isn't a given param - it returns null
 *
 * @param   {String}    name      param-name
 *
 * @returns {string}    param value if it's available
 */
export default function getUrlParameter(name) {
  name = name.replace(/[[]/, '\\[').replace(/[\]]/, '\\]');
  const regex = new RegExp(`[\\\\?&]${name}=([^&#]*)`);
  const results = regex.exec(window.location.search);

  return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}
