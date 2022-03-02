import { defineStore } from 'pinia';

export interface IBreadcrumbItem {
  name: string;
  url: string;
}

export interface IBreadcrumbState {

  /**
   * Holds the breadcrumb items.
   */
  items: IBreadcrumbItem[];
}

interface IInitialStoreDate {

  /**
   * Holds the initial breadcrumb items.
   */
  items?: IBreadcrumbItem[];
}

const storeName: string = 'breadcrumb';

export default defineStore(storeName, {
  state: (): IBreadcrumbState => {
    const initialData: IInitialStoreDate = window.initialData?.[storeName] || {};

    const state: IBreadcrumbState = {
      items: [],
    };

    if (process.env.NODE_ENV !== 'production') {
      state.items = require('../styleguide/mock-data/initial-data/breadcrumbs').default;
    }

    if (Array.isArray(initialData.items)) {
      state.items = initialData.items;
      delete initialData.items;
    }

    return state;
  },
  getters: {
    /**
     * Gets the list of current breadcrumb items.
     */
    getItems(state): IBreadcrumbItem[] {
      return state.items;
    },
  },
  actions: {
    /**
     * Sets the list of breadcrumbs in the state.
     */
    setItems(data: IBreadcrumbItem[]): void {
      this.items = data || null;
    },
  },
});
