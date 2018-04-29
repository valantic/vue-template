// store/modules/cart/index.js

import cartData from './mock/cart';

export default {
  namespaced: true,
  state: {
    /**
     * @type {Object}   Stores cart items
     */
    cart: cartData,
  },
  getters: { },
  mutations: {
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
      let cartItem = state.cart.items.find(i => i.sku === item.sku && i.groupKey === item.groupKey);

      if (cartItem) {
        cartItem.quantity = item.quantity;
      } else {
        state.cart.items.push({
          sku: item.sku,
          groupKey: item.groupKey,
          quantity: item.quantity,
        });
      }
      console.log(state.cart.items);
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
    addToCartAsync({ state, commit }, item) {
      const cartItem = state.cart.items.find(i => i.sku === item.sku && i.groupKey === item.groupKey);

      if (cartItem) {
        // PATCH
        // TODO - add ajax call + error handling
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            const response = item; // set response to real response

            commit('updateCartItem', response);
            resolve(response); //
          }, 200);
        });
      }

      // POST
      // TODO - add ajax call + error handling
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const response = item; // set response to real response

          commit('updateCartItem', response);
          resolve(response); //
        }, 200);
      });
    },
  },
};
