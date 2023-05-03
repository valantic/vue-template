import {
  Store,
  defineStore,
  StateTree,
  _GettersTree,
} from 'pinia';

interface MyStoreState extends StateTree { // ODO: update <MyStore>.
  // Add types for the state.
}

interface MyStoreGetters extends _GettersTree<MyStoreState> { // ODO: update <MyStore>.
  // Add types for the store getters.
}

interface MyStoreActions { // ODO: update <MyStore>.
  // Add types for the store actions.
}

export type MyStoreStore = Store<string, MyStoreState, MyStoreGetters, MyStoreActions>;

const storeName = 'MyStore'; // ODO: update <MyStore>.

export default defineStore<typeof storeName, MyStoreState, MyStoreGetters, MyStoreActions>(storeName, {
  state: (): MyStoreState => ({}),
  getters: {},
  actions: {},
});
