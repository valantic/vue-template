import mapImage from './map-image';

/**
 * Maps image object from spryker API to e-picture component.
 *
 * @param {Array} images - Images from API.
 *
 * @returns {Array|null}
 */
export default function mapImages(images) {
  if (!Array.isArray(images)) {
    return null;
  }

  return images.map(image => mapImage(image));
}
