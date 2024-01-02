import { Plugin } from 'vue';
import { CustomDirective } from '@/types/custom-directive';

const directives = import.meta.glob('../directives/*.ts', { eager: true, import: 'default' }) as Record<string, CustomDirective>;

const plugin: Plugin = {
  install(app) {
    Object.values(directives).forEach((module) => {
      app.directive(module.name, module);
    });
  },
};

export default plugin;
