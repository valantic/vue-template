import { GlobalStore } from '@/setup/globals';

export interface IInitialData {
  [GlobalStore.SESSION]: unknown; // TODO: define Interface.
  [GlobalStore.BREADCRUMBS]: unknown; // TODO: define Interface.
  [GlobalStore.NOTIFICATION]: unknown; // TODO: define Interface.
}

declare global {
  interface Window { initialData: IInitialData; }
}
