// https://eslint.org/docs/user-guide/configuring
module.exports = {
  root: true,
  parserOptions: {
    requireConfigFile: false,
    // Fixes an exception on sub folder eslintrc.js files
    parser: '@typescript-eslint/parser',
    // Don't use on upper scope as documented by ESLint. The Vue plugin already defines itself as parser.
    sourceType: 'module',
  },
  env: {
    browser: true,
  },
  extends: [
    'valantic/vue3',
    '@vue/typescript',
    'plugin:storybook/recommended',
  ],
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
    'vue/no-unsupported-features': ['error', {
      version: '>= 3.2',
    }],
    // Fix and enable again
    'import/extensions': 'off',
    'vue/require-emit-validator': 'off',
    // TODO: move to eslint-config-valantic
    'space-before-function-paren': ['error', {
      anonymous: 'never',
      named: 'never',
      asyncArrow: 'always',
    }],
    'max-lines': ['error', {
      max: 1000,
      skipBlankLines: true,
      skipComments: true,
    }],
    '@typescript-eslint/no-empty-interface': ['error', {
      allowSingleExtends: true,
    }],
    'no-undefined': 'off', // Conflicts with 'undefined' fallback of TypeScript definitions.
    '@typescript-eslint/explicit-function-return-type': ['error', {
      allowTypedFunctionExpressions: true,
    }],
  },
  overrides: [{
    files: ['tests/**/*.*'],
    env: {
      jest: true,
    },
    rules: {
      'vue/require-name-property': 'off',
    },
  }, {
    files: ['blueprints/**/*.*'],
    env: {
      jest: true, // Is required because of unit test blueprint.

    },
    rules: {
      '@typescript-eslint/no-unused-vars': 'off',
      // Allow unused variables in blueprints.
      '@typescript-eslint/no-empty-interface': 'off', // Allow empty interfaces in blueprints.
      '@typescript-eslint/explicit-function-return-type': 'off',

    },
  }, {
    files: ['src/styleguide/**/*.*'],
    rules: {
      'vue/no-bare-strings-in-template': 'off',
      'vue/multi-word-component-names': 'off',
      'vue/match-component-file-name': 'off',
    },
  }, {
    files: ['src/stories/**/*.*'],
    rules: {
      '@typescript-eslint/explicit-function-return-type': 'off',
    },
  }],
};
