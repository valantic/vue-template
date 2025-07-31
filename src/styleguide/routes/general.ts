import { sectionWrapper, styleguideRoot } from '@valantic/vue-styleguide/src/styleguide/setup/routes';
import notifications from '@/styleguide/demo-pages/components/r-notifications.vue';
import tooltips from '@/styleguide/demo-pages/components/r-tooltips.vue';
import colors from '@/styleguide/demo-pages/general/r-colors.vue';
import forms from '@/styleguide/demo-pages/general/r-forms.vue';
import icons from '@/styleguide/demo-pages/general/r-icons.vue';
import typography from '@/styleguide/demo-pages/general/r-typography.vue';

export const routes = [
  {
    path: `${styleguideRoot}/general`,
    name: 'general',
    component: sectionWrapper,
    meta: {
      title: 'General',
    },
    children: [
      {
        path: 'colors',
        name: 'colors',
        component: colors,
        meta: {
          title: 'Colors',
        },
      },
      {
        path: 'icons',
        name: 'icons',
        component: icons,
        meta: {
          title: 'Icons',
        },
      },
      {
        path: 'forms',
        name: 'styleguideForms',
        component: forms,
        meta: {
          title: 'Forms',
        },
      },
      {
        path: 'typography',
        name: 'typography',
        component: typography,
        meta: {
          title: 'Typography',
        },
      },
      {
        path: 'notifications',
        name: 'Notifications',
        component: notifications,
        meta: {
          title: 'Notifications',
        },
      },
      {
        path: 'tooltips',
        name: 'tooltips',
        component: tooltips,
        meta: {
          title: 'Tooltips',
        },
      },
    ],
  },
];
