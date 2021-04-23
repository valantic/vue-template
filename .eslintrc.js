// https://eslint.org/docs/user-guide/configuring
const vueRules = require('eslint-config-valantic/plugins/vue');

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint', // Don't use on upper scope as documented by ESLint. The Vue plugin already defines itself as parser.
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
    'import/resolver': 'webpack',
  },
  // add your custom rules here
  rules: {
    ...vueRules,
    "vue/no-template-target-blank": ["error"],
    "vue/component-definition-name-casing": ["error", "kebab-case"], "vue/html-comment-content-spacing": ["error", "always"],
    "vue/no-duplicate-attr-inheritance": ["error"],
    "vue/no-unused-properties": ["error", {
      "groups": [
        "props",
        "data",
        "computed",
        "methods",
        "setup"
      ],
      "ignorePublicMembers": true,
    }],
    "vue/no-potential-component-option-typo": ["error"]
  },
  globals: {},
};
