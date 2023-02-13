import { Plugin } from 'vue';

// SSR related
import lDefault from '@/layouts/l-default.vue';
import cHeader from '@/components/c-header.vue';
import cFooter from '@/components/c-footer.vue';

const plugin: Plugin = {
  install(app) {
    const components = [
      // SSR related
      lDefault,
      cHeader,
      cFooter,
    ];

    components.forEach((component) => {
      app.component(component.name, component);
    });
  },
};

export default plugin;
