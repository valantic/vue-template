export default {
  namespaced: true,
  state: {
    /**
     * @type {Number} Height of main navigation.
     */
    mainNavigationHeight: 0,

    /**
     * @type {Boolean} Indicates if assortment navigation is open.
     */
    assortmentNavigationIsVisible: false,

    /**
     * @type {Boolean} Indicates if the assortment trigger is visible.
     */
    assortmentTriggerIsVisible: true,

    /**
     * @type {Boolean} Indicates whether mobile navigation is open or not.
     */
    mobileNavigationIsVisible: false,
  },
  getters: {
    /**
     * Gets main navigation height.
     *
     * @param {Object} state - Current state object.
     *
     * @returns {Number}
     */
    mainNavigationHeight(state) {
      return state.mainNavigationHeight;
    },

    /**
     * Returns the current state of assortment navigation.
     *
     * @param {Object} state - Current state object.
     *
     * @returns {Boolean}
     */
    assortmentNavigationIsVisible: state => state.assortmentNavigationIsVisible,

    /**
     * Returns the visibility of the assortment trigger on subpages.
     *
     * @param {Object} state - Current state object.
     *
     * @returns {Boolean}
     */
    assortmentTriggerIsVisible: state => state.assortmentTriggerIsVisible,

    /**
     * Returns the current state of mobile navigation.
     *
     * @param {Object} state - Current state object.
     *
     * @returns {Boolean}
     */
    mobileNavigationIsVisible: state => state.mobileNavigationIsVisible,
  },
  mutations: {
    /**
     * Sets main navigation height.
     *
     * @param {Object} state - Current state object.
     * @param {Object} height - Calculated height of navigation.
     */
    setMainNavigationHeight(state, height) {
      state.mainNavigationHeight = height;
    },

    /**
     * Sets the visibility state of the assortment navigation.
     *
     * @param {Object} state - Current state object.
     * @param {Boolean} visibility - Indicates the current click event.
     */
    setAssortmentNavigationState(state, visibility) {
      state.assortmentNavigationIsVisible = visibility;
    },

    /**
     * Controls if the assortment navigation trigger on the subpage is visible.
     * Information is pushed to store from home.twig file.
     *
     * @param {Object} state session/state
     * @param {Boolean} visibility - Indicates the visibility state of the trigger.
     */
    setAssortmentTriggerVisibility(state, visibility) {
      state.assortmentTriggerIsVisible = visibility;
    },

    /**
     * Sets the visibility state of the mobile navigation.
     *
     * @param {Object} state - Current state object.
     * @param {Boolean} visibility - Indicates the current click event.
     */
    setMobileNavigationState(state, visibility) {
      state.mobileNavigationIsVisible = visibility;
    },
  },
  actions: {},
};
