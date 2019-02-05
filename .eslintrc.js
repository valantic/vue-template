// https://eslint.org/docs/user-guide/configuring
const webpackConfig = require('./webpack.config');
const vueRules = require('eslint-config-valantic/plugins/vue');

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module',
  },
  env: {
    browser: true,
  },
  extends: [
    'valantic',
    'plugin:vue/recommended',
  ],
  // required to lint *.vue files
  plugins: [
    'vue',
    // 'html' // eslint-plugin-html
  ],
  // Uses eslint-import-resolver-webpack
  settings: {
    'import/resolver': {
      webpack: {
        config: { // Linking the webpack.config.js instead caused console noise and linting issues
          resolve: webpackConfig().resolve
        }
      }
    }
  },
  // add your custom rules here
  rules: {
    ...vueRules,
    'require-jsdoc': [2, {
      require: {
        FunctionDeclaration: true,
        MethodDefinition: true,
        ClassDeclaration: true,
        ArrowFunctionExpression: true,
        FunctionExpression: false
      }
    }],

    // don't require .vue extension when importing
    'import/extensions': [0, 'always', {
      js: 'never',
      vue: 'never'
    }]
  },
  globals: {
  }
};
