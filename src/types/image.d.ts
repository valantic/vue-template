export interface IImageMedia {
  [key: string]: string;
}

export interface IImage {
  fallback: string;
  alt: string;
}

export interface IImageSources extends IImage {
  media: IImageMedia;
}

export interface IImageSrcset extends IImage {
  srcset: string;
}
