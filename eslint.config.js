import typescriptParser from '@typescript-eslint/parser';
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintConfigValantic from 'eslint-config-valantic';
import eslintConfigTypescript from '@vue/eslint-config-typescript';
import eslintPluginStorybook from 'eslint-plugin-storybook';
import globals from 'globals';

// https://eslint.org/docs/user-guide/configuring
export default [
  {
    files: ['*.js', '*.ts', '*.vue'],
    ignores: [
      '/dist/',
      '#/*.js',
      '#/*.ts',
      '#/test/unit/coverage/',
      '/node_modules/',
      '#/blueprints',
      '#/src/setup/lib',
      '!.storybook',
    ],
    languageOptions: {
      parser: typescriptParser,
      globals: {
        ...globals.browser,
      },
      parserOptions: {
        requireConfigFile: false,
        // Fixes an exception on sub folder eslintrc.js files
        // Don't use on upper scope as documented by ESLint. The Vue plugin already defines itself as parser.
        sourceType: 'module',
      },
    },
    ...eslintConfigValantic,
    eslintConfigTypescript,
    eslintConfigPrettier,
    eslintPluginStorybook,
    // Uses eslint-import-resolver-webpack
    settings: {
      'import/resolver': {
        vite: {
          configPath: './vite.config.ts',
        },
      },
    },
    globals: {
      google: 'readonly', // Fixes `no-undef` for `google` namespace. (types are loaded by `@types/google.maps`)
    },
    // add your custom rules here
    rules: {
      'vue/no-unsupported-features': [
        'error',
        {
          version: '>= 3.2',
        },
      ],

      // TODO: Fix and enable again
      'import/extensions': 'off',
    },
    overrides: [
      {
        files: ['tests/**/*.*'],
        env: {
          jest: true,
        },
        rules: {
          'vue/require-name-property': 'off',
        },
      },
      {
        files: ['blueprints/**/*.*'],
        env: {
          jest: true, // Is required because of unit test blueprint.
        },
        rules: {
          // Allow unused variables in blueprints.
          '@typescript-eslint/no-unused-vars': 'off',
          // Allow empty interfaces in blueprints.
          '@typescript-eslint/no-empty-interface': 'off',
          '@typescript-eslint/explicit-function-return-type': 'off',
        },
      },
      {
        files: ['src/styleguide/**/*.*'],
        rules: {
          'vue/no-bare-strings-in-template': 'off',
          'vue/multi-word-component-names': 'off',
          'vue/match-component-file-name': 'off',
        },
      },
      {
        files: ['src/stories/**/*.*'],
        rules: {
          '@typescript-eslint/explicit-function-return-type': 'off',
        },
      },
    ],
  },
];
