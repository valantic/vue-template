// store/modules/product/index.js

import productData from './mock/product';
import collapsibleData from './mock/collapsible';

export default {
  namespaced: true,
  state: {
    /**
     * @property {Object}   Stores product data
     */
    product: productData,

    /**
     * @property {Array}   Stores collapsible items
     */
    collapsible: collapsibleData,
  },
  getters: {
    /**
     * Gets a product
     *
     * @param   {Object}  state   Current state
     *
     * @returns  {Array}  product   Product data
     */
    getProduct: state => state.product,

    /**
     * Gets collapsible items to create an accordion
     *
     * @param   {Object}  state   Current state
     *
     * @returns  {Array}  items   Collapsible items (accordion)
     */
    getCollapsible: state => state.collapsible
  },
  mutations: {},
  actions: {},
};
