import index from '../styleguide/routes/index';
import sandbox from '../styleguide/routes/sandbox';
import lDefault from '../components/l-default';
import forms from '../styleguide/routes/forms';

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
    path: `${root}/sandbox`,
    name: 'sandbox',
    component: sandbox,
    meta: {
      title: 'Sandbox',
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
    path: `${root}/forms`,
    name: 'styleguideForms',
    component: forms,
    meta: {
      title: 'Forms',
    },
  },
  {
    path: '*',
    redirect: root,
  },
];
