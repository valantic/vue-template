import eslint from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier/flat';
import eslintConfigValantic from 'eslint-config-valantic/vue3.js';
import tseslint from 'typescript-eslint';

// https://eslint.org/docs/user-guide/configuring
export default [
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  ...eslintConfigValantic,
  eslintConfigPrettier,
  {
    ignores: ['dist/', 'node_modules/', 'public/', '**/.DS_Store'],
  },
  {
    languageOptions: {
      globals: {
        google: 'readonly', // Fixes `no-undef` for `google` namespace. (types are loaded by `@types/google.maps`)
      },
    },
    rules: {
      // TODO: Fix and enable again
      'import/extensions': 'off',
      'vue/no-unsupported-features': [
        'error',
        {
          version: '^3.5.0',
        },
      ],
    },
  },
  {
    files: ['*.vue', '**/*.vue'],
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser,
      },
    },
    rules: {
      'vue/multi-word-component-names': 'off',
      'vue/component-definition-name-casing': 'off',
    },
  },
  {
    files: ['src/styleguide/**/*.*'],
    ignores: ['**/*.svg', '**/*.scss'],
    rules: {
      'vue/no-bare-strings-in-template': 'off',
      'vue/multi-word-component-names': 'off',
      'vue/match-component-file-name': 'off',
    },
  },
];
