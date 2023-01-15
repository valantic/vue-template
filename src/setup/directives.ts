import { Plugin } from 'vue';

const directives = import.meta.glob('../directives/*.ts', { eager: true, import: 'default' });

const plugin: Plugin = {
  install(app) {
    Object.values(directives).forEach((module) => {
      app.directive(module.name, module);
    });
  },
};

export default plugin;
