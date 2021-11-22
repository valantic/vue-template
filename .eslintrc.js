// https://eslint.org/docs/user-guide/configuring
const vueRules = require('eslint-config-valantic/plugins/vue');
const tsRules = require('eslint-config-valantic/plugins/typescript');

module.exports = {
  root: true,
  parserOptions: {
    requireConfigFile: false, // Fixes an exception on sub folder eslintrc.js files
    parser: '@typescript-eslint/parser', // Don't use on upper scope as documented by ESLint. The Vue plugin already defines itself as parser.
    sourceType: 'module',
  },
  env: {
    browser: true,
  },
  extends: [
    'valantic',
    'plugin:vue/vue3-recommended',
    '@vue/typescript',
  ],
  // required to lint *.vue files
  plugins: [
    'vue',
    // 'html' // eslint-plugin-html
  ],
  // Uses eslint-import-resolver-webpack
  settings: {
    'import/resolver': 'webpack',
  },
  // add your custom rules here
  rules: {
    ...vueRules,
    ...tsRules,
  },
  globals: {},
};
