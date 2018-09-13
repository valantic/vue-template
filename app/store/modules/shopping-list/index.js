import { i18n } from '@/setup/i18n';
import { VUEX_COMMIT_ROOT_CONFIG } from '@/setup/globals';
import api from '../../utils/api';

export default {
  namespaced: true,
  state: {
    /**
     * @type {Array} Stores the information for the shopping list overview page.
     */
    overview: process.env.NODE_ENV !== 'production'
      ? require('./mock/overview').default // eslint-disable-line global-require
      : null,

    /**
     * @type {Array} Stores the information for the shopping list detail page.
     */
    detail: process.env.NODE_ENV !== 'production'
      ? require('./mock/detail').default // eslint-disable-line global-require
      : {},

    /**
     * @type {Boolean} Stores the flag if a request is currently running.
     */
    requestIsRunning: false,
  },
  getters: {
    /**
     * Gets the shopping list information for the overview page.
     *
     * @param {Object} state - Current state object.
     *
     * @returns {Array|null}
     */
    getOverview(state) {
      if (state.overview && Array.isArray(state.overview.shoppingLists)) {
        return state.overview.shoppingLists.map(item => ({ ...item, id: item.idShoppingList }));
      }

      return [];
    },

    /**
     * Gets the information for a specific detail page.
     *
     * @param {Object} state - Current state object.
     *
     * @returns {Object}
     */
    getDetailMetaData: state => (state.detail && state.detail.shoppingList) || {},

    /**
     * Gets the items for a detail page.
     *
     * @param {Object} state - Current state object.
     *
     * @returns {Array}
     */
    getDetailItems: state => (state.detail && state.detail.items) || [],

    /**
     * Gets the information if a request is currently running.
     *
     * @param {Object} state - Current state object.
     *
     * @returns {Boolean}
     */
    getRequestIsRunning: state => state.requestIsRunning,
  },
  mutations: {
    /**
     * Initial overview page data provided by spryker.
     *
     * @param {Object} state - Current state object.
     * @param {Object} overview - Overview data.
     */
    dataOverview(state, overview) {
      state.overview = overview;
    },

    /**
     * Initial detail page data provided by spryker.
     *
     * @param {Object} state - Current state object.
     * @param {Object} detail - Detail data.
     */
    dataDetail(state, detail) {
      state.detail = detail;
    },

    /**
     * Sets the request running state.
     *
     * @param {Object} state - Current state object.
     * @param {Boolean} isRunning - Current request state.
     */
    setRequestIsRunningState(state, isRunning) {
      state.requestIsRunning = isRunning;
    },

    /**
     * Changes the sharing state of a specific list item.
     *
     * @param {Object} state - Current state object.
     * @param {Object} payload - The payload object.
     * @param {String|Number} payload.itemId - The id of the changed item.
     * @param {Boolean} payload.isShared - The sharing state of the item.
     */
    changeSharingState(state, payload) {
      const { itemId, isShared } = payload;
      const element = state.overview.shoppingLists.find(item => item.idShoppingList === itemId);

      element.isShared = isShared;
    }
  },
  actions: {
    /**
     * Creates a new shopping list item.
     *
     * @param {Object} context - The vuex context object.
     * @param {Function} context.commit - The current commit function.
     *
     * @returns {Promise}
     */
    addListItem({ commit }) {
      commit('setRequestIsRunningState', true);

      return api.post(i18n.t('urls.addShoppingList'), { name: i18n.t('c-shopping-list-wrapper.defaultName') })
        .then((response) => {
          commit('setRequestIsRunningState', false);

          if (response.data && response.data.data && response.data.data.shoppingList) {
            const newListId = response.data.data.shoppingList.idShoppingList;

            window.location.href = `${i18n.t('urls.shoppingListDetail')}/${newListId}`;

            return response;
          }

          return Promise.reject(new Error('Api Failure'));
        })
        .finally(() => {
          commit('setRequestIsRunningState', false);
      });
    },

    /**
     * Updates the sharing state of a specific list item.
     *
     * @param {Object} context - The vuex context object.
     * @param {Function} context.commit - The current commit function.
     * @param {Object} payload - The payload object.
     * @param {Object} payload.itemId - The id of the item.
     * @param {Object} payload.isShared - State if the item is shared or not.
     *
     * @returns {Promise}
     */
    updateSharingState({ commit }, payload) {
      commit('setRequestIsRunningState', true);

      const url = `${i18n.t('urls.updateSharingState')}/${payload.itemId}/sharing-list`; // TODO: check correct url with backend

      return api.patch(url, { state: payload.isShared })
        .then((response) => {
          if (response.data && Array.isArray(response.data.shoppingLists)) {
            commit('dataOverview', response.data);

            return response;
          }

          return Promise.reject(new Error('Api Failure'));
        })
        .finally(() => {
          commit('setRequestIsRunningState', false);
      });
    },

    /**
     * Updates the shopping list detail meta data.
     *
     * @param {Object} context - The context object of the store.
     * @param {Function} context.commit - The mutation commit method of Vuex.
     * @param {Object} payload - The payload data.
     * @param {String} payload.name - The name of the list.
     * @param {String} payload.description - The description of the list.
     * @param {String} payload.textReference - The text reference of the list.
     * @param {String} payload.listId - The id for the list which should be updated.
     * @param {Boolean} payload.isShared - Defines if the list is shared.
     *
     * @returns {Promise}
     */
    updateDetailMetaData({ commit }, payload) {
      commit('setRequestIsRunningState', true);
      const { listId } = payload;

      return api.patch(i18n.t('urls.updateShoppingListDetail', { listId }), payload)
        .then((response) => {
          if (response.data && response.data.data) {
            commit('dataDetail', response.data.data);

            return response;
          }

          return Promise.reject(new Error('Api Failure'));
        })
        .finally(() => {
          commit('setRequestIsRunningState', false);
      });
    },

    /**
     * Adds all the items in the given lists to the cart.
     *
     * @param {Object} context - The vuex context object.
     * @param {Function} context.commit - The current commit function.
     * @param {Array} items - A list of shopping-lists.
     *
     * @returns {Promise}
     */
    addListsToCart({ commit }, items) {
      commit('setRequestIsRunningState', true);

      return api.post(i18n.t('urls.addShoppingListsToCart'), {
        cartId: '1', // TODO: Set dynamic cartId
        idShoppingLists: items,
      })
        .then(response => response)
        .finally(() => {
          commit('setRequestIsRunningState', false);
      });
    },

    /**
     * Updates a given list of items with given quantities.
     *
     * @param {Object} context - The vuex context object.
     * @param {Function} context.commit - The current commit function.
     * @param {Object} payload - The payload object
     * @param {Array.<Object>} payload.items - A list of itemIds with updated quantities.
     * @param {String} payload.listId - The shopping list id.
     *
     * @returns {Promise}
     */
    updateQuantities({ commit }, payload) {
      const { items, listId } = payload;

      commit('setRequestIsRunningState', true);

      return api.patch(i18n.t('urls.updateShoppingListQuantities', { listId }), items)
        .then((response) => {
          if (response.data && response.data.data) {
            commit('dataDetail', response.data.data);

            return response;
          }

          return Promise.reject(new Error('Api Failure'));
        })
        .finally(() => {
          commit('setRequestIsRunningState', false);
      });
    },

    /**
     * Adds a product to the shopping list.
     *
     * @param {Object} context - The vuex context object.
     * @param {Function} context.commit - The current commit function.
     * @param {Object} data - The data payload object.
     * @param {String} data.listId - The shopping list id.
     * @param {String} data.erp - The ERP number of the product (not sku!).
     * @param {Number} data.quantity - The quantity of the product.
     *
     * @returns {Promise}
     */
    quickAddItem({ commit }, data) {
      const { listId, erp, quantity } = data;
      const payload = {
        quantity,
        productNumber: erp,
      };

      commit('setRequestIsRunningState', true);

      return api.post(`${i18n.t('urls.quickAddToShoppingList', { listId })}`, payload)
        .then((response) => {
          if (response.data && response.data.data) {
            commit('dataDetail', response.data.data);

            return response;
          }

          return Promise.reject(new Error('Api Failure'));
        })
        .finally(() => {
          commit('setRequestIsRunningState', false);
      });
    },

    /**
     * Removes one item from a shopping list.
     *
     * @param {Object} context - The vuex context object.
     * @param {Function} context.commit - The commit method of the Vuex module.
     * @param {Function} context.dispatch - The action dispatch method of Vuex.
     * @param {Object} payload - The payload data.
     * @param {String} payload.shoppingListId - The id of the shopping list for which the item should be removed.
     * @param {String} payload.itemId - The id of the item which should be removed.
     *
     * @returns {Promise}
     */
    removeItem({ commit, dispatch }, { shoppingListId, itemId }) {
      if (!shoppingListId || !itemId) {
        dispatch('notification/showUnknownError', null, VUEX_COMMIT_ROOT_CONFIG);

        return Promise
          .reject(new Error(`No shoppingListId or itemId provided (shoppingListId: ${shoppingListId} / itemId: ${itemId})`));
      }

      commit('setRequestIsRunningState', true);

      return api.delete(`${i18n.t('urls.removeItemFromShoppingList')}/${shoppingListId}/${itemId}`)
        .then((response) => {
          if (response.data && response.data.data) {
            commit('dataDetail', response.data.data);

            return response;
          }

          return Promise.reject(new Error('Api Failure')); // TODO: refactor error handling
        })
        .finally(() => {
          commit('setRequestIsRunningState', false);
      });
    },

    /**
     * Removes all the lists in the given array.
     *
     * @param {Object} context - The vuex context object.
     * @param {Object} context.commit - The current commit function.
     * @param {Array} itemIds - The list of listId's to remove.
     *
     * @returns {Promise}
     */
    removeLists({ commit }, itemIds) {
      commit('setRequestIsRunningState', true);

      return api.delete(i18n.t('urls.removeShoppingLists'), {
        data: {
          idShoppingLists: itemIds,
        }
      })
        .then((response) => {
          commit('setRequestIsRunningState', false);

          if (response.data && response.data.data) {
            commit('dataOverview', response.data.data);

            return response;
          }

          return Promise.reject(new Error('Api Failure'));
        })
        .finally(() => {
          commit('setRequestIsRunningState', false);
      });
    },

    /**
     * Sends delete request to remove all items from a shopping list.
     *
     * @param {Object} context - The vuex context object.
     * @param {Object} context.commit - The current commit object.
     * @param {Object} payload - The payload data.
     * @param {String} payload.shoppingListId - The id of the shopping list for which the items should be removed.
     *
     * @returns {Promise}
     */
    removeAllItems({ commit }, { shoppingListId }) {
      commit('setRequestIsRunningState', true);

      return api.delete(`${i18n.t('urls.removeAllItemsFromShoppingList')}/${shoppingListId}/remove-all`)
        .then((response) => {
          if (response.data && response.data.data) {
            commit('dataDetail', response.data.data);

            return response;
          }

          return Promise.reject(new Error('Api Failure')); // TODO: refactor error handling
        })
        .finally(() => {
          commit('setRequestIsRunningState', false);
      });
    },
  },
};
