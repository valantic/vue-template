import { GlobalStore } from '@/setup/globals';

export interface InitialData {
  [GlobalStore.Session]: unknown; // TODO: define Interface.
  [GlobalStore.Breadcrumbs]: unknown; // TODO: define Interface.
  [GlobalStore.Notification]: unknown; // TODO: define Interface.
}

declare global {
  interface Window {
    initialData: InitialData;
  }
}
