const { theme, styles } = require('./app/setup/styleguide.styles');
const path = require('path');

module.exports = {
  webpackConfig(env) {
    return require('./webpack.config')({
      production: env === 'production',
      styleguide: true
    })
  },
  require: [
    // NOTE: for the application this is imported in main.js. Unfortunatley the styleguidist does not support this, so we need
    // to import the global styles here as well.
    path.join(__dirname, 'app/setup/_scss.scss'),
    path.join(__dirname, 'app/styleguide/core/css/styleguide-custom.scss'),
  ],
  defaultExample: 'app/setup/styleguide.fallback.md',
  components: 'app/components/**/*.vue',
  styleguideDir: 'dist/styleguidist',
  showUsage: false,
  sections: [
    {
      name: 'Welcome',
      content: '',
      sections: [
        {
          name: 'Informations',
          content: 'app/styleguide/components/s-welcome.md',
        }
      ]
    },
    {
      name: 'Core',
      content: '',
      sections: [
        {
          name: 'Typography',
          content: 'app/styleguide/core/typography/typography.md',
        },
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
      components: 'app/styleguide/components/!(s-readme).vue',
    },
  ],
  mixins: [
    'app/setup/styleguidist.js'
  ],
  ignore: [
    '**/components/s-palette-item.vue',
    '**/components/s-color-item.vue',
    '**/components/l-default.vue',
    '**/components/c-header.vue',
    '**/components/c-footer.vue',
    '**/components/s-layout.vue'
  ],
  theme,
  styles
};
