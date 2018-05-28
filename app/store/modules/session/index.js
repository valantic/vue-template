import userData from './mock/user';

export default {
  namespaced: true,
  state: {
    /**
     * @type {String}   theme id
     */
    theme: '01', // TODO: set this value dynamic (initial)

    /**
     * @type {Object}   Stores user data
     */
    user: userData,
  },
  getters: {
    /**
     * Gets a user.
     *
     * @param   {Object}  state   Current state
     *
     * @returns  {Object}  product   User data
     */
    user: state => state.user,

    /**
     * Check if a user is logged in.
     *
     * @param   {Object}  state   Current state
     *
     * @returns  {Boolean}  userLoggedIn   True if user is logged in, false otherwise
     */
    userLoggedIn: state => state.user && !!state.user.name,

    /**
     * Gets the current theme id
     *
     * @param {Object}    state   Current state
     *
     * @returns {String}  theme   Current theme id
     */
    getTheme(state) {
      return state.theme;
    },
  },
  mutations: {
    /**
     * User data provided by backend
     *
     * @param {Object} state   State
     * @param {Object} data   Userdata
     */
    data(state, data) {
      state.user = data;
    },

    /**
     * Sets the global theme id
     *
     * @param {Object}  state   session/state
     * @param {String}  id      theme id
     */
    setTheme(state, id) {
      state.theme = id;
    },
  },
  actions: {},
};
