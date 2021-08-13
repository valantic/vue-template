import { ISprykerImage } from '@/types/spryker';
import { IImage } from '@/types/e-image';
import mapHeroImage from './map-hero-image';

/**
 * Maps image object from spryker CMS to e-picture component.
 *
 * @param {Array} images - Images from CMS.
 *
 * @returns {Array|null}
 */
export default function mapHeroImages(images: ISprykerImage[]): IImage[] | null {
  if (!images) {
    return null;
  }

  return images.reduce((result: IImage[], inputImage, index) => {
    const image = mapHeroImage(inputImage, index);

    if (image !== null) {
      result.push(image);
    }

    return result;
  }, []);
}
