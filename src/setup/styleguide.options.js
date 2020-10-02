import Vue from 'vue';
import VueRouter from 'vue-router';
import app from '@/styleguide/components/app';
import AxiosMockAdapter from '@/plugins/styleguide.axios-mock';
import dummyImages from '@/styleguide/mock-data/initial-data/images';
import dummyVideos from '@/styleguide/mock-data/initial-data/videos';
import dummyTableData from '@/styleguide/mock-data/initial-data/table';
import { availableStatus } from '@/plugins/styleguide.status-label';
import styleguideRoutes from '@/styleguide.routes';
import pimcore from '@/plugins/pimcore';

// In development and on styleguide build, include router and example pages

// NOTE: replace if you use router in your application by default!
// See https://router.vuejs.org/en/
Vue.use(VueRouter);
Vue.use(AxiosMockAdapter);
Vue.use(pimcore);

Vue.mixin({
  data() {
    return {
      availableStatus,
      mockData: {
        dummyImages,
        dummyVideos,
        dummyTableData
      }
    };
  },
  methods: {
    /**
     * General event handler for styleguide click events.
     *
     * @param {Event} event - The related DOM event.
     */
    onStyleguideClick(event) {
      // eslint-disable-next-line no-console
      console.log('You clicked:', event.target);
    },
  }
});

const router = new VueRouter({
  routes: styleguideRoutes,
  mode: 'history', // Using 'hash' with the styleguide build requires less server configuration.
});

export default {
  data: {
    styleguideRoutes,
  },
  router,
  template: '<app />',
  components: {
    app,
  }
};
