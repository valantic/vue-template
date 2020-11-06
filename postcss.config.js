module.exports = { // @see https://webpack.js.org/loaders/postcss-loader/#examples-of-config-files
  // Browser config is fetched from package.json:browserslist
  map: false,
  plugins: [
    'autoprefixer',
    ['cssnano', { // @see https://cssnano.co/docs/optimisations
      preset: [
        'default',
        {
          calc: false,
        },
      ],
    }],
  ],
};
