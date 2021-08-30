import { IImage } from '@/types/e-image';
import { ISprykerImage } from '@/types/spryker';

/**
 * Maps image object from spryker CMS to e-picture component.
 */
export default function mapHeroImage(image: ISprykerImage, id: number): IImage | null {
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
