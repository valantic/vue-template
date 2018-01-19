// https://eslint.org/docs/user-guide/configuring

// TODO: review

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  extends: 'airbnb-base',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // Uses eslint-import-resolver-webpack
  settings: {
    'import/resolver': {
      webpack: {
        config: { // Using the webpack.config.js instead caused console noise and liniting issues
          resolve: {
            extensions: [
              '.js',
              '.vue'
            ]
          }
        }
      }
    }
  },
  // add your custom rules here
  rules: {
    // don't require .vue extension when importing
    'import/extensions': [0, 'always', {
      js: 'never',
      vue: 'never'
    }],
  },
  globals: {
    'WP_STYLEGUIDE': false,
    'WP_PRODUCTION': false
  }
};
