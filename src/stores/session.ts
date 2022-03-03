import {
  Store,
  defineStore,
  StateTree,
  _GettersTree,
} from 'pinia';

export interface ISessionState extends StateTree {

  /**
   * Stores the theme id.
   */
  theme: string;
}

interface ISessionGetters extends _GettersTree<ISessionState> {

  /**
   * Gets the current theme id.
   */
  getTheme: (state: ISessionState) => string,
}

interface ISessionActions {

  /**
   * Removes a notification.
   */
  setTheme: (id: string) => void;
}

export type TSessionStore = Store<string, ISessionState, ISessionGetters, ISessionActions>;

const storeName: string = 'session';

export default defineStore<typeof storeName, ISessionState, ISessionGetters, ISessionActions>(storeName, {
  state: (): ISessionState => {
    const state: ISessionState = {
      theme: '01',
    };

    return state;
  },
  getters: {
    getTheme(state): string {
      return state.theme;
    },
  },
  actions: {
    setTheme(id) {
      this.theme = id;
    },
  },
});
