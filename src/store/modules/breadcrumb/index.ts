import { defineModule } from 'direct-vuex';
import { moduleActionContext } from '@/store';
import { ActionContext } from 'vuex';

export interface IBreadcrumbItem {
  name: string;
  url: string;
}

export interface IModBreadcrumbState {
  items: IBreadcrumbItem[];
}

const breadcrumbModule = defineModule({
  namespaced: true,
  state: (): IModBreadcrumbState => ({
    /**
     * Stores breadcrumb items.
     */
    items: process.env.NODE_ENV !== 'production'
      ? require('../../../styleguide/mock-data/initial-data/breadcrumbs').default // eslint-disable-line global-require
      : null,
  }),

  getters: {
    /**
     * Gets the list of current breadcrumb items.
     */
    getItems(state: IModBreadcrumbState): IBreadcrumbItem[] {
      return state.items;
    }
  },

  mutations: {
    /**
     * Sets the list of breadcrumbs in the state.
     */
    setItems(state: IModBreadcrumbState, data: IBreadcrumbItem[]) {
      state.items = data || null;
    }
  },

  actions: {
    /**
     * Handles the initial data for breadcrumbs.
     */
    data(context, payload: IBreadcrumbItem[]) {
      if (!Array.isArray(payload)) {
        throw Error("The payload data given to 'breadcrumb/data' is not of type Array.");
      }

      // eslint-disable-next-line no-use-before-define
      const { commit } = breadcrumbActionContext(context);

      commit.setItems(payload);
    }
  },
});

export default breadcrumbModule;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const breadcrumbActionContext = (context: any) => moduleActionContext(context, breadcrumbModule);
