import { createDirectStore, ModulesImpl } from 'direct-vuex';
import getUrlParameter from '@/helpers/get-url-parameter';
import { INotification } from '@/types/c-notification';
import sessionModule from './modules/session';
import notificationModule from './modules/notification';
import breadcrumbModule from './modules/breadcrumb';

interface IModules {
  session: ModulesImpl;
  breadcrumb: ModulesImpl;
  notification: ModulesImpl;
}

export interface IStore {
  modules: IModules;
}

interface IInitialData {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

declare global {
  interface Window { initialData: IInitialData; }
}

const data: IInitialData = window.initialData || {};
let initialDataNotifications: INotification[] = [];

const {
  store,
  rootActionContext,
  moduleActionContext,
  rootGetterContext,
  moduleGetterContext
} = createDirectStore({
  modules: {
    session: sessionModule,
    notification: notificationModule,
    breadcrumb: breadcrumbModule,
  }
});

// Set initial data
Object.keys(data).forEach((action) => {
  const { notifications } = data[action] || {};

  // NOTE: We moved away from JSON again, since it was too picky about special characters in the to be parsed string.
  // we use the traditional store dispatch as actions could be nested in multiple level of modules and we cannot easily detect that
  store.original.dispatch(action, data[action]);

  if (Array.isArray(notifications)) {
    initialDataNotifications = initialDataNotifications.concat(notifications);
  }
});

if (initialDataNotifications.length) {
  setTimeout(() => { // Make sure all general imports did run before.
    initialDataNotifications.forEach((notification) => {
      store.commit.notification.pushNotification(notification);
    });
  });
}

// Set theme according to url in development. e.g. ?theme=01
if (process.env.NODE_ENV !== 'production') {
  const themeId = getUrlParameter('theme');

  if (themeId) {
    store.commit.session.setTheme(themeId);
  }
}

window.initialData = {};

// Export the direct-store instead of the classic Vuex store.
export default store;

// The following exports will be used to enable types in the
// implementation of actions and getters.
export {
  rootActionContext,
  moduleActionContext,
  rootGetterContext,
  moduleGetterContext
};

// The following lines enable types in the injected store '$store'.
export type AppStore = typeof store;
