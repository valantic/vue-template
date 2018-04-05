const { theme, styles } = require('./app/setup/styleguide.styles');

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
      name: 'Core',
      content: 'app/styleguide/core/core.md',
      sections: [
        {
          name: 'Grid',
          content: 'app/styleguide/core/grid/grid.md',
        },
        {
          name: 'Z-Index',
          content: 'app/styleguide/core/z-index/z-index.md',
        },
        {
          name: 'Spacing',
          content: 'app/styleguide/core/spacing/spacing.md',
        }
      ]
    },
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
      components: 'app/styleguide/components/*.vue',
    },
  ],
  mixins: [
    'app/setup/styleguidist.js'
  ],
  ignore: [
    '**/components/s-color-list-item.vue'
  ],
  theme,
  styles
};
