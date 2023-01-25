export interface IInitialData {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

declare global {
  interface Window { initialData: IInitialData; }
}
