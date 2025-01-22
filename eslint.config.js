import eslint from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintConfigValantic from 'eslint-config-valantic';
import tseslint from 'typescript-eslint';

// https://eslint.org/docs/user-guide/configuring
export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  eslintConfigValantic,
  eslintConfigPrettier,
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
      globals: {
        google: 'readonly', // Fixes `no-undef` for `google` namespace. (types are loaded by `@types/google.maps`)
      },
    },
    // Uses eslint-import-resolver-webpack
    settings: {
      'import/resolver': {
        vite: {
          configPath: './vite.config.ts',
        },
      },
    },
    // add your custom rules here
    rules: {
      // TODO: Fix and enable again
      'import/extensions': 'off',
    },
  },
  {
    files: ['tests/**/*.*'],
    rules: {
      'vue/require-name-property': 'off',
    },
  },
  {
    files: ['blueprints/**/*.*'],
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
  }
);
