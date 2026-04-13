import { styleguideRouterConfig } from '@valantic/vue-styleguide';

export const routes = [
  {
    path: `${styleguideRouterConfig.rootPath}/components`,
    name: 'components',
    redirect: `${styleguideRouterConfig.rootPath}/components/index`,
    component: styleguideRouterConfig.routeChildrenComponentWrapper,
    meta: {
      title: 'Components',
    },
    children: [
      {
        path: 'google-maps',
        name: 'google-maps',
        component: () => import('@/styleguide/demo-pages/components/r-google-maps.vue'),
        meta: {
          title: 'Google Maps',
        },
      },
      {
        path: 'cookie-consent',
        name: 'cookie-consent',
        component: () => import('@/styleguide/demo-pages/components/r-cookie-consent.vue'),
        meta: {
          title: 'Cookie consent',
        },
      },
    ],
  },
];
