import {
  Store,
  defineStore,
  StateTree,
  _GettersTree,
} from 'pinia';

interface ISessionState extends StateTree {

  /**
   * Stores the theme id.
   */
  theme: string;

  /**
   * Stores the Google Maps API key.
   */
  googleMapsApiKey: string | null;
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

const storeName = 'session';

export default defineStore<typeof storeName, ISessionState, ISessionGetters, ISessionActions>(storeName, {
  state: (): ISessionState => {
    const state: ISessionState = {
      theme: '01',
      googleMapsApiKey: null,
    };

    if (process.env.NODE_ENV !== 'production') {
      state.googleMapsApiKey = process.env.GOOGLE_MAPS_API_KEY as string;
    }

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
