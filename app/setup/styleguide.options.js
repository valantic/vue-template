import Vue from 'vue';
import VueRouter from 'vue-router';
import VueCollapse from 'vue2-collapse';
import styleguideRoutes from './styleguide.routes';
import sLayout from '../styleguide/components/s-layout';
import AxiosMockAdapter from './plugins/styleguide.axios-mock';

/**
 * In development and on styleguide build, include router and example pages
 */

// NOTE: replace if you use router in your application by default!
// See https://router.vuejs.org/en/
Vue.use(VueRouter);
Vue.use(VueCollapse);
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
  template: '<s-layout/>',
  components: {
    sLayout,
  }
};
