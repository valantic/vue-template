import { ISprykerImage } from '@/types/spryker';
import { IEImage } from '@/types/e-image';
import mapHeroImage from './map-hero-image';

/**
 * Maps image object from spryker CMS to e-picture component.
 *
 * @param {Array} images - Images from CMS.
 *
 * @returns {Array|null}
 */
export default function mapHeroImages(images: ISprykerImage[]): (IEImage | null)[] | null {
  if (!images) {
    return null;
  }

  return images.map((image, index) => mapHeroImage(image, index));
}
