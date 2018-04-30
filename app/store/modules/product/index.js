// store/modules/product/index.js

import productData from './mock/product';
import api from './../../utils/api';

export default {
  namespaced: true,
  state: {
    /**
     * @type {Object}   Stores product data
     */
    product: productData,

    /**
     * @type {Object}   Stores product information data
     */
    productInformation: {},

    /**
     * @type {Object} API error
     */
    apiError: null,
  },
  getters: {
    /**
     * Gets a product
     *
     * @param   {Object}  state   Current state
     *
     * @returns  {Object}  product   Product data
     */
    getProduct: state => state.product,

    /**
     * Get the product information
     *
     * @param   {Object}  state   Current state
     *
     * @returns  {Object}  product   Product information data
     */
    getProductInformation: state => state.productInformation,
  },
  mutations: {
    /**
     * Sets the productinformation for the current state
     * @param {Object} state Current state
     * @param {Object} productInformation Product information data
     */
    setProductInformation(state, productInformation) {
      state.productInformation = productInformation;
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
    getProductInformation({ commit, state }) {
      const payload = [{
        sku: state.product.sku,
        quantity: state.product.quantity
      }];

      return api.post('/product/multi-get', payload)
        .then((response) => {
          if (response && response instanceof Array && response.length > 0) {
            commit('setProductInformation', response[0]);
          }
        })
        .catch(error => commit('apiFailure', error));
    },
  },
};
