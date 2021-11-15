import { Plugin } from 'vue';

const directives = process.env.NODE_ENV === 'production'
  ? require.context('../directives/', true, /\.(ts)$/i)
  : require.context('../directives/', true, /^(?!dev\.).*?\.(ts)$/i);

const plugin: Plugin = {
  install(app) {
    directives
      .keys()
      .forEach(key => app.directive(directives(key).default.name, directives(key).default));
  }
};

export default plugin;
