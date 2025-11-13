import { styleguideRoot } from '@valantic/vue-styleguide/src/styleguide/setup/routes';
import index from '@/styleguide/demo-pages/r-index.vue';
import { routes as componentRoutes } from '@/styleguide/routes/components';
import { routes as directiveRoutes } from '@/styleguide/routes/directives';
import { routes as elementRoutes } from '@/styleguide/routes/elements';
import { routes as generalRoutes } from '@/styleguide/routes/general';
import { routes as layoutRoutes } from '@/styleguide/routes/layouts';

declare module 'vue-router' {
  interface RouteMeta {
    title: string;
    params?: {
      [key: string]: string;
    };
    query?: {
      [key: string]: string;
    };
  }
}

export default [
  {
    path: styleguideRoot,
    name: 'index',
    component: index,
    meta: {
      title: 'Welcome',
    },
  },
  ...componentRoutes,
  ...layoutRoutes,
  ...generalRoutes,
  ...elementRoutes,
  ...directiveRoutes,
  {
    path: '/:pathMatch(.*)*',
    redirect: styleguideRoot,
  },
];
