import { sectionWrapper, styleguideRoot } from '@valantic/vue-styleguide/src/styleguide/setup/routes';
import consent from '@/styleguide/demo-pages/components/r-consent.vue';
import googleMaps from '@/styleguide/demo-pages/components/r-google-maps.vue';

export const routes = [
  {
    path: `${styleguideRoot}/components`,
    name: 'components',
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
];
