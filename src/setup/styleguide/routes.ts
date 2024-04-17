import { ComponentPublicInstance } from 'vue';
import lDefault from '@/layouts/l-default.vue';
import consent from '@/styleguide/routes/components/r-consent.vue';
import googleMaps from '@/styleguide/routes/components/r-google-maps.vue';
// Components
import notifications from '@/styleguide/routes/components/r-notifications.vue';
import picture from '@/styleguide/routes/components/r-picture.vue';
import table from '@/styleguide/routes/components/r-table.vue';
import tooltips from '@/styleguide/routes/components/r-tooltips.vue';
import video from '@/styleguide/routes/components/r-video.vue';
// Directives
import focusMask from '@/styleguide/routes/directives/r-focus-mask.vue';
import index from '@/styleguide/routes/r-index.vue';
import forms from '@/styleguide/routes/sandbox/r-forms.vue';
import icons from '@/styleguide/routes/sandbox/r-icons.vue';
// Sandbox
import sandbox from '@/styleguide/routes/sandbox/r-sandbox.vue';
import wysiwyg from '@/styleguide/routes/sandbox/r-wysiwyg.vue';

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

export type Route = {
  path: string;
  name?: string;
  component?: ComponentPublicInstance | Record<string, unknown>;
  children?: Route[];
};

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
    ],
  },
  {
    path: `${root}/layouts`,
    name: 'layoutsWrapper',
    redirect: `${root}/layouts/index`,
    component: categoryWrapper,
    meta: {
      title: 'Layouts',
    },
    children: [
      {
        path: 'layout',
        name: 'Default layout',
        component: lDefault,
        meta: {
          title: 'Layout',
        },
      },
    ],
  },
  {
    path: `${root}/components`,
    name: 'componentsWrapper',
    redirect: `${root}/components/index`,
    component: categoryWrapper,
    meta: {
      title: 'Components',
    },
    children: [
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
      {
        path: 'video',
        name: 'Video',
        component: video,
        meta: {
          title: 'Videos',
        },
      },
      {
        path: 'cookie-consent',
        name: 'Cookie consent',
        component: consent,
        meta: {
          title: 'Cookie consent',
        },
      },
    ],
  },
  {
    path: `${root}/directives`,
    name: 'directivesWrapper',
    redirect: `${root}/directives/index`,
    component: categoryWrapper,
    meta: {
      title: 'Directives',
    },
    children: [
      {
        path: 'focus-mask',
        name: 'Focus mask',
        component: focusMask,
        meta: {
          title: 'Focus mask',
        },
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: root,
  },
];
