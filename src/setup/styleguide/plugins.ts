import { createRouter, createWebHistory } from 'vue-router';
import { CustomPlugin } from '@/setup/plugins';
import styleguideRoutes from './routes';

const router = createRouter({
  routes: styleguideRoutes,
  history: createWebHistory(),
});

export default [{ plugin: router }] satisfies CustomPlugin[];
