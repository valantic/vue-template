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
    product: state => state.product,

    /**
     * Get the product information
     *
     * @param   {Object}  state   Current state
     *
     * @returns  {Object}  product   Product information data
     */
    productInformation: state => state.productInformation,
  },
  mutations: {
    /**
     * Sets the productinformation for the current state
     *
     * @param {Object} state Current state
     * @param {Object} productInformation Product information data
     */
    setProductInformation(state, productInformation) {
      state.productInformation = productInformation;
    },

    /**
     * Handles an API failure
     *
     * @param {Object} state Current state
     * @param {Object} error API Error that occurred
     */
    apiFailure(state, error) {
      state.apiError = error;
    }
  },
  actions: {
    productInformation({ commit }, payload) {
      return api.post('/product/multi-get', payload)
        .then((response) => {
          if (response && Array.isArray(response.data) && response.data.length) {
            commit('setProductInformation', response.data[0]);
          } else {
            throw new Error('apiFailure');
          }
        })
        .catch(error => commit('apiFailure', error));
    },
  },
};
