import { Store } from '@/setup/globals';

import { InitialData as SessionInitialData } from '@/stores/session';
import { InitialData as BreadcrumbInitialData } from '@/stores/breadcrumb';
import { InitialData as NotificationInitialData } from '@/stores/notification';

export interface WindowInitialData {
  [Store.Session]: SessionInitialData;
  [Store.Breadcrumb]?: BreadcrumbInitialData;
  [Store.Notification]?: NotificationInitialData;
}

declare global {
  interface Window {
    initialData: WindowInitialData;
  }
}
