import Vue from 'vue';
import plugins from './setup/plugins';
import options from './setup/options';
import components from './setup/components';

let vueOptions = options;

Vue.config.productionTip = false;

Vue.use(components);
Vue.use(plugins);

if (!WP_PRODUCTION || WP_STYLEGUIDE) {
  // eslint-disable-next-line global-require
  vueOptions = Object.assign(vueOptions, require('./setup/options.dev').default); // Note: will overwrite duplicates

  // eslint-disable-next-line global-require
  // require('./setup/mock').default(plugins.vueAxios.axios, developmentOptions);
}

// eslint-disable-next-line no-new
window.vm = new Vue(vueOptions);
