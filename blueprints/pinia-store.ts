import {
  Store,
  defineStore,
  StateTree,
  _GettersTree,
} from 'pinia';

interface IMyStoreState extends StateTree { // TODO: update <MyStore>.
  // Add types for the state.
}

interface IMyStoreGetters extends _GettersTree<IMyStoreState> { // TODO: update <MyStore>.
  // Add types for the store getters.
}

interface IMyStoreActions { // TODO: update <MyStore>.
  // Add types for the store actions.
}

export type TMyStoreStore = Store<string, IMyStoreState, IMyStoreGetters, IMyStoreActions>;

const storeName = 'MyStore'; // TODO: update <MyStore>.

export default defineStore<typeof storeName, IMyStoreState, IMyStoreGetters, IMyStoreActions>(storeName, {
  state: (): IMyStoreState => ({}),
  getters: {},
  actions: {},
});
