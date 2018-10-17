module.exports = function (api) {
  const presets = [
    ['@babel/preset-env', { modules: false }],
  ];
  const plugins = [
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-syntax-object-rest-spread',
    ['transform-imports', {
      vuetify: {
        transform: 'vuetify/es5/components/${member}',
        preventFullImport: true,
      }
    }]
  ];
  const env = {
    development: {
      plugins: ['transform-es2015-modules-commonjs']
    },
    test: {
      presets: ['env'],
      plugins: ['transform-es2015-modules-commonjs', 'dynamic-import-node']
    }
  };

  api.cache(true);

  return {
    presets,
    plugins,
    env
  };
};

