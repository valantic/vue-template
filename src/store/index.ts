import { createDirectStore, ModulesImpl } from 'direct-vuex';
import getUrlParameter from '@/helpers/get-url-parameter';
import session from './modules/session';
import notification from './modules/notification';
import breadcrumb from './modules/breadcrumb';

export interface IStore {
  modules: {
    session: ModulesImpl;
    breadcrumb: ModulesImpl;
    notification: ModulesImpl;
  }
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
