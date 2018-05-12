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
    erp: {
      priceGross: 0,
      price: 0,
      priceType: 0,
      priceTypeEndDate: '',
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
    erp: state => state.erp,
  },
  mutations: {
    /**
     * Sets erp state
     *
     * @param {Object} state   Current state
     * @param {Object} erp   Product information data from ERP
     */
    setErp(state, erp) {
      state.erp = erp;
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
     * Fetches data from erp
     *
     * @param {String} sku   Product sku
     *
     * @returns  {Promise}  promise   Promise
     */
    fetchErp({ commit }, sku) {
      return api.post('/product/multi-get', { sku, quantity: 1 }) /* always assume quantity === 1 */
        .then((response) => {
          if (response && Array.isArray(response.data) && response.data.length) {
            commit('setErp', response.data[0]);
          } else {
            throw new Error('apiFailure');
          }
        })
        .catch(error => commit('apiFailure', error));
    },
  },
};
