import { defineStore } from 'pinia';
import { Store } from '@/setup/globals';

export type BreadcrumbItem = {
  name: string;
  url: string;
};

export type BreadcrumbState = {
  items: BreadcrumbItem[];
};

const storeName = Store.Breadcrumb;

export default defineStore(storeName, {
  state: () => {
    const state: BreadcrumbState = {
      items: [],
    };

    const initialData: Partial<BreadcrumbState> = window.initialData?.[storeName] || {};

    if (Array.isArray(initialData?.items)) {
      state.items = initialData.items;
    }

    return state;
  },
});
