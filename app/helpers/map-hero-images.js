import mapHeroImage from './map-hero-image';

/**
 * Maps image object from spryker CMS to e-picture component.
 *
 * @param {Array} images - Images from CMS.
 *
 * @returns {Array|null}
 */
export default function mapHeroImages(images) {
  if (!images) {
    return null;
  }

  return images.map((image, index) => mapHeroImage(image, index));
}
