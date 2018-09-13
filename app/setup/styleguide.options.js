import Vue from 'vue';
import VueRouter from 'vue-router';
import cCmsWrapperMockData from '@/styleguide/mock-data/cCmsWrapper';
import styleguideRoutes from './styleguide.routes';
import sLayout from '../styleguide/components/s-layout';
import AxiosMockAdapter from './plugins/styleguide.axios-mock';

/**
 * In development and on styleguide build, include router and example pages
 */

// NOTE: replace if you use router in your application by default!
// See https://router.vuejs.org/en/
Vue.use(VueRouter);
Vue.use(AxiosMockAdapter);

Vue.mixin({
  data() {
    return {
      mockData: {
        cCmsWrapperMockData,
      }
    };
  },
  methods: {
    onStyleguideClick(event) {
      // eslint-disable-next-line no-console
      console.log('You clicked:', event.target);
    },
  }
});

const router = new VueRouter({
  routes: styleguideRoutes,
  mode: 'history',
});

window.vm = new Vue();

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
