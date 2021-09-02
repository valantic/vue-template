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

interface IAction {
  data: object;
  messages: {
    INFO: [];
    ERROR: [];
    SUCCESS: [];
  };
  assetsPath: string;
}

interface IInitialData {
  [key: string]: IAction;
}

declare global {
  interface Window { initialData: IInitialData; }
}

const data: IInitialData = window.initialData || {};
let initialDataMessages: IMessage[] = [];

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

  const storeModule = action.split('/')[0] as keyof IModules;
  const moduleAction = action.split('/')[1];

  // NOTE: We moved away from JSON again, since it was too picky about special characters in the to be parsed string.
  // @ts-ignore
  store.dispatch[storeModule][moduleAction](data[action]);

  if (Array.isArray(messages)) {
    initialDataMessages = initialDataMessages.concat(messages);
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
