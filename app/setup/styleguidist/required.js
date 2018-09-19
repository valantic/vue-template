import Vue from 'vue';
import components from '@/setup/components';
import directives from '@/setup/directives';

// Polyfills and self executing
import '@/setup/styleguide.options';
import '@/setup/plugins';

Vue.use(directives);
Vue.use(components);
