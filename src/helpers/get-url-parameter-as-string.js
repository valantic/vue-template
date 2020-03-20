/**
 * Returns the given parameters as string to append to an URL.
 *
 * @param {Array} parameters - The parameters which should be returned as string.
 *
 * @returns {String}
 */
export default function getUrlParameterAsString(parameters) {
  let urlParametersString = '';

  parameters.forEach((parameter) => {
    urlParametersString += `${parameter}&`;
  });

  if (parameters.length) {
    urlParametersString = `?${urlParametersString.slice(0, -1)}`;
  }

  return urlParametersString;
}
