const directives = process.env.NODE_ENV === 'production'
  ? require.context('../directives/', true, /\.(js)$/i)
  : require.context('../directives/', true, /^(?!dev\.).*?\.(js)$/i);

export default {
  install(Vue) {
    directives
      .keys()
      .forEach(key => Vue.directive(directives(key).default.name, directives(key).default));
  },
};
