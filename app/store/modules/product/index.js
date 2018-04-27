// store/modules/product/index.js

import productData from './mock/product';

export default {
  namespaced: true,
  state: {
    /**
     * @property {Object}   product   Stores product data
     */
    product: productData
  },
  getters: {
    /**
     * Gets a product
     *
     * @param   {Object}  state   Current state
     *
     * @returns  {Array}  product   Product data
     */
    getProduct: state => state.product
  },
  mutations: {},
  actions: {},
};
