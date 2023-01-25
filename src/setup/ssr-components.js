// SSR related
import lDefault from '@/layouts/l-default.vue';
import cHeader from '@/components/c-header.vue';
import cFooter from '@/components/c-footer.vue';

// Import style only 'components'.
require.context('@/components', false, /\.scss/);

export default {
  install(Vue) {
    const components = [
      // SSR related
      lDefault,
      cHeader,
      cFooter,
    ];

    components.forEach((component) => {
      Vue.component(component.name, component);
    });
  },
};
