interface ISprykerThumb {
  width: number;
  absolutePath: string;
}

export interface ISprykerImage {
  imageUrl: string;
  href: string;
  thumbs: ISprykerThumb[];
  idProductImage: string;
  externalUrlSmall: string;
}
