// store/modules/product/index.js
import productData from './mock';

const namespaced = true;

// initial state
const state = {
  items: productData // demo
};

// getters
const getters = {
  /**
   * Gets a product
   *
   * @param   {state}   Current state
   * @returns  {Array} Product
   */
  // TODO handle state error e.g. (eslint no-shadow: ["error", { "allow": ["state"] }])
  getProduct: state => state.items
};

// mutations
const mutations = {};

// actions
const actions = {};

export default {
  namespaced,
  state,
  getters,
  mutations,
  actions,
};
