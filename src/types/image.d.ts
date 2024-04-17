export type ImageMedia = {
  [key: string]: string;
};

export type Image = {
  fallback: string;
  alt: string;
};

export type ImageSources = Image & {
  media: ImageMedia;
};

export type ImageSrcset = Image & {
  srcset: string;
};
