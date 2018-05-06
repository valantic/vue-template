import cartData from './mock/cart';
import api from './../../utils/api';

export default {
  namespaced: true,
  state: {
    /**
     * @type {Object}   Stores cart items
     */
    cart: cartData, // TODO - remove mock data once we have the api

    /**
     * @type {Object} API error
     */
    apiError: null,
  },
  getters: { },
  mutations: {
    /**
     * Initial cart data provided by spryker
     *
     * @param {Object} state   State
     * @param {Object} data   Cart data
     */
    data(state, data) {
      state.cart = data;
    },

    /**
     * Update product item in cart
     *
     * @param {Object} state   State
     * @param {Object} item   Cart item object
     */
    updateCartItem(state, item) {
      state.cart.items.push(item);
    },

    /**
     * Handles an API failure
     *
     * @param {Object} state Current state
     * @param {Object} error API Error that ocured
     */
    apiFailure(state, error) {
      state.apiError = error;
    }
  },
  actions: {
    /**
     * Asynchronously add product to cart
     *
     * @param {Object} item   Cart item object
     * @param {string} item.sku   Sku of the product to be added
     * @param {string} item.quantity   Quantity of the product to be added
     *
     * @returns {Promise} Promise object
     */
    addToCart({ commit }, item) {
      return api.post('/cart/1', item) // TODO - replace id
        .then((response) => {
          const responseItem = response.data.items.find(i => i.sku === item.sku);

          // TODO - api should reply with the complete cart item
          if (responseItem) {
            commit('updateCartItem', responseItem);
          }
        })
        .catch(error => commit('apiFailure', error));
    },
  },
};
