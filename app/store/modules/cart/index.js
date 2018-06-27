import miniCartData from './mock/miniCart';
import api from './../../utils/api';

export default {
  namespaced: true,
  state: {
    /**
     * @type {Object}   Stores cart object
     */
    cart: {},

    /**
     * @type {Object}   Stores mini cart object
     */
    miniCart: miniCartData,
  },
  getters: {
    /**
     * Gets the items in the cart.
     *
     * @param   {Object}  state   Current state
     *
     * @returns  {Array}  items   Items in cart
     */
    items: state => state.cart.items,

    /**
     * Gets number of items in cart.
     *
     * @param   {Object}  state   Current state
     *
     * @returns  {Number}  quantity   Number of items in cart
     */
    quantity: state => (state.cart.items ? state.cart.items.length : state.miniCart.cartQuantity),

    /**
     * Gets subtotal price for all cart items.
     *
     * @param   {Object}  state   Current state
     *
     * @returns  {Number}  subtotal   Subtotal of items in cart
     */
    subtotal: state => (state.cart.items ? state.cart.totals.subtotal : state.miniCart.netTotal)
  },
  mutations: {
    /**
     * Cart data provided by backend.
     *
     * @param {Object} state   Current state
     * @param {Object} data   Cart data
     */
    data(state, data) {
      state.cart = data;
    },

    /**
     * Mini cart data provided by backend.
     *
     * @param {Object} state   Current state
     * @param {Object} data   Cart data
     */
    dataMiniCart(state, data) {
      state.miniCart = data;
    },

    /**
     * Update cart totals object.
     *
     * @param {Object} state   Current state
     * @param {Object} totals   Totals data
     */
    updateTotals(state, totals) {
      if (state.cart.items) {
        state.cart.totals = totals;
      } else {
        state.miniCart.netTotal = totals.subtotal;
      }
    },

    /**
     * Increments quantity count.
     *
     * @param {Object} state   Current state
     */
    incrementQuantity(state) {
      if (!state.cart.items) {
        state.miniCart.cartQuantity += 1;
      }
    },
  },
  actions: {
    /**
     * Asynchronously add product to cart.
     *
     * @param {String} quantity   Amount of product units to be added
     * @param {String} sku   Sku of the product to be added
     *
     * @returns {Promise} Promise object
     */
    addToCart({ commit }, sku, quantity) {
      return api.post('/cart/1', { sku, quantity }) // TODO - replace id of cart
        .then((response) => {
          if (response && response.data && response.data.totals && Object.keys(response.data.totals).length) {
            commit('updateTotals', response.data.totals);
            commit('incrementQuantity');

            return response;
          }
          throw new Error('apiFailure');
      });
    },
  },
};
