import index from '../styleguide/routes/index';
import lDefault from '../components/l-default';
import productDetail from '../styleguide/routes/product-detail';
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
    component: lDefault,
    meta: {
      title: 'Layout',
    }
  },
  {
    path: `${root}/product-detail`,
    name: 'styleguideProductDetail',
    component: productDetail,
    meta: {
      title: 'Product Detail',
    }
  },
  {
    path: '*',
    redirect: root,
  }
];
