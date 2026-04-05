import { Store } from '@/setup/globals';
import { BreadcrumbState } from '@/stores/breadcrumb';
import { InitialData as NotificationInitialData } from '@/stores/notification';
import { SessionState } from '@/stores/session';

type WindowInitialData = {
  [Store.Session]: Partial<SessionState>;
  [Store.Breadcrumb]?: Partial<BreadcrumbState>;
  [Store.Notification]?: NotificationInitialData;
};

declare global {
  interface Window {
    initialData: WindowInitialData;
  }
}
