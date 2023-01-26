import 'vite/client'; // Was required to make TS aware of Vite's 'import.meta' property.

export interface IInitialData {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

declare global {
  interface Window { initialData: IInitialData; }
}
