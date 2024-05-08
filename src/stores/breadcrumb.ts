import { defineStore } from 'pinia';
import { Store } from '@/setup/globals';

export type BreadcrumbItem = {
  name: string;
  url: string;
};

type BreadcrumbState = {
  items: BreadcrumbItem[];
};

type InitialData = {
  items?: BreadcrumbItem[];
};

const storeName = Store.Breadcrumb;

export default defineStore(storeName, {
  state: () => {
    const state: BreadcrumbState = {
      items: [],
    };

    const initialData: InitialData = window.initialData?.[storeName] || {};

    if (Array.isArray(initialData?.items)) {
      state.items = initialData.items;
    }

    return state;
  },
});
