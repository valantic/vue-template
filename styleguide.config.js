const { theme, styles } = require('./app/setup/styleguide.styles');
const path = require('path');

module.exports = {
  webpackConfig(env) {
    return require('./webpack.config')({
      production: env === 'production',
      styleguide: true
    })
  },
  renderRootJsx: path.join(__dirname, 'app/setup/styleguidist/root.js'),
  require: [
    'babel-polyfill', // In vue application imported by webpack. Was not supported by vue-styleguidist
    path.join(__dirname, 'app/setup/_scss.scss'), // In vue application imported by main.js. Was not supported by vue-stylgudist
    path.join(__dirname, 'app/setup/styleguidist/style.scss'),
    path.join(__dirname, 'app/setup/styleguidist/required.js'),
  ],
  defaultExample: 'app/setup/styleguide.fallback.md',
  components: 'app/components/**/*.vue',
  styleguideDir: 'dist/styleguidist',
  showUsage: false,
  vuex: './app/store/index',
  sections: [
    {
      name: 'Welcome',
      content: '',
      sections: [
        {
          name: 'Informations',
          content: 'app/styleguide/core/index.md',
          components: 'app/styleguide/components/s-theme-selector.vue',
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
    'app/setup/styleguidist/mixins.js'
  ],
  ignore: [
    '**/components/s-palette-item.vue',
    '**/components/s-color-item.vue',
    '**/components/l-default.vue',
    '**/components/c-header.vue',
    '**/components/c-footer.vue',
    '**/components/s-layout.vue',
    '**/components/c-social-media.vue',
    '**/components/c-attribute-grid-items.vue',
  ],
  theme,
  styles,
};
