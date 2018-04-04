import index from '../styleguide/routes/index';
import example from '../styleguide/routes/example';
import lazyload from '../styleguide/routes/lazyload';

const root = '/styleguide';

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
    path: `${root}/example`,
    name: 'styleguideExample',
    component: example,
    meta: {
      title: 'Example',
    },
  },
  {
    path: `${root}/lazyload`,
    name: 'styleguideLazyload',
    component: lazyload,
    meta: {
      title: 'Lazyload',
    },
  },
  {
    path: '*',
    redirect: root,
  },
];
