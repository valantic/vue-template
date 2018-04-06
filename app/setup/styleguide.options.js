import Vue from 'vue';
import VueRouter from 'vue-router';
import styleguideRoutes from './styleguide.routes';
import sNavigation from '../styleguide/components/s-navigation';
import AxiosMockAdapter from './plugins/styleguide.axios-mock';

/**
 * In development and on styleguide build, include router and example pages
 */

// NOTE: replace if you use router in your application by default!
// See https://router.vuejs.org/en/
Vue.use(VueRouter);
Vue.use(AxiosMockAdapter);

const router = new VueRouter({
  routes: styleguideRoutes,
  mode: 'history',
});

export default {
  data: {
    styleguideRoutes,
  },
  router,
  template: '<s-navigation :routes="styleguideRoutes" nav-position="right"/>',
  components: {
    sNavigation,
  }
};
