// https://eslint.org/docs/user-guide/configuring
const vueRules = require('eslint-config-valantic/plugins/vue');

const tsRules = { // TODO: move to config package.
  'no-shadow': 'off',
  '@typescript-eslint/no-shadow': 'error',
  '@typescript-eslint/no-explicit-any': [2, {
    fixToUnknown: false,
    ignoreRestArgs: true,
  }],
  'require-jsdoc': 0, // TODO is deprecated, see https://eslint.org/blog/2018/11/jsdoc-end-of-life
  'valid-jsdoc': 0, // TODO is deprecated, see https://eslint.org/blog/2018/11/jsdoc-end-of-life
}

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
    'plugin:vue/recommended',
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
