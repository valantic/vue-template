import {
  Store,
  defineStore,
  StateTree,
  _GettersTree,
} from 'pinia';

export interface IBreadcrumbItem {
  name: string;
  url: string;
}

interface IBreadcrumbState extends StateTree {

  /**
   * Holds the breadcrumb items.
   */
  items: IBreadcrumbItem[];
}

interface IBreadcrumbGetters extends _GettersTree<IBreadcrumbState> {

  /**
   * Gets the list of current breadcrumb items.
   */
  getItems: (state: IBreadcrumbState) => IBreadcrumbItem[];
}

interface IBreadcrumbActions {

  /**
   * Sets the list of breadcrumbs in the state.
   */
  setItems: (data: IBreadcrumbItem[]) => void;
}

export type TBreadcrumbStore = Store<string, IBreadcrumbState, IBreadcrumbGetters, IBreadcrumbActions>;

interface IInitialStoreDate {

  /**
   * Holds the initial breadcrumb items.
   */
  items?: IBreadcrumbItem[];
}

const storeName = 'breadcrumb';

export default defineStore<typeof storeName, IBreadcrumbState, IBreadcrumbGetters, IBreadcrumbActions>(storeName, {
  state: (): IBreadcrumbState => {
    const initialData: IInitialStoreDate = window.initialData?.[storeName] || {};

    const state: IBreadcrumbState = {
      items: [],
    };

    if (import.meta.env.DEV) {
      const breadcrumbsModule = import.meta
        .glob('@/styleguide/mock-data/initial-data/breadcrumbs', { eager: true });

      state.items = breadcrumbsModule['@/styleguide/mock-data/initial-data/breadcrumbs'] as IBreadcrumbItem[];
    }

    if (Array.isArray(initialData.items)) {
      state.items = initialData.items;
      delete initialData.items;
    }

    return state;
  },
  getters: {
    getItems(state) {
      return state.items;
    },
  },
  actions: {
    setItems(data): void {
      this.items = data || null;
    },
  },
});
