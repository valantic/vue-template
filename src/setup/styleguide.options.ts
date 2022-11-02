/* eslint-disable vue/no-unused-properties */
import { createRouter, createWebHistory } from 'vue-router';
import app from '@/styleguide/components/app.vue';
import styleguideRoutes from './styleguide.routes';
import '@/styleguide/mock-data/api/browser';

// In development and on styleguide build, include router and example pages

// NOTE: replace if you use router in your application by default!
// See https://router.vuejs.org/en/
export const router = createRouter({
  routes: styleguideRoutes,
  history: createWebHistory(),
});

export const options = {
  template: '<app />',
  components: {
    app,
  },
};
