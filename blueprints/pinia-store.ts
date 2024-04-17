import { defineStore } from 'pinia';

type State = {
  // Add types for the State.
};

type InitialData = {
  // Add types for InitialData
};

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
