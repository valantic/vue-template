import Vue from 'vue';
import VueRouter from 'vue-router';
import styleguideRoutes from './styleguide.routes';
import sNavigation from '../styleguide/components/s-navigation';

/**
 * In development and on styleguide build, include router and example pages
 */

// NOTE: replace if you use router in your application by default!
// See https://router.vuejs.org/en/
Vue.use(VueRouter);

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
  },
};
