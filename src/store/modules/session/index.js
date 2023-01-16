export default {
  namespaced: true,
  state: {
    /**
     * @type {String} Stores the theme id.
     */
    theme: '01',

    /**
     * @type {String} Holds the Google Maps API key for the current instance.
     */
    googleMapsApiKey: process.env.NODE_ENV !== 'production'
      ? 'AIzaSyCbY8BMjb1c8y_aPADAfq9UHgPqEo7gwS0'
      : null,

  },
  getters: {
    /**
     * Gets the current theme id.
     *
     * @param {Object} state - The current module state.
     *
     * @returns {String}
     */
    getTheme(state) {
      return state.theme;
    },

    /**
     * Returns the Google Maps API key for the current instance.
     *
     * @param {Object} state - The current module state.
     *
     * @returns {String}
     */
    getGoogleMapsApiKey: state => state.googleMapsApiKey,

  },
  mutations: {
    /**
     * Sets the global theme id.
     *
     * @param {Object} state - Current state object.
     * @param {String} id - Theme id which should be set.
     */
    setTheme(state, id) {
      state.theme = id;
    },

    /**
     * Updates the Google Maps API key.
     *
     * @param {Object} state - The current module state.
     * @param {String} key - The Goole Maps API Key for the current instance.
     */
    setGoogleMapsApiKey(state, key) {
      state.googleMapsApiKey = key;
    },

  },
  // actions: {},
};
