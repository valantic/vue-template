import { createRouter, createWebHistory } from 'vue-router';
import styleguideRoutes from './routes';
import { ICustomPlugin } from '@/setup/plugins';

const router = createRouter({
  routes: styleguideRoutes,
  history: createWebHistory(),
});

export default [
  { plugin: router },
] satisfies ICustomPlugin[];
