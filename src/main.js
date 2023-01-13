// It's mandatory that common styles are imported before the application. Else they will come last in the CSS build
// NOTE: this is not working for styleguidist. There you need to add style imports to the required configuration
import './setup/_scss.scss';

import Vue from 'vue'; // eslint-disable-line import/first
import options from './setup/options';
import directives from './setup/directives';
import components from './setup/components-global';

import './setup/plugins';
import getUrlParameter from './helpers/get-url-parameter';

Vue.config.devtools = process.env.NODE_ENV !== 'production' || process.env.HAS_WATCHER;
Vue.config.performance = process.env.NODE_ENV !== 'production'; // NOTE: currently failing with watcher.
Vue.config.productionTip = false;

let vueOptions = options;

Vue.use(directives);
Vue.use(components);

// Merge development configuration
if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require
  vueOptions = Object.assign(vueOptions, require('./setup/styleguide.options').default); // Note: will overwrite duplicates
}

const vm = new Vue(vueOptions);

vm.$mount('#app');

// Set theme according to url in development. e.g. ?theme=01
if (process.env.NODE_ENV !== 'production') {
  const themeId = getUrlParameter('theme');

  if (themeId) {
    vm.$store.commit('session/setTheme', themeId);
  }
}
