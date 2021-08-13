interface ISourceSet {
  [key: string]: string
}

export interface IImage {
  id: string | number;
  fallback: string;
  srcset: ISourceSet;
  alt: string;
  href?: string;
}
