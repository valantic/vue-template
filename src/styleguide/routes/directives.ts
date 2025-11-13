import { sectionWrapper, styleguideRoot } from '@valantic/vue-styleguide/src/styleguide/setup/routes';
import focusMask from '@/styleguide/demo-pages/directives/r-focus-mask.vue';

export const routes = [
  {
    path: `${styleguideRoot}/directives`,
    name: 'directives',
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
];
