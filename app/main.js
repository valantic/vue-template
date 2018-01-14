import Vue from 'vue';
import plugins from './setup/plugins';
import cIcon from './components/c-icon.vue';

// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  components: {
    cIcon,
  },
});
