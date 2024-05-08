import { faker } from '@faker-js/faker/locale/en';
import { BREAKPOINTS_MAX, DEFAULT_IMAGE_SIZES } from '@/setup/globals';
import type { ImageMedia, ImageSources, ImageSrcset } from '@/types/image';

type Ratios = {
  [key: string]: number;
  fallback: number;
};

/**
 * Creates a randomized image (srcset).
 */
export function createSrcSetImage(heightRatio = 1, sizes: number[] = Object.values(DEFAULT_IMAGE_SIZES)): ImageSrcset {
  const srcset = sizes.map(
    (width) =>
      `${faker.image.url({
        width,
        height: Math.ceil(heightRatio * width),
      })} ${width}w`
  );
  const fallback = srcset[srcset.length - 1];

  if (!fallback) {
    throw Error("'srcset' has no entries.");
  }

  return {
    srcset: srcset.join(', '),
    alt: faker.lorem.word(),
    fallback,
  };
}

/**
 * Creates a randomized image (sources).
 */
export function createSourcesImage(
  ratios: Ratios = {
    xxs: 1,
    xs: 1,
    sm: 1,
    md: 1,
    lg: 1,
    fallback: 1,
  },
  sizes = DEFAULT_IMAGE_SIZES
): ImageSources {
  const media = Object.entries(BREAKPOINTS_MAX)
    .map(([breakpoint, size]) => {
      const width = sizes[breakpoint as keyof typeof BREAKPOINTS_MAX];
      const ratio = ratios[breakpoint];

      if (!ratio) {
        throw new Error(`No ratio found for breakpoint '${breakpoint}'`);
      }

      if (!width) {
        throw new Error(`No width given for breakpoint '${breakpoint}'`);
      }

      return {
        media: `(max-width: ${size}px)`,
        srcset: faker.image.url({ width, height: Math.round(width / ratio) }),
      };
    })
    .reduce((accumulator: ImageMedia, item) => {
      accumulator[item.media] = item.srcset;

      return accumulator;
    }, {});

  return {
    media,
    alt: faker.lorem.word(),
    fallback: faker.image.url({ width: sizes.fallback, height: Math.round((sizes.fallback || 1) / ratios.fallback) }),
  };
}
