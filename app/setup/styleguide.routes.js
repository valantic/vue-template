import index from '../styleguide/routes/index';
import lazyload from '../styleguide/routes/lazyload';
import links from '../styleguide/routes/links';

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
    path: `${root}/lazyload`,
    name: 'styleguideLazyload',
    component: lazyload,
    meta: {
      title: 'Lazyload',
    },
  },
  {
    path: `${root}/links`,
    name: 'styleguideLinks',
    component: links,
    meta: {
      title: 'Links',
    },
  },
  {
    path: '*',
    redirect: root,
  },
];
