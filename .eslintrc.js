// https://eslint.org/docs/user-guide/configuring
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
    'valantic/vue3',
  ],
  // Uses eslint-import-resolver-webpack
  settings: {
    'import/resolver': 'webpack',
  },
  // add your custom rules here
  rules: {
    'vue/no-unsupported-features': ['error', {
      version: ">= 3.2",
    }],

    // Fix and enable again
    'global-require': 'off',
    'indent': 'off',
    'vue/html-closing-bracket-newline': 'off',
    '@typescript-eslint/ban-ts-comment': 'off', // TODO: check if it is ok to disable this one
    'vue/component-options-name-casing': 'off',
    'import/extensions': 'off',
    'vue/require-emit-validator': 'off',
    '@typescript-eslint/no-inferrable-types': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    'vue/prefer-import-from-vue': 'off',
    'vue/no-v-text-v-html-on-component': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
  },
  overrides: [
    {
      'files': ['tests/**/*.*'],
      'rules': {
        'vue/require-name-property': 'off'
      }
    }
  ]
};
