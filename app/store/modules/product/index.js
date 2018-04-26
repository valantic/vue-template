// store/modules/product/index.js

import product from './mock';

export default {
  namespaced: true,
  state: {
    items: product // demo
  },
  getters: {
    /**
     * Gets a product
     *
     * @param   {Object}  state - Current state
     *
     * @returns  {Array}  product - Product data
     */
    getProduct: state => state.items
  },
  mutations: {},
  actions: {},
};
