import Vue from 'vue';
import Vuex from 'vuex';

// modules
import cart from './modules/cart';
import category from './modules/category';
import navigation from './modules/navigation';
import order from './modules/order';
import product from './modules/product';
import profile from './modules/profile';
import session from './modules/session';
import wishlist from './modules/wishlist';

Vue.use(Vuex);

export default new Vuex.Store({
  /**
   * state, actions & getters
   * must be defined within modules
   * */
  modules: {
    cart,
    category,
    navigation,
    order,
    product,
    profile,
    session,
    wishlist,
  },
});
