// It's mandatory that common styles are imported before the application. Else they will come last in the CSS build
// NOTE: this is not working for styleguidist. There you need to add style imports to the required configuration
import './setup/_scss.scss';

import Vue from 'vue'; // eslint-disable-line import/first
import options from './setup/options';
import components from './setup/components';

import './setup/plugins';

let vueOptions = options;

Vue.config.productionTip = false;

Vue.use(components);

if (process.env.NODE_ENV !== 'production' || process.env.HAS_STYLEGUIDE) {
  // eslint-disable-next-line global-require
  vueOptions = Object.assign(vueOptions, require('./setup/styleguide.options').default); // Note: will overwrite duplicates
}

window.vm = new Vue(vueOptions);
