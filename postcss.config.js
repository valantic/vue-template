module.exports = {
  // Browser config is fetched from package.json:browserslist
  map: false,
  plugins: [
    'autoprefixer',
    ['cssnano', {
      preset: [
        'default',
        {
          calc: false,
        },
      ],
    }],
  ],
};
