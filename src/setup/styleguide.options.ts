/* eslint-disable vue/no-unused-properties */
import { createRouter, createWebHistory } from 'vue-router';
import app from '@/styleguide/components/app.vue';
import AxiosMockAdapter from '@/plugins/styleguide.axios-mock';
import styleguideRoutes from './styleguide.routes';

// TODO make mockdata for stylguide work again when styleguideist works again

// In development and on styleguide build, include router and example pages

// NOTE: replace if you use router in your application by default!
// See https://router.vuejs.org/en/
const router = createRouter({
  routes: styleguideRoutes,
  history: createWebHistory(),
});

export const plugins = [
  [AxiosMockAdapter],
  [router],
];

export const options = {
  template: '<app />',
  components: {
    app,
  }
};
