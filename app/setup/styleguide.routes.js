import index from '../styleguide/routes/index';
import layout from '../styleguide/routes/layout';
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
    }
  },
  {
    path: `${root}/lazyload`,
    name: 'styleguideLazyload',
    component: lazyload,
    meta: {
      title: 'Lazyload'
    }
  },
  {
    path: `${root}/layout`,
    name: 'styleguideLayout',
    component: layout,
    meta: {
      title: 'Layout',
    }
  },
  {
    path: '*',
    redirect: root,
  }
];
