import Vue from 'vue';
import plugins from './plugins';
import components from './components';

Vue.use(plugins);
Vue.use(components);

// require('./mock').default(plugins.vueAxios.axios);
