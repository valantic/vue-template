import userData from './mock/user';

export default {
  namespaced: true,
  state: {
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
  },
  actions: {},
};
