import Vue from 'vue';
import './setup/_scss.scss';
import options from './setup/options';
import components from './setup/components';

let vueOptions = options;

Vue.config.productionTip = false;

Vue.use(components);

if (process.env.NODE_ENV !== 'production' || process.env.HAS_STYLEGUIDE) {
  // eslint-disable-next-line global-require
  vueOptions = Object.assign(vueOptions, require('./setup/styleguide.options').default); // Note: will overwrite duplicates

  // eslint-disable-next-line global-require
  // require('./setup/mock').default(plugins.vueAxios.axios, developmentOptions);
}

// eslint-disable-next-line no-new
window.vm = new Vue(vueOptions);
