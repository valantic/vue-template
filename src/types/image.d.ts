interface IImageMedia {
  [key: string]: string;
}

export interface IImage {
  id?: string | number;
  fallback: string;
  srcset?: string;
  media?: IImageMedia;
  alt: string;
  href?: string;
}
