import { ComponentPublicInstance } from 'vue';
import lDefault from '@/layouts/l-default.vue';

import index from '@/styleguide/routes/r-index.vue';
import sandbox from '@/styleguide/routes/r-sandbox.vue';
import icons from '@/styleguide/routes/r-icons.vue';
import forms from '@/styleguide/routes/r-forms.vue';
import notifications from '@/styleguide/routes/r-notifications.vue';
import wysiwyg from '@/styleguide/routes/r-wysiwyg.vue';
import table from '@/styleguide/routes/r-table.vue';
import tooltips from '@/styleguide/routes/r-tooltips.vue';
import googleMaps from '@/styleguide/routes/r-google-maps.vue';
import picture from '@/styleguide/routes/r-picture.vue';

declare module 'vue-router' {
  interface RouteMeta {
    title: string;
    params?: {
      [key: string]: string;
    };
    query?: {
      [key: string]: string;
    }
  }
}

export interface IRoute {
  path: string;
  name?: string;
  component?: ComponentPublicInstance | Record<string, unknown>;
  children?: IRoute[];
}

const root = '/styleguide';
const categoryWrapper = {
  template: '<router-view />',
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
    },
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
        },
      },
      {
        path: 'wysiwyg',
        name: 'wysiwyg',
        component: wysiwyg,
        meta: {
          title: 'WYSIWYG',
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
      {
        path: 'table',
        name: 'Table',
        component: table,
        meta: {
          title: 'Table',
        },
      },
      {
        path: 'google-maps',
        name: 'googleMaps',
        component: googleMaps,
        meta: {
          title: 'Google Maps',
        },
      },
      {
        path: 'image',
        name: 'Pictures',
        component: picture,
        meta: {
          title: 'Pictures',
        },
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: root,
  },
];
