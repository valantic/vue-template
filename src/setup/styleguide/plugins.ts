import { createRouter, createWebHistory } from 'vue-router';
import styleguideRoutes from './routes';

const router = createRouter({
  routes: styleguideRoutes,
  history: createWebHistory(),
});

export default [
  [router],
];
