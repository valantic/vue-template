import productListData from '@/store/modules/catalog/mock/productlist';

export default {
  namespaced: true,
  state: {
    /**
     * @property {Object}   Stores productlist data
     */
    productlist: productListData,
  },
  getters: {
    /**
     * Gets a productlist.
     *
     * @param   {Object}  state   Current state
     *
     * @returns  {Object}  product   Productlist data
     */
    productlist: state => state.productlist,
  },
  mutations: {},
  actions: {},
};

