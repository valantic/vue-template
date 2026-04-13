import { styleguideRouterConfig } from '@valantic/vue-styleguide';

export const routes = [
  {
    path: `${styleguideRouterConfig.rootPath}/general`,
    name: 'general',
    component: styleguideRouterConfig.routeChildrenComponentWrapper,
    meta: {
      title: 'General',
    },
    children: [
      {
        path: 'colors',
        name: 'colors',
        component: () => import('@/styleguide/demo-pages/general/r-colors.vue'),
        meta: {
          title: 'Colors',
        },
      },
      {
        path: 'icons',
        name: 'icons',
        component: () => import('@/styleguide/demo-pages/general/r-icons.vue'),
        meta: {
          title: 'Icons',
        },
      },
      {
        path: 'forms',
        name: 'forms',
        component: () => import('@/styleguide/demo-pages/general/r-forms.vue'),
        meta: {
          title: 'Form Fields',
          alternativeTitles: ['input', 'select', 'checkbox', 'radio', 'textarea'],
        },
      },
      {
        path: 'typography',
        name: 'typography',
        component: () => import('@/styleguide/demo-pages/general/r-typography.vue'),
        meta: {
          title: 'Typography',
          alternativeTitles: ['font', 'text', 'headlines', 'wysiwyg'],
        },
      },
      {
        path: 'notifications',
        name: 'Notifications',
        component: () => import('@/styleguide/demo-pages/general/r-notifications.vue'),
        meta: {
          title: 'Notifications',
        },
      },
      {
        path: 'tooltips',
        name: 'tooltips',
        component: () => import('@/styleguide/demo-pages/general/r-tooltips.vue'),
        meta: {
          title: 'Tooltips',
        },
      },
      {
        path: 'translations',
        name: 'translations',
        component: () => import('@/styleguide/demo-pages/general/r-translations.vue'),
        meta: {
          title: 'Translations (i18n)',
        },
      },
    ],
  },
];
