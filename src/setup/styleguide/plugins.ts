import { createRouter, createWebHistory } from 'vue-router';
import styleguideRoutes from './routes';
import { CustomPlugin } from '@/setup/plugins';

const router = createRouter({
  routes: styleguideRoutes,
  history: createWebHistory(),
});

export default [
  { plugin: router },
] satisfies CustomPlugin[];
