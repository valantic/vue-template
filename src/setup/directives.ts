import { Plugin } from 'vue';
import { ICustomDirective } from '@/types/custom-directive';

const directives = import.meta.glob('../directives/*.ts', { eager: true, import: 'default' }) as Record<string, ICustomDirective>;

const plugin: Plugin = {
  install(app) {
    Object.values(directives).forEach((module) => {
      app.directive(module.name, module.directive);
    });
  },
};

export default plugin;
