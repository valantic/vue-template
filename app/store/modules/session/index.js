import { i18n } from '@/setup/i18n';
import api from '../../utils/api';

export default {
  namespaced: true,
  state: {
    /**
     * @type {String} Stores the theme id.
     */
    theme: '01',

    /**
     * @type {Object} Stores user data.
     */
    user: process.env.NODE_ENV !== 'production'
      ? require('./mock/user').default // eslint-disable-line global-require
      : null,

    /**
     * @type {Number} Stores the current header height.
     */
    headerHeight: 0,

    /**
     * @type {Number} Stores the current content height.
     */
    contentHeight: 0,

    /**
     * @type {Number} Saves the height of the login form in the iframe.
     */
    loginFormHeight: 0,

    /**
     * @type {Boolean} State of the login request.
     */
    loginRequestIsRunning: false,

    /**
     * @type {Boolean} Stores the state of the login window (open/close).
     */
    loginWindowIsOpen: false,

    /**
     * @type {Number} Saves the width of the current viewport.
     */
    currentViewportWidth: 0,

    /**
     * @type {Number} Saves the scroll position of the window.
     */
    scrollPosition: 0,

    /**
     * @type {Array} - Holds a list of all open arrays.
     */
    openModals: [],

    /**
     * @type {Boolean} Flag to determine if a password reset is currently in progress.
     */
    hasPasswordRestoreInProgress: false,
  },
  getters: {
    /**
     * Gets a user.
     *
     * @param {Object} state - Current state
     *
     * @returns {Object}
     */
    user: state => state.user,

    /**
     * Returns the name of the currently logged in user.
     *
     * @param {Object} state - Current state object.
     *
     * @returns {String|null} Name of the current user
     */
    userName: state => (state.user && state.user.customerUsername) || null,

    /**
     * Check if a user is logged in.
     *
     * @param {Object} state - Current state object.
     *
     * @returns {Boolean} True if user is logged in, false otherwise
     */
    isLoggedInUser: state => !!(state.user && state.user.customerUsername),

    /**
     * Gets the current theme id.
     *
     * @param {Object} state - Current state object.
     *
     * @returns {String}
     */
    theme(state) {
      return state.theme;
    },

    /**
     * Gets the current header height.
     *
     * @param {Object} state - Current state object.
     *
     * @returns {Number}
     */
    headerHeight: state => state.headerHeight,

    /**
     * Gets the current content height.
     *
     * @param {Object} state - Current state object.
     *
     * @returns {Number}
     */
    contentHeight: state => state.contentHeight,

    /**
     * Returns the height of the login form in the iframe.
     *
     * @param {Object} state - The Current state.
     *
     * @returns {Number}
     */
    loginFormHeight: state => state.loginFormHeight,

    /**
     * Returns the state of the login process (api call).
     *
     * @param {Object} state - Current state
     *
     * @returns {Boolean}
     */
    loginProcess: state => state.loginRequestIsRunning,

    /**
     * Returns the state of the login window (open/close).
     *
     * @param {Object} state - Current state
     *
     * @returns {Boolean}
     */
    loginWindowIsOpen: state => state.loginWindowIsOpen,

    /**
     * Returns the current viewport width.
     *
     * @param {Object} state - Current state
     *
     * @returns {Number}
     */
    viewportWidth: state => state.currentViewportWidth,

    /**
     * Returns the current scroll position.
     *
     * @param {Object} state - Current state
     *
     * @returns {Number}
     */
    scrollPosition: state => state.scrollPosition,

    /**
     * Shows if any modal is open currently.
     *
     * @param {Object} state - Current state
     *
     * @returns {Boolean}
     */
    modalIsOpen: state => Array.isArray(state.openModals) && state.openModals.length > 0,

    /**
     * Returns a flag if currently a password reset request is in progress.
     *
     * @param {Object} state - The current store module state.
     *
     * @returns {Boolean}
     */
    hasPasswordRestoreInProgress: state => state.hasPasswordRestoreInProgress,
  },
  mutations: {
    /**
     * User data provided by backend.
     *
     * @param {Object} state - Current state object.
     * @param {Object} data - Userdata which should be set.
     */
    data(state, data) {
      state.user = data;
    },

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
     * Sets the current header height.
     *
     * @param {Object} state - Current state object.
     * @param {Number} height - Height of the header.
     */
    setHeaderHeight(state, height) {
      state.headerHeight = height;
    },

    /**
     * Sets the current content height.
     *
     * @param {Object} state - Current state object.
     * @param {Number} height - Height of the content.
     */
    setContentHeight(state, height) {
      state.contentHeight = height;
    },

    /**
     * Sets the height of the login form in the iframe.
     *
     * @param {Object} state - session/setLoginFormHeight
     * @param {Number} height - The calculated height of the login form.
     */
    setLoginFormHeight(state, height) {
      state.loginFormHeight = height;
    },

    /**
     * Sets the state of the login request is running.
     *
     * @param {Object} state - Current state object.
     * @param {Boolean} isRunning - Defines the status if the request is running.
     */
    loginIsRunning(state, isRunning) {
      state.loginRequestIsRunning = isRunning;
    },

    /**
     * Sets the state of the login window (open/close).
     *
     * @param {Object} state - Current state object.
     * @param {Boolean} isOpen - Defines the login window state.
     */
    setLoginWindowIsOpen(state, isOpen) {
      state.loginWindowIsOpen = isOpen;
    },

    /**
     * Sets the current viewport width.
     *
     * @param {Object} state - Current state object.
     */
    setCurrentViewportWidth(state) {
      state.currentViewportWidth = window.innerWidth;
    },

    /**
     * Sets the current scroll position of the window.
     *
     * @param {Object} state - Current state object.
     * @param {Number} scrollPosition - The current scrolling position.
     */
    setScrollPosition(state, scrollPosition) {
      state.scrollPosition = scrollPosition;
    },

    /**
     * Sets the initial user data.
     *
     * @param {Object} state - Current state object.
     * @param {Object} user - The user object delivered from backend.
     */
    dataUser(state, user) {
      state.user = user;
    },

    /**
     * Adds a modal instance to the list of open modals.
     *
     * @param {Object} state - Current state object.
     * @param {Object} modal - A modal (c-modal) instance.
     */
    addModal(state, modal) {
      state.openModals.push(modal);
    },

    /**
     * Removes a modal instance from the list of open modals.
     *
     * @param {Object} state - Current state object.
     * @param {Object} modal - A modal (c-modal) instance.
     */
    removeModal(state, modal) {
      state.openModals = state.openModals.filter(item => item.uuid !== modal.uuid);
    },

    /**
     * Sets the given 'state' for the password reset progress flag.
     *
     * @param {Object} state - Current store module state.
     * @param {Boolean} inProgress - The new state for the reset in progress flag.
     */
    setPasswordResetProgress(state, inProgress) {
      state.hasPasswordRestoreInProgress = inProgress;
    },
  },
  actions: {
    /**
     * This action calls the api with the login credentials and handles the response.
     *
     * @param {Object} context - An object of vuex context methods.
     * @param {Object} context.commit - The commit context method.
     * @param {Object} payload - The payload data.
     * @param {String} payload.userId - The user identification can be the e-mail or username.
     * @param {String} payload.password - The user password as text.
     *
     * @returns {Promise} The response of the api call.
     */
    login({ commit }, { userId, password }) {
      const url = i18n.t('urls.login');
      const data = {
        customerIdentifier: userId,
        password,
      };

      commit('loginIsRunning', true);

      return api.post(url, data)
        .then((response) => {
          // TODO: refactor success validation. isSuccess should not be needed. Switch to error codes.
          if (response.data && response.data.data && response.data.data.isSuccess) {
            window.location.reload();

            return response;
          }

          return Promise.reject(new Error('Login failed.'));
        })
        .catch(() => {
          commit('loginIsRunning', false);
      });
    },

    /**
     * Sends a password restore request for the given context.customerIdentifier.
     *
     * @param {Object} context - The current Vuex module context.
     * @param {Function} context.commit - The commit method of the Vuex module.
     * @param {Object} payload - The payload data which is given to the action.
     * @param {String} payload.customerIdentifier - An email or username for which a password restore should be requested.
     *
     * @returns {Promise<any> | Promise<T>}
     */
    restorePassword({ commit }, payload) {
      const url = i18n.t('urls.restorePassword');

      commit('setPasswordResetProgress', true);

      return api.post(url, payload)
        .finally(() => {
          commit('setPasswordResetProgress', false);
      });
    },
  },
};
