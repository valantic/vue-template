interface ISourceSet {
  [key: string]: string
}

export interface IEImage {
  id: number;
  fallback: string;
  srcset: ISourceSet;
  alt: string;
  href: string;
}
