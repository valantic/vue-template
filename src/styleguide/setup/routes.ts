import { styleguideRouterConfig, styleguideTestPages } from '@valantic/vue-styleguide';
import { routes as componentRoutes } from '@/styleguide/routes/components';
import { routes as directiveRoutes } from '@/styleguide/routes/directives';
import { routes as elementRoutes } from '@/styleguide/routes/elements';
import { routes as generalRoutes } from '@/styleguide/routes/general';
import { routes as layoutRoutes } from '@/styleguide/routes/layouts';

/**
 * This file is only meant for style-example routes
 */
export default [
  {
    path: styleguideRouterConfig.rootPath,
    name: 'sg-root',
    component: styleguideRouterConfig.routeChildrenComponentWrapper,
    redirect: `${styleguideRouterConfig.rootPath}/${styleguideTestPages.readme.path}`,
    meta: {
      title: 'Styleguide',
    },
    children: [styleguideTestPages.readme],
  },
  ...generalRoutes,
  ...elementRoutes,
  ...layoutRoutes,
  ...componentRoutes,
  ...directiveRoutes,
  {
    path: '/:pathMatch(.*)*',
    redirect: styleguideRouterConfig.rootPath,
  },
];
