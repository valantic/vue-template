import Vue from 'vue';
import components from '@/setup/components';

// Polyfills and self executing
import '@/setup/styleguide.options';
import '@/setup/plugins';

Vue.use(components);
