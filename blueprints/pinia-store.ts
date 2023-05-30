import { defineStore } from 'pinia';

interface State {
  // Add types for the State.
}

interface InitialData {
  // Add types for InitialData
}

const storeName = 'myStore'; // TODO: update store name.

export default defineStore(storeName, {
  state: (): State => {
    const initialData = window.initialData?.[storeName];

    if (!initialData) {
      throw new Error(`Initial data for ${storeName} store missing`);
    }

    return {};
  },
  getters: {},
  actions: {},
});
