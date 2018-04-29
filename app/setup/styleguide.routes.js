import index from '../styleguide/routes/index';
import lDefault from '../components/l-default';
import lazyload from '../styleguide/routes/lazyload';
import attributegrid from '../styleguide/routes/attributegrid';

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
    path: `${root}/attributegrid`,
    name: 'styleguideAttributegrid',
    component: attributegrid,
    meta: {
      title: 'Attributegrid'
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
    component: lDefault,
    meta: {
      title: 'Layout',
    }
  },
  {
    path: '*',
    redirect: root,
  }
];
