import { defineStore } from 'pinia';

export interface IStoreState {} // TODO: update <Store>.

const storeName: string = 'Store'; // TODO: update <Store>.

export default defineStore(storeName, {
  state: (): IStoreState => ({}),
  getters: {},
  actions: {},
});
