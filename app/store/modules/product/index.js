import productData from './mock/product';
import api from './../../utils/api';
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

    /**
     * @type {Object}   Stores ERP data for product
     */
    erp: {
      priceGross: 0,
      price: 0,
      priceType: 0,
      priceTypeEndDate: '',
    },
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
     * The ERP - or "Live" data for the product
     *
     * @param   {Object}  state   Current state
     *
     * @returns  {Object}  erp   ERP data for product
     */
    erp: state => state.erp,

    /**
     * Gets collapsible items to create an accordion
     *
     * @param   {Object}  state   Current state
     *
     * @returns  {Array}  items   Collapsible items (accordion)
     */
    collapsible: state => state.collapsible
  },
  mutations: {
    /**
     * Initial product data provided by spryker
     *
     * @param {Object} state   State
     * @param {Object} data   Product data
     */
    data(state, data) {
      state.product = data;
    },

    /**
     * Sets ERP data
     *
     * @param {Object} state   Current state
     * @param {Object} erp   ERP data for product
     */
    setErp(state, erp) {
      state.erp = erp;
    },
  },
  actions: {
    /**
     * Fetches data from ERP
     *
     * @returns  {Promise}  promise   Promise
     */
    fetchErp({ state, commit }) {
      return api.post('/product/multi-get', { sku: state.product.sku, quantity: 1 })
        .then((response) => {
          if (response && response.data && response.data.products) {
            commit('setErp', response.data.products[0]);

            return response;
          }

          throw new Error('apiFailure');
      });
    },
  },
};
