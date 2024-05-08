import { defineStore } from 'pinia';
import { Store } from '@/setup/globals';

type SessionState = {
  /**
   * Stores the theme id.
   */
  theme: string;

  /**
   * Stores the Google Maps API key.
   */
  googleMapsApiKey: string | null;
};

const storeName = Store.Session;

export default defineStore(storeName, {
  state: () => {
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
    setTheme(id: string): void {
      this.theme = id;
    },
  },
});
