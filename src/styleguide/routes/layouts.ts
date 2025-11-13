import { sectionWrapper, styleguideRoot } from '@valantic/vue-styleguide/src/styleguide/setup/routes';
import lDefault from '@/layouts/l-default.vue';

export const routes = [
  {
    path: `${styleguideRoot}/layouts`,
    name: 'layouts',
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
];
