import { defineStore } from 'pinia';

export interface IBreadcrumbItem {
  name: string;
  url: string;
}

export interface IBreadcrumbState {
  items: IBreadcrumbItem[];
}

/**
 * Holds the name of the store.
 */
const storeName: string = 'breadcrumb';

export default defineStore(storeName, {
  state: (): IBreadcrumbState => {
    const initialData = window.initialData?.[storeName] || {};

    const state = {
      items: [],
    };

    if (process.env.NODE_ENV !== 'production') {
      state.items = require('../styleguide/mock-data/initial-data/breadcrumbs').default; // eslint-disable-line global-require
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
    getItems(state: IBreadcrumbState): IBreadcrumbItem[] {
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
