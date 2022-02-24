import { defineStore } from 'pinia';

export interface IBreadcrumbItem {
  name: string;
  url: string;
}

export interface IBreadcrumbState {
  items: IBreadcrumbItem[];
}

const storeName = 'breadcrumb';

export const useBreadcrumbStore = defineStore(storeName, {
  state: (): IBreadcrumbState => {
    const initialData = window.initialData?.breadcrumb || {};

    const state = {
      items: [],
    };

    if (process.env.NODE_ENV !== 'production') {
      state.items = require('../styleguide/mock-data/initial-data/breadcrumbs').default; // eslint-disable-line global-require
    }

    if (Array.isArray(initialData.items)) {
      state.items = initialData.items;
    }

    return state;
  },
  getters: {
    /**
     * Gets the list of current breadcrumb items.
     */
    getItems(): IBreadcrumbItem[] {
      return this.items;
    },
  },
  actions: {
    /**
     * Sets the list of breadcrumbs in the state.
     */
    setItems(data: IBreadcrumbItem[]) {
      this.items = data || null;
    },
  },
});
