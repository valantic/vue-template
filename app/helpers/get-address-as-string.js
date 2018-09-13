/**
 * Converts an address object to a human readable address string.
 *
 * @param {Object} address - The address object.
 * @param {String} address.address1 - First line of address.
 * @param {String} address.address2 - Second line of address.
 * @param {String} address.address3 - Third line of address.
 * @param {String} address.address4 - Fourth line of address.
 * @param {String} address.address5 - Fifth line of address.
 * @param {String} address.zipCode - Zip code of address.
 * @param {String} address.city - City of address.
 *
 * @returns {String}
 */
export default function getAddressAsString(address) {
  const list = [
    address.address1 ? `<span class="c-address-selector__list-item--bold">${address.address1}</span>` : '',
    address.address2,
    address.address3,
    address.address4,
    address.address5,
    address.zipCode,
    address.city
  ];

  return list.filter(item => item && item.length).join(' ');
}
