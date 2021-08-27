import { Module } from 'vuex';

interface IBreadcrumbItem {
  name: string;
  url: string;
}

interface IBreadcrumbState {
  items: IBreadcrumbItem[];
}

const breadcrumbModule: Module<any, any> = {
  state: {
    /**
     * @type {Array} Stores breadcrumb items.
     */
    items: process.env.NODE_ENV !== 'production'
      ? require('../../../styleguide/mock-data/initial-data/breadcrumbs').default // eslint-disable-line global-require
      : null,
  },
  getters: {
    /**
     * Gets the list of current breadcrumb items.
     *
     * @param {Object} state - The current module state.
     *
     * @returns {Array}
     */
    getItems: (state: IBreadcrumbState) => state.items,
  },
  mutations: {
    /**
     * Sets the list of breadcrumbs in the state.
     *
     * @param {Object} state - The current module state.
     * @param {Array} data - List of breadcrumb items.
     */
    setItems(state: IBreadcrumbState, data: IBreadcrumbItem[]) {
      state.items = data || null;
    }
  },
  actions: {
    /**
     * Handles the initial data for breadcrumbs.
     *
     * @param {Object} context - The current module context.
     * @param {Function} context.commit - Triggers a mutation on the current module.
     * @param {Array} payload - List of breadcrumb items.
     */
    data({ commit }, payload: IBreadcrumbItem[]) {
      if (!Array.isArray(payload)) {
        throw Error("The payload data given to 'breadcrumb/data' is not of type Array.");
      }

      commit('setItems', payload);
    }
  },
};

export default breadcrumbModule;
