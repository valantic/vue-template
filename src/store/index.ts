import { createDirectStore, ModulesImpl } from 'direct-vuex';
import getUrlParameter from '@/helpers/get-url-parameter';
import { IMessage } from '@/types/c-notification';
import session from './modules/session';
import notification from './modules/notification';
import breadcrumb from './modules/breadcrumb';

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
const initialDataMessages: IMessage[] = [];

const {
  store,
  rootActionContext,
  moduleActionContext,
  rootGetterContext,
  moduleGetterContext
} = createDirectStore({
  modules: {
    session,
    notification,
    breadcrumb,
  }
});

// Set initial data
Object.keys(data).forEach((action) => {
  const { messages } = data[action] || {};

  // NOTE: We moved away from JSON again, since it was too picky about special characters in the to be parsed string.
  // we use the traditional store dispatch as actions could be nested in multiple level of modules and we cannot easily detect that
  store.original.dispatch(action, data[action]);

  if (Array.isArray(messages)) {
    initialDataMessages.push(...messages);
  }
});

if (initialDataMessages.length) {
  setTimeout(() => { // Make sure all general imports did run before.
    initialDataMessages.forEach((message) => {
      store.commit.notification.pushNotification({ message });
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
