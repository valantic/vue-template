module.exports = {
  // @see https://webpack.js.org/loaders/postcss-loader/#examples-of-config-files
  // Browser config is fetched from package.json:browserslist
  map: false,
  plugins: [
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    require('autoprefixer'),
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    require('cssnano')({
      preset: [
        'default',
        {
          calc: false, // The precision of SCSS calculations was too low, so we decided to keep calc() in the output to increase the precision.
        },
      ],
    }),
  ],
};
