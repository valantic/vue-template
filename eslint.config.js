import eslint from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintConfigValantic from 'eslint-config-valantic';
import tseslint from 'typescript-eslint';

// https://eslint.org/docs/user-guide/configuring
export default tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.recommended,
  eslintConfigPrettier,
  eslintConfigValantic,
  {
    ignores: ['dist/', 'node_modules/', 'public/'],
  },
  {
    files: ['*.js', '*.ts', '*.vue'],
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
    rules: {},
  }
);
