import { sectionWrapper, styleguideRoot } from '@valantic/vue-styleguide/src/styleguide/setup/routes';
import lDefault from '@/layouts/l-default.vue';
import consent from '@/styleguide/demo-pages/components/r-consent.vue';
import googleMaps from '@/styleguide/demo-pages/components/r-google-maps.vue';
// Components
// Directives
import focusMask from '@/styleguide/demo-pages/directives/r-focus-mask.vue';
import index from '@/styleguide/demo-pages/r-index.vue';
import { routes as elementRoutes } from '@/styleguide/routes/elements';
// Sandbox
import { routes as generalRoutes } from '@/styleguide/routes/general';

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

/**
 * This file is only meant for style-example routes
 */
export default [
  {
    path: styleguideRoot,
    name: 'index',
    component: index,
    meta: {
      title: 'Welcome',
    },
  },
  ...generalRoutes,
  ...elementRoutes,
  {
    path: `${styleguideRoot}/layouts`,
    name: 'layoutsWrapper',
    redirect: `${styleguideRoot}/layouts/index`,
    component: sectionWrapper,
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
    path: `${styleguideRoot}/components`,
    name: 'componentsWrapper',
    redirect: `${styleguideRoot}/components/index`,
    component: sectionWrapper,
    meta: {
      title: 'Components',
    },
    children: [
      {
        path: 'google-maps',
        name: 'googleMaps',
        component: googleMaps,
        meta: {
          title: 'Google Maps',
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
    path: `${styleguideRoot}/directives`,
    name: 'directivesWrapper',
    redirect: `${styleguideRoot}/directives/index`,
    component: sectionWrapper,
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
    redirect: styleguideRoot,
  },
];
