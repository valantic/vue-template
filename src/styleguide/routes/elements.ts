import { styleguideRouterConfig } from '@valantic/vue-styleguide';

export const routes = [
  {
    path: `${styleguideRouterConfig.rootPath}/elements`,
    name: 'elements',
    component: styleguideRouterConfig.routeChildrenComponentWrapper,
    meta: {
      title: 'Elements',
    },
    children: [
      {
        path: 'e-wysiwyg',
        name: 'e-wysiwyg',
        component: () => import('@/styleguide/demo-pages/elements/r-wysiwyg.vue'),
        meta: {
          title: 'WYSIWYG',
        },
      },
      {
        path: 'e-button',
        name: 'e-button',
        component: () => import('@/styleguide/demo-pages/elements/r-button.vue'),
        meta: {
          title: 'Button',
        },
      },
      {
        path: 'e-picture',
        name: 'e-picture',
        component: () => import('@/styleguide/demo-pages/elements/r-picture.vue'),
        meta: {
          title: 'Picture',
          alternativeTitles: ['images'],
        },
      },
      {
        path: 'e-table',
        name: 'e-table',
        component: () => import('@/styleguide/demo-pages/elements/r-table.vue'),
        meta: {
          title: 'Table',
        },
      },
      {
        path: 'e-video',
        name: 'e-video',
        component: () => import('@/styleguide/demo-pages/elements/r-video.vue'),
        meta: {
          title: 'Video',
        },
      },
      {
        path: 'e-loading-indicator',
        name: 'e-loading-indicator',
        component: () => import('@/styleguide/demo-pages/elements/r-loading-indicator.vue'),
        meta: {
          title: 'Loading Indicator',
          alternativeTitles: ['progress', 'spinner'],
        },
      },
    ],
  },
];
