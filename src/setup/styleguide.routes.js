import lDefault from '@/layouts/l-default.vue';

import index from '@/styleguide/routes/index';
import sandbox from '@/styleguide/routes/sandbox';
import icons from '@/styleguide/routes/icons';
import forms from '@/styleguide/routes/forms';
import notifications from '@/styleguide/routes/notifications';

const root = '/styleguide';
const categoryWrapper = {
  template: '<router-view />'
};

/**
 * This file is only meant for style-example routes
 */
export default [
  {
    path: root,
    name: 'index',
    component: index,
    meta: {
      title: 'Welcome',
    }
  },
  {
    path: `${root}/sandbox`,
    name: 'sandboxWrapper',
    redirect: `${root}/sandbox/index`,
    component: categoryWrapper,
    meta: {
      title: 'Sandbox',
    },
    children: [
      {
        path: 'index',
        name: 'sandbox',
        component: sandbox,
        meta: {
          title: 'Sandbox',
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
        path: 'layout',
        name: 'styleguideLayout',
        component: lDefault,
        meta: {
          title: 'Layout',
        }
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
        path: 'notifications',
        name: 'Notifications',
        component: notifications,
        meta: {
          title: 'Notifications',
        },
      },
    ]
  },
  {
    path: '*',
    redirect: root,
  },
];
