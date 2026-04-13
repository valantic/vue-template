import { styleguideRouterConfig } from '@valantic/vue-styleguide';

export const routes = [
  {
    path: `${styleguideRouterConfig.rootPath}/directives`,
    name: 'directives',
    redirect: `${styleguideRouterConfig.rootPath}/directives/index`,
    component: styleguideRouterConfig.routeChildrenComponentWrapper,
    meta: {
      title: 'Directives',
    },
    children: [
      {
        path: 'focus-mask',
        name: 'focus-mask',
        component: () => import('@/styleguide/demo-pages/directives/r-focus-mask.vue'),
        meta: {
          title: 'Focus mask',
        },
      },
    ],
  },
];
