/* eslint-disable max-params */
import { SESSION_KEY_SEARCH_TERM, VUEX_COMMIT_ROOT_CONFIG } from '@/setup/globals';
import api from '@/store/utils/api';
import { i18n } from '@/setup/i18n';

export default {
  namespaced: true,
  state: {
    /**
     * @type {String} Stores the current (or last) search term.
     */
    searchTerm: '',

    /**
     * @type {Object} Stores the suggestion objects (products / categories)
     */
    searchSuggestions: null,

    /**
     * @type {Object} Stores the search data.
     */
    searchData: process.env.NODE_ENV !== 'production'
      ? require('./mock/searchData').default // eslint-disable-line global-require
      : null,

    /**
     * @type {Object} Stores the category suggestions.
     */
    categories: process.env.NODE_ENV !== 'production'
      ? require('@/styleguide/mock-data/cSearchCategories').default // eslint-disable-line global-require
      : [],
  },
  getters: {
    /**
     * Gets the stored searchTerm as a String.
     *
     * @param {Object} state - The current state object.
     *
     * @returns {String}
     */
    searchTerm: state => state.searchTerm,

    /**
     * Gets the stores search suggestions.
     *
     * @param {Object} state - The current state object.
     *
     * @returns {Object}
     */
    searchSuggestions(state) {
      const suggestions = state.searchSuggestions;

      if (!suggestions) {
        return null;
      }

      return {
        products: suggestions.products && suggestions.products.length ? suggestions.products.slice(0, 3) : null,
        categories: suggestions.categories && suggestions.categories.length ? suggestions.categories.slice(0, 3) : null,
      };
    },

    /**
     * Returns a flag if the suggestions are available.
     *
     * @param {Object} state - The current state object.
     *
     * @returns {Boolean}
     */
    hasSuggestions(state) {
      if (!state.searchSuggestions) {
        return false;
      }

      const { products, categories } = state.searchSuggestions;

      return !!products.length || !!categories.length;
    },

    /**
     * Returns the search data object.
     *
     * @param {Object} state - The current state object.
     *
     * @returns {Object}
     */
    searchData: state => state.searchData,

    /**
     * Returns the stored category suggestions.
     *
     * @param {Object} state - The current state object.
     *
     * @returns {Array}
     */
    categorySuggestions(state) {
      return state.categories ? state.categories.categories : [];
    },

    /**
     * Returns the products which are stored in the catalog module.
     *
     * @param {Object} state - The current state object.
     * @param {Object} getters - The current getters object.
     * @param {Object} rootState - The current rootState object.
     * @param {Object} rootGetters - The root getters object.
     *
     * @returns {Array}
     */
    products(state, getters, rootState, rootGetters) {
      return rootGetters['catalog/products'];
    },

    /**
     * Returns the pagination which are stored in the catalog module.
     *
     * @param {Object} state - The current state object.
     * @param {Object} getters - The current getters object.
     * @param {Object} rootState - The current rootState object.
     * @param {Object} rootGetters - The root getters object.
     *
     * @returns {Array}
     */
    pagination(state, getters, rootState, rootGetters) {
      return rootGetters['catalog/pagination'];
    },

    /**
     * Returns the sortOptions which are stored in the catalog module.
     *
     * @param {Object} state - The current state object.
     * @param {Object} getters - The current getters object.
     * @param {Object} rootState - The current rootState object.
     * @param {Object} rootGetters - The root getters object.
     *
     * @returns {Array}
     */
    sortOptions(state, getters, rootState, rootGetters) {
      return rootGetters['catalog/sortOptions'];
    },

    /**
     * Returns the sort which is stored in the catalog module.
     *
     * @param {Object} state - The current state object.
     * @param {Object} getters - The current getters object.
     * @param {Object} rootState - The current rootState object.
     * @param {Object} rootGetters - The root getters object.
     *
     * @returns {String}
     */
    sort(state, getters, rootState, rootGetters) {
      return rootGetters['catalog/sort'];
    },

    /**
     * Returns the facets which is stored in the catalog module.
     *
     * @param {Object} state - The current state object.
     * @param {Object} getters - The current getters object.
     * @param {Object} rootState - The current rootState object.
     * @param {Object} rootGetters - The root getters object.
     *
     * @returns {String}
     */
    facets(state, getters, rootState, rootGetters) {
      return rootGetters['catalog/facets'];
    },

    /**
     * Returns the isLoading which is stored in the catalog module.
     *
     * @param {Object} state - The current state object.
     * @param {Object} getters - The current getters object.
     * @param {Object} rootState - The current rootState object.
     * @param {Object} rootGetters - The root getters object.
     *
     * @returns {String}
     */
    isLoading(state, getters, rootState, rootGetters) {
      return rootGetters['catalog/isLoading'];
    },

    /**
     * Returns the categories in the format to display in a single select.
     *
     * @param {Object} state - The current state object.
     *
     * @returns {Array}
     */
    categoryFilterValues(state) {
      if (state && state.categories && state.categories.categories && state.categories.categories.length) {
        return state.categories.categories.map(item => ({
          label: item.parentName ? `${item.parentName}/${item.title}` : item.title,
          value: item.id,
        }));
      }

      return [];
    }
  },
  mutations: {
    /**
     * Saves the delivered term in the searchTerm state.
     *
     * @param {Object} state - The current state object.
     * @param {String} term - The search term you want to save in the state property.
     */
    setSearchTerm(state, term) {
      state.searchTerm = term;
    },

    /**
     * Saves the delivered search suggestions in the state.
     *
     * @param {Object} state - The current state object.
     * @param {Object} suggestions - The suggestions object.
     */
    setSearchSuggestions(state, suggestions) {
      state.searchSuggestions = suggestions;
    },

    /**
     * Resets the search suggestions.
     *
     * @param {Object} state - The current state object.
     */
    resetSearchSuggestions(state) {
      state.searchSuggestions = null;
    },

    /**
     * Sets the search data.
     *
     * @param {Object} state - The current state object.
     * @param {Object} data - The search data from backend.
     */
    dataSearchData(state, data) {
      state.searchData = data;
    },

    /**
     * Sets the suggested categories in the state.
     *
     * @param {Object} state - The current state object.
     * @param {Object} data - The search data from backend.
     */
    dataCategorySuggestions(state, data) {
      state.categories = data;
    },
  },
  actions: {
    /**
     * Saves the current searchTerm from the store state in the browser session storage.
     *
     * @param {Object} state - The current state object.
     */
    saveTermToLocalStorage({ state }) {
      sessionStorage.setItem(SESSION_KEY_SEARCH_TERM, state.searchTerm);
    },

    /**
     * Gets the search term which is saved in the browsers session storage and sets it in the
     * Vuex store.
     *
     * @param {Object} commit - The current commit object.
     */
    getSearchTermFromLocalStorage({ commit }) {
      commit('setSearchTerm', sessionStorage.getItem(SESSION_KEY_SEARCH_TERM));
    },

    /**
     * Calls the search suggestion endpoint to fetch the suggested products and categories.
     *
     * @param {Object} context - The Vuex module context.
     * @param {Object} context.state - The current Vuex module state.
     * @param {Object} context.commit - The mutation commit method of Vuex.
     * @param {Object} context.dispatch - The action dispatch method of Vuex.
     *
     * @returns {Object|null}
     */
    getSearchSuggestions({ state, commit, dispatch }) {
      const { searchTerm } = state;

      if (searchTerm.length < 2) {
        return new Promise((resolve) => { resolve(null); });
      }

      return api.get(`${i18n.t('search.getSuggestionUrl')}${searchTerm}`)
        .then((response) => {
          if (response.data && response.data.data) {
            commit('setSearchSuggestions', response.data.data);

            return response;
          }

          dispatch('notification/showUnknownError', null, VUEX_COMMIT_ROOT_CONFIG);

          return Promise.reject(new Error('apiFailure'));
      });
    },

    /**
     * Calls the setSort function of the catalog module.
     *
     * @param {Object} dispatch - The current dispatch object.
     * @param {String} sort - The sorting value.
     */
    setSort({ dispatch }, sort) {
      dispatch('catalog/setSort', sort, { root: true });
    },

    /**
     * Calls the removeAllProductRelations function of the catalog module.
     *
     * @param {Object} commit - The current commit object.
     */
    removeAllProductRelations({ commit }) {
      commit('catalog/removeAllProductRelations', { root: true });
    },

    /**
     * Calls the removeProducts function of the catalog module.
     *
     * @param {Object} commit - The current commit object.
     */
    removeProducts({ dispatch }) {
      dispatch('catalog/removeProducts', { root: true });
    },

    /**
     * Fetches additional products from spryker.
     *
     * @param {Object} context - Context object.
     * @param {Object} context.state - The current Vuex module state.
     * @param {Function} context.commit - The mutation commit method of Vuex.
     * @param {Function} context.dispatch - The action dispatch method of Vuex.
     * @param {Object} payload - Request payload object.
     * @param {String|null} payload.sort - Sorting for products.
     * @param {Number|null} payload.page - Current page for request.
     * @param {Number|null} payload.itemsPerPage - Items per page for request.
     * @param {Object|null} payload.facets - Selected facets for request.
     * @param {Boolean} payload.shouldExtend - Defines if response should extend current products list.
     *
     * @returns {Promise|null}
     */
    fetchProducts({ state, commit, dispatch }, payload) {
      if (!payload) {
        return Promise.reject(new Error('No payload defined'));
      }

      commit('catalog/setIsLoading', true, { root: true });

      return api.post('/search', {
        sort: payload.sort,
        query: state.searchTerm,
        page: payload.page,
        ipp: payload.itemsPerPage,
        filters: payload.filters,
      })
        .then((response) => {
          if (response.data && response.data.data) {
            if (payload.shouldExtend) {
              commit('catalog/setCurrentPage', response.data.data.pagination.currentPage, VUEX_COMMIT_ROOT_CONFIG);
              commit('catalog/addProducts', response.data.data, VUEX_COMMIT_ROOT_CONFIG);
            } else {
              commit('catalog/dataProducts', response.data.data, VUEX_COMMIT_ROOT_CONFIG);
            }

            return response;
          }

          dispatch('notification/showUnknownError', null, VUEX_COMMIT_ROOT_CONFIG);

          return Promise.reject(new Error('apiFailure'));
        })
        .finally(() => {
          commit('catalog/setIsLoading', false, VUEX_COMMIT_ROOT_CONFIG);
      });
    },

    /**
     * Returns the category with a specific category id.
     *
     * @param {Object} state - The current state object.
     * @param {String | Number} categoryId - The category ID.
     *
     * @returns {Promise | null}
     */
    getCategoryItem({ state }, categoryId) {
      const categories = state.categories ? state.categories.categories : [];

      return categories.find(category => category.id === parseInt(categoryId, 10));
    }
  },
  // modules: [],
};
