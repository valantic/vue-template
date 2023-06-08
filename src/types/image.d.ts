export interface ImageMedia {
  [key: string]: string;
}

export interface Image {
  fallback: string;
  alt: string;
}

export interface ImageSources extends Image {
  media: ImageMedia;
}

export interface ImageSrcset extends Image {
  srcset: string;
}
