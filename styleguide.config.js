

module.exports = {
  webpackConfig(env) {
    return require('./webpack.config')({
      production: env === 'production',
      styleguide: true
    })
  },
  defaultExample: 'app/setup/styleguide.fallback.md',
  components: 'app/components/**/*.vue',
  styleguideDir: 'dist/styleguidist',
  showUsage: false,
  sections: [
    {
      name: 'Elements',
      components: 'app/components/**/e-*.vue',
    },
    {
      name: 'Components',
      components: 'app/components/**/c-*.vue',
    },
    {
      name: 'Styleguide',
      components: 'app/styleguide/components/!(s-readme).vue',
    },
  ],
  mixins: [
    'app/setup/styleguidist.js'
  ],
};
