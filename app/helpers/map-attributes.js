/* eslint-disable */

/**
 * Maps the main attributes and sets the emphasis state for the "eNr" attribute
 *
 * @param   {Array}    attrs   List of main-attributes
 *
 * @returns  {Array|null}  Mapped list
 */
export default function mapAttributes(attrs) {
  if (attrs && attrs.length) {
    return attrs.map((attr) => {
      return {
        keyLocalized: attr.keyLocalized,
        value: attr.value,
        url: attr.url,
        emphasis: attr.key === 'eNr'
      };
    });
  }

  return null;
}
