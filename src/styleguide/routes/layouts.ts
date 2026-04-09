import { styleguideRouterConfig } from '@valantic/vue-styleguide';

export const routes = [
  {
    path: `${styleguideRouterConfig.rootPath}/layouts`,
    name: 'layouts',
    redirect: `${styleguideRouterConfig.rootPath}/layouts/index`,
    component: styleguideRouterConfig.routeChildrenComponentWrapper,
    meta: {
      title: 'Layouts',
    },
    children: [
      {
        path: 'layout-default',
        name: 'layout-default',
        component: () => import('@/styleguide/demo-pages/layouts/r-default.vue'),
        meta: {
          title: 'Layout',
        },
      },
    ],
  },
];
