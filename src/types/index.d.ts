import { STORE } from '@/setup/globals';

export interface IInitialData {
  [STORE.SESSION]: unknown; // TODO: define Interface.
  [STORE.BREADCRUMBS]: unknown; // TODO: define Interface.
  [STORE.NOTIFICATION]: unknown; // TODO: define Interface.
}

declare global {
  interface Window { initialData: IInitialData; }
}
