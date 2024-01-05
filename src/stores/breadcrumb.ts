import {
  Store,
  defineStore,
  StateTree,
  _GettersTree,
} from 'pinia';
import { GlobalStore } from '@/setup/globals';

export type BreadcrumbItem = {
  name: string;
  url: string;
}

type BreadcrumbState = StateTree & {

  /**
   * Holds the breadcrumb items.
   */
  items: BreadcrumbItem[];
}

type BreadcrumbGetters =_GettersTree<BreadcrumbState> & {

  /**
   * Gets the list of current breadcrumb items.
   */
  getItems(state: BreadcrumbState): BreadcrumbItem[];
}

type BreadcrumbActions = {

  /**
   * Sets the list of breadcrumbs in the state.
   */
  setItems(data: BreadcrumbItem[]): void;
}

export type BreadcrumbStore = Store<string, BreadcrumbState, BreadcrumbGetters, BreadcrumbActions>;

type InitialStoreDate = {

  /**
   * Holds the initial breadcrumb items.
   */
  items?: BreadcrumbItem[];
}

const storeName = GlobalStore.BREADCRUMBS;

export default defineStore<typeof storeName, BreadcrumbState, BreadcrumbGetters, BreadcrumbActions>(storeName, {
  state: (): BreadcrumbState => {
    const initialData: InitialStoreDate = window.initialData?.[storeName] || {};

    const state: BreadcrumbState = {
      items: [],
    };

    if (import.meta.env.DEV) {
      const breadcrumbsModule = import.meta
        .glob('@/styleguide/mock-data/initial-data/breadcrumbs', { eager: true });

      state.items = breadcrumbsModule['@/styleguide/mock-data/initial-data/breadcrumbs'] as BreadcrumbItem[];
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
