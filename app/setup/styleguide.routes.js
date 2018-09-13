import index from '../styleguide/routes/index';
import lDefault from '../components/l-default';
import lazyload from '../styleguide/routes/lazyload';
import headings from '../styleguide/routes/headings';
import panels from '../styleguide/routes/panels';
import buttons from '../styleguide/routes/buttons';
import forms from '../styleguide/routes/forms';
import collapse from '../styleguide/routes/collapse';
import modals from '../styleguide/routes/modals';
import swiper from '../styleguide/routes/swiper';
import notifications from '../styleguide/routes/notifications';
import tabExample from '../styleguide/routes/tab-example';
import tables from '../styleguide/routes/tables';

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
    path: `${root}/headings`,
    name: 'styleguideHeadings',
    component: headings,
    meta: {
      title: 'Headings',
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
    path: `${root}/forms`,
    name: 'styleguideForms',
    component: forms,
    meta: {
      title: 'Forms',
    },
  },
  {
    path: `${root}/buttons`,
    name: 'styleguideButtons',
    component: buttons,
    meta: {
      title: 'Buttons',
    }
  },
  {
    path: `${root}/collapse`,
    name: 'styleguideCollapse',
    component: collapse,
    meta: {
      title: 'Collapse',
    }
  },
  {
    path: `${root}/modals`,
    name: 'styleguideModals',
    component: modals,
    meta: {
      title: 'Modals',
    }
  },
  {
    path: `${root}/swiper`,
    name: 'styleguideSwiper',
    component: swiper,
    meta: {
      title: 'Swiper',
    }
  },
  {
    path: `${root}/notifications`,
    name: 'styleguideNotifications',
    component: notifications,
    meta: {
      title: 'Notifications',
    }
  },
  {
    path: `${root}/tabs`,
    name: 'Tabs',
    component: tabExample,
    meta: {
      title: 'Tabs',
    }
  },
  {
    path: `${root}/tables`,
    name: 'Tables',
    component: tables,
    meta: {
      title: 'Tables',
    }
  },
  {
    path: '*',
    redirect: root,
  },
];
