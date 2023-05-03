import { BaseStore } from '@/setup/globals';

export interface InitialData {
  [BaseStore.SESSION]: unknown; // ODO: define Interface.
  [BaseStore.BREADCRUMBS]: unknown; // ODO: define Interface.
  [BaseStore.NOTIFICATION]: unknown; // ODO: define Interface.
}

declare global {
  interface Window { initialData: InitialData; }
}
