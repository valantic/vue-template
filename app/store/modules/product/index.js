import { VUEX_COMMIT_ROOT_CONFIG } from '@/setup/globals';
import api from '@/store/utils/api';

export default {
  namespaced: true,
  state: {
    /**
     * @type {Object} Stores product data
     */
    product: process.env.NODE_ENV !== 'production'
      ? require('./mock/product').default // eslint-disable-line global-require
      : null,

    /**
     * @type {Array} Stores collapsible items
     */
    collapsible: process.env.NODE_ENV !== 'production'
      ? require('./mock/collapsible').default // eslint-disable-line global-require
      : [],

    /**
     * @type {Boolean} Holds the ERP loading status.
     */
    erpLoaded: false,

    /**
     * @type {Object} Stores ERP data for product
     */
    erp: {
      price: 0,
      priceGross: 0,
      priceType: null,
      priceTypeEndDate: null,
      priceUnit: 100,
      quantity: 1,
      quantityOnHand: null,
      sku: '',
      stocks: null,
      unitPrice: 0,
      unitPriceGross: 0,
      warehouses: [],
    },

    /**
     * @type {Array} Stores related accessories.
     */
    accessoryProducts: process.env.NODE_ENV !== 'production'
      ? require('./mock/relations').default.accessory // eslint-disable-line global-require
      : [],

    /**
     * @type {Array} Stores related alternatives.
     */
    alternativeProducts: process.env.NODE_ENV !== 'production'
      ? require('./mock/relations').default.alternative // eslint-disable-line global-require
      : [],

    /**
     * @type {Array} Stores related consists of products.
     */
    consistsOfProducts: process.env.NODE_ENV !== 'production'
      ? require('./mock/relations').default.consists // eslint-disable-line global-require
      : [],

    /**
     * @type {Array} Stores related necessary accessories.
     */
    necessaryAccessoryProducts: process.env.NODE_ENV !== 'production'
      ? require('./mock/relations').default.necessaryAccessory // eslint-disable-line global-require
      : [],

    /**
     * @type {Array} Stores related replacements.
     */
    replacementProducts: process.env.NODE_ENV !== 'production'
      ? require('./mock/relations').default.replacement // eslint-disable-line global-require
      : [],
  },
  getters: {
    /**
     * Gets collapsible items to create an accordion.
     *
     * @param   {Object}  state   Current state
     *
     * @returns  {Array}  items   Collapsible items (accordion)
     */
    collapsible: state => state.collapsible,

    /**
     * The ERP - or "Live" data for the product.
     *
     * @param   {Object}  state   Current state
     *
     * @returns  {Object}  erp   ERP data for product
     */
    erp: state => state.erp,

    /**
     * Returns the loading state of ERP data.
     *
     * @param {Object} state - The Vuex module sate.
     *
     * @returns {Boolean}
     */
    erpLoaded: state => state.erpLoaded,

    /**
     * Gets a product.
     *
     * @param   {Object}  state   Current state
     *
     * @returns  {Object}  product   Product data
     */
    product: state => state.product,

    /**
     * Gets the technical attributes from product.
     *
     * @param {Object} state - The current Vuex module state.
     *
     * @returns {Array}
     */
    technicalAttributes: state => (
      state.product && Array.isArray(state.product.techAttributes)
        ? state.product.techAttributes
        : []
    ),

    /**
     * Gets related accessory products.
     *
     * @param {Object} state - Current state object.
     *
     * @returns {Array}
     */
    accessoryProducts: state => state.accessoryProducts,

    /**
     * Gets related alternative products.
     *
     * @param {Object} state - Current state object.
     *
     * @returns {Array}
     */
    alternativeProducts: state => state.alternativeProducts,

    /**
     * Gets related consists of products.
     *
     * @param {Object} state - Current state object.
     *
     * @returns {Array}
     */
    consistsOfProducts: state => state.consistsOfProducts,

    /**
     * Gets related necessary accessory products.
     *
     * @param {Object} state - Current state object.
     *
     * @returns {Array}
     */
    necessaryAccessoryProducts: state => state.necessaryAccessoryProducts,

    /**
     * Gets related replacement products.
     *
     * @param {Object} state - Current state object.
     *
     * @returns {Array}
     */
    replacementProducts: state => state.replacementProducts,

  },
  mutations: {
    /**
     * Initial product data provided by spryker.
     *
     * @param {Object} state   State
     * @param {Object} data   Product data
     */
    data(state, data) {
      state.product = data;
    },

    /**
     * Initial product relation data provided by spryker.
     *
     * @param {Object} state - Current state object.
     *
     * @param {Array} accessoryProducts - Accessory products.
     */
    dataDetailAccessoryProducts(state, accessoryProducts) {
      if (!accessoryProducts) {
        return;
      }

      state.accessoryProducts = accessoryProducts;
    },

    /**
     * Initial product relation data provided by spryker.
     *
     * @param {Object} state - Current state object.
     *
     * @param {Array} alternativeProducts - Alternative products.
     */
    dataDetailAlternativeProducts(state, alternativeProducts) {
      if (!alternativeProducts) {
        return;
      }

      state.alternativeProducts = alternativeProducts;
    },

    /**
     * Initial product relation data provided by spryker.
     *
     * @param {Object} state - Current state object.
     *
     * @param {Array} consistsOfProducts - Consists of products.
     */
    dataDetailConsistsOf(state, consistsOfProducts) {
      if (!consistsOfProducts) {
        return;
      }

      state.consistsOfProducts = consistsOfProducts;
    },

    /**
     * Initial product relation data provided by spryker.
     *
     * @param {Object} state - Current state object.
     *
     * @param {Array} necessaryAccessoryProducts - Necessary accessory products.
     */
    dataDetailNecessaryAccessoryProducts(state, necessaryAccessoryProducts) {
      if (!necessaryAccessoryProducts) {
        return;
      }

      state.necessaryAccessoryProducts = necessaryAccessoryProducts;
    },

    /**
     * Initial product relation data provided by spryker.
     *
     * @param {Object} state - Current state object.
     *
     * @param {Array} replacementProducts - Replacement products.
     */
    dataDetailReplacementProducts(state, replacementProducts) {
      if (!replacementProducts) {
        return;
      }

      state.replacementProducts = replacementProducts;
    },

    /**
     * Sets ERP data.
     *
     * @param {Object} state   Current state
     * @param {Object} erp   ERP data for product
     */
    setErp(state, erp) {
      state.erp = erp;
    },

    /**
     * Sets status for ERP request.
     *
     * @param {Object} state    Current state.
     * @param {Object} status   Status if ERP api call has been made.
     */
    setStatus(state, status) {
      state.erpLoaded = status;
    },
  },
  actions: {
    /**
     * Fetches data from ERP.
     *
     * @param {Object} context - The Vuex module context.
     * @param {Function} context.state - The current Vuex module state.
     * @param {Function} context.commit - The Vuex module commit method.
     * @param {Function} context.rootGetters - The Vuex module rootGetter method.
     * @param {Function} context.dispatch - The Vuex action dispatch method.
     *
     * @returns  {Object}  response   Price data from erp
     */
    fetchErp({ state, commit, rootGetters, dispatch }) { // eslint-disable-line object-curly-newline
      if (!rootGetters['session/isLoggedInUser']) {
        return Promise.reject(new Error('No logged in user.'));
      }

      if (state.product && state.product.sku !== null) {
        return api.post('/product/multi-get', [{
          sku: state.product.sku,
          quantity: state.product.quantity || state.product.quantityMin || 1,
        }])
          .then((response) => {
            if (response.data && response.data.data && response.data.data.products) {
              commit('setErp', response.data.data.products[0]);
              commit('setStatus', true);

              return response;
            }

            dispatch('notification/showUnknownError', null, VUEX_COMMIT_ROOT_CONFIG);

            return Promise.reject(new Error('apiFailure'));
        });
      }

      return Promise.reject(new Error('No SKU defined')); // This should not return an error because it's OK to sometimes not make the request.
    },
  },
};
