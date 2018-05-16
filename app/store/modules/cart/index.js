import cartData from './mock/cart';
import miniCartData from './mock/miniCart';
import api from './../../utils/api';

export default {
  namespaced: true,
  state: {
    /**
     * @type {Object}   Stores cart object
     */
    cart: cartData, // TODO - remove mock data once the backend is available

    /**
     * @type {Object}   Stores mini cart object
     */
    miniCart: miniCartData, // TODO - remove mock data once the backend is available
  },
  getters: {
    /**
     * Gets the mini cart object
     *
     * @param   {Object}  state   Current state
     *
     * @returns  {Object}  miniCart Mini cart data
     */
    miniCart: state => state.miniCart,

    /**
     * Checks if mini cart has items
     *
     * @param   {Object}  state   Current state
     *
     * @returns  {Boolean}  miniCartHasItems True if items are in the minicart, false otherwise
     */
    miniCartHasItems: state => state.miniCart.cartQuantity > 0,

    /**
     * Checks if mini cart has price to display
     *
     * @param   {Object}  state   Current state
     *
     * @returns  {Boolean}  miniCartHasPrice True if price can be shown, false otherwise
     */
    miniCartHasPrice: state => state.miniCart.netTotal && state.miniCart.cartQuantity > 0,
  },
  mutations: {
    /**
     * Cart data provided by backend
     *
     * @param {Object} state   Current state
     * @param {Object} data   Cart data
     */
    data(state, data) {
      state.cart = data;
    },

    /**
     * Mini cart data provided by backend
     *
     * @param {Object} state   Current state
     * @param {Object} data   Cart data
     */
    dataMiniCart(state, data) {
      state.miniCart = data;
    },

    /**
     * Update cart totals and mini cart values after add to cart
     *
     * @param {Object} state   Current state
     * @param {Object} totals   Totals data
     */
    updateTotals(state, totals) {
      state.cart.totals = totals;
      state.miniCart.cartQuantity += 1;
      state.miniCart.netTotal = state.cart.totals.subtotal;
    },
  },
  actions: {
    /**
     * Asynchronously add product to cart
     *
     * @param {string} quantity   Amount of product units to be added
     * @param {string} sku   Sku of the product to be added
     *
     * @returns {Promise} Promise object
     */
    addToCart({ commit }, sku, quantity) {
      return api.post('/cart/1', { sku, quantity }) // TODO - replace id of cart
        .then((response) => {
          if (response && response.data && response.data.totals && Object.keys(response.data.totals).length) {
            commit('updateTotals', response.data.totals);

            return response;
          }
          throw new Error('apiFailure');
      });
    },
  },
};
