/**
 * Maps image object from spryker CMS to e-picture component.
 *
 * @param {Object} image - Image from CMS.
 * @param {Number} id - Unique id of image.
 *
 * @returns {Object|null}
 */
export default function mapHeroImage(image, id) {
  if (!image) {
    return null;
  }

  const width = 845;

  return {
    id,
    fallback: image.imageUrl,
    srcset: { [width]: image.imageUrl },
    alt: '',
    href: image.href,
  };
}
