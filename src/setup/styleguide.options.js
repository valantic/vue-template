import Vue from 'vue';
import VueRouter from 'vue-router';
import './styleguide.polyfills';
import styleguideRoutes from './styleguide.routes';
import sLayout from '../styleguide/components/s-layout';
import AxiosMockAdapter from '../plugins/styleguide.axios-mock';
import dummyImages from '../styleguide/mock-data/initial-data/images';
import dummyVideos from '../styleguide/mock-data/initial-data/videos';
import dummyTableDate from '../styleguide/mock-data/initial-data/table';
import { availableStatus } from '../plugins/styleguide.status-label';

// In development and on styleguide build, include router and example pages

// NOTE: replace if you use router in your application by default!
// See https://router.vuejs.org/en/
Vue.use(VueRouter);
Vue.use(AxiosMockAdapter);

Vue.mixin({
  data() {
    return {
      availableStatus,
      mockData: {
        dummyImages,
        dummyVideos,
        dummyTableDate
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
