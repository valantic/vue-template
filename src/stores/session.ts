import {
  Store,
  defineStore,
  StateTree,
  _GettersTree,
} from 'pinia';
import { GlobalStore } from '@/setup/globals';

type SessionState = StateTree & {

  /**
   * Stores the theme id.
   */
  theme: string;

  /**
   * Stores the Google Maps API key.
   */
  googleMapsApiKey: string | null;
}

type SessionGetters = _GettersTree<SessionState> & {

  /**
   * Gets the current theme id.
   */
  getTheme(state: SessionState): string;
}

type SessionActions ={

  /**
   * Removes a notification.
   */
  setTheme(id: string): void;
}

export type SessionStore = Store<string, SessionState, SessionGetters, SessionActions>;

const storeName = GlobalStore.SESSION;

export default defineStore<typeof storeName, SessionState, SessionGetters, SessionActions>(storeName, {
  state: (): SessionState => {
    const state: SessionState = {
      theme: 'theme-01',
      googleMapsApiKey: null,
    };

    if (import.meta.env.DEV) {
      state.googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string;
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
