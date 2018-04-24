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
   * Gets all products
   *
   * @param   {state}   current state
   * @returns  {Array} Products
   */
  // TODO handle state error e.g. (eslint no-shadow: ["error", { "allow": ["state"] }])
  getProducts: state => state.items
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
