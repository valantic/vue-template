import {
  Store,
  defineStore,
  StateTree,
  _GettersTree,
} from 'pinia';
import { BaseStore } from '@/setup/globals';

export interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbState extends StateTree {

  /**
   * Holds the breadcrumb items.
   */
  items: BreadcrumbItem[];
}

interface BreadcrumbGetters extends _GettersTree<BreadcrumbState> {

  /**
   * Gets the list of current breadcrumb items.
   */
  getItems(state: BreadcrumbState): BreadcrumbItem[];
}

interface BreadcrumbActions {

  /**
   * Sets the list of breadcrumbs in the state.
   */
  setItems(data: BreadcrumbItem[]): void;
}

export type BreadcrumbStore = Store<string, BreadcrumbState, BreadcrumbGetters, BreadcrumbActions>;

interface InitialStoreDate {

  /**
   * Holds the initial breadcrumb items.
   */
  items?: BreadcrumbItem[];
}

const storeName = BaseStore.BREADCRUMBS;

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
