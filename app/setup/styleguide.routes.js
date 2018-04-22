import index from '../styleguide/routes/index';
import lDefault from '../components/l-default';
import lazyload from '../styleguide/routes/lazyload';
import panels from '../styleguide/routes/panels';

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
    component: lDefault,
    meta: {
      title: 'Layout',
    }
  },
  {
    path: `${root}/panels`,
    name: 'styleguidePanels',
    component: panels,
    meta: {
      title: 'Panels',
    }
  },
  {
    path: '*',
    redirect: root,
  }
];
