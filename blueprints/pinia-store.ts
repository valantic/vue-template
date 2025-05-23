import { defineStore } from 'pinia';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type State = {
  // Add types for the State.
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
