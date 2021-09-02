import { ISprykerImage } from '@/types/spryker';
import { IImage } from '@/types/e-image';
import mapImage from './map-image';

/**
 * Maps image object from spryker API to e-picture component.
 */
export default function mapImages(images: ISprykerImage[]): IImage[] | null {
  if (!Array.isArray(images)) {
    return null;
  }

  return images.reduce((result: IImage[], sprykerImage) => {
    const image = mapImage(sprykerImage);

    if (image !== null) {
      result.push(image);
    }

    return result;
  }, []);
}
