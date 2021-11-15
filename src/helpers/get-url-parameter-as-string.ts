/**
 * Returns the given parameters as string to append to an URL.
 */
export default function getUrlParameterAsString(parameters: string[]): string {
  let urlParametersString = '';

  parameters.forEach((parameter) => {
    urlParametersString += `${parameter}&`;
  });

  if (parameters.length) {
    urlParametersString = `?${urlParametersString.slice(0, -1)}`;
  }

  return urlParametersString;
}
