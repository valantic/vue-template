import { sectionWrapper, styleguideRoot } from '@valantic/vue-styleguide/src/styleguide/setup/routes';
import button from '@/styleguide/demo-pages/elements/r-buttons.vue';
import loadingIndicator from '@/styleguide/demo-pages/elements/r-loading-indicator.vue';
import picture from '@/styleguide/demo-pages/elements/r-picture.vue';
import table from '@/styleguide/demo-pages/elements/r-table.vue';
import video from '@/styleguide/demo-pages/elements/r-video.vue';
import wysiwyg from '@/styleguide/demo-pages/elements/r-wysiwyg.vue';

export const routes = [
  {
    path: `${styleguideRoot}/elements`,
    name: 'elements',
    component: sectionWrapper,
    meta: {
      title: 'Elements',
    },
    children: [
      {
        path: 'e-wysiwyg',
        name: 'e-wysiwyg',
        component: wysiwyg,
        meta: {
          title: 'WYSIWYG',
        },
      },
      {
        path: 'e-button',
        name: 'e-button',
        component: button,
        meta: {
          title: 'Button',
        },
      },
      {
        path: 'e-picture',
        name: 'e-picture',
        component: picture,
        meta: {
          title: 'Picture',
        },
      },
      {
        path: 'e-table',
        name: 'e-table',
        component: table,
        meta: {
          title: 'Table',
        },
      },
      {
        path: 'e-video',
        name: 'e-video',
        component: video,
        meta: {
          title: 'Video',
        },
      },
      {
        path: 'e-loading-indicator',
        name: 'e-loading-indicator',
        component: loadingIndicator,
        meta: {
          title: 'Loading Indicator',
        },
      },
    ],
  },
];
