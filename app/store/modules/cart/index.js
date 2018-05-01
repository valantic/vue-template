import cartData from './mock/cart';
import api from './../../utils/api';

/**
 * Finds the first occurence of item in given cart object
 *
 * @param {Object} cart - Cart object
 * @param {String} sku - Sku of the cart item
 * @param {String} groupKey - groupKey of the cart item
 * @returns {Object} - Cart item, if found
 */
function findInCart(cart, sku, groupKey) {
  return cart.items.find(i => i.sku === sku && i.groupKey === groupKey);
}

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
     * @param {Object} state - State
     * @param {Object} data - Cart data
     */
    data(state, data) {
      state.cart = data;
    },

    /**
     * Update product item in cart
     *
     * @param {Object} state - State
     * @param {Object} item - Cart item object
     * @param {string} item.sku - Sku of the product to be added
     * @param {string} item.groupKey - GroupKey of the product to be added
     * @param {string} item.quantity - Quantity of the product to be added
     */
    updateCartItem(state, item) {
      let existingItem = findInCart(state.cart, item.sku, item.groupKey);

      console.dir(state.cart.items[0].quantity);

      if (existingItem) {
        existingItem.quantity = item.quantity;
      } else {
        state.cart.items.push(item);
      }

      console.dir(state.cart);
    },

    /**
     * Handles an API failure
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
     * @param {Object} item - Cart item object
     * @param {string} item.sku - Sku of the product to be added
     * @param {string} item.groupKey - GroupKey of the product to be added
     * @param {string} item.quantity - Quantity of the product to be added
     * @returns {Promise} Promise object
     */
    addToCart({ state, commit }, item) {
      /**
       * Triggers commit
       *
       * @param {Object} response - The response object from backend
       */
      let success = function(response) {
        let responseItem = findInCart(response, item.sku, item.groupKey);

        if (responseItem) {
          commit('updateCartItem', responseItem);
        }
      };
      let existingItem = findInCart(state.cart, item.sku, item.groupKey);

      if (existingItem) {
        return api.patch(`/cart/1/${item.sku}/${item.groupKey}`, item)
          .then(success)
          .catch(error => commit('apiFailure', error));
      }

      // create
      return api.post('/cart/1', item)
        .then(success)
        .catch(error => commit('apiFailure', error));
    },
  },
};
