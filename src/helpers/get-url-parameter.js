/**
 * Get's a given URL param from the current location, if there isn't a given param - it returns null.
 *
 * @param   {String}    name      param-name
 *
 * @returns {String}    param value if it's available
 */
export default function getUrlParameter(name) {
  if (!name) {
    console.error('There is no param set in the URL');

    return null;
  }

  name = name.replace(/[[]/, '\\[')
    .replace(/[\]]/, '\\]');

  const urlParam = new URLSearchParams(window.location.search);

  return urlParam.get(name);
}
