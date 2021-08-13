import { ISprykerImage } from '@/types/spryker';
import { IImage } from '@/types/e-image';

/**
 * Maps image object from spryker API to e-picture component.
 *
 * @param {Object} image - Image from API.
 *
 * @returns {Object|null}
 */
export default function mapImage(image: ISprykerImage): IImage | null {
  if (!image) {
    return null;
  }

  const srcset = {};

  if (image.thumbs.length) {
    image.thumbs.map((thumb) => {
      Object.assign(srcset, { [thumb.width]: thumb.absolutePath });
    });
  }

  return {
    id: image.idProductImage,
    fallback: image.externalUrlSmall,
    srcset,
    alt: '',
  };
}
