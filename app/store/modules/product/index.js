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
    productInformation: {
      priceGross: 0,
      price: 0,
    },

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
     * The additional product information from ERP
     *
     * @param   {Object}  state   Current state
     *
     * @returns  {Object}  product   Product information data
     */
    productInformation: state => state.productInformation,
  },
  mutations: {
    /**
     * Sets the productInformation
     *
     * @param {Object} state   Current state
     * @param {Object} productInformation   Product information data from ERP
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
    /**
     * Fetches productInformation from ERP
     *
     * @param {Object} payload   Product information
     *
     * @returns  {Promise}  promise   Promise
     */
    fetchProductInformation({ commit }, payload) {
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
