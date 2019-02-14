const { theme, styles } = require('./app/setup/styleguide.styles');
const path = require('path');

module.exports = {
  renderRootJsx: path.join(__dirname, 'app/setup/styleguidist/root.js'),
  defaultExample: 'app/setup/styleguide.fallback.md',
  components: 'app/components/**/*.vue',
  styleguideDir: 'dist/styleguidist',
  usageMode: 'collapse',
  previewDelay: 0, // This is already done by editor.
  pagePerSection: true,
  sections: [
    {
      name: 'Welcome',
      content: '',
      sections: [
        {
          name: 'Informations',
          content: 'app/styleguide/core/welcome/information.md',
        },
        {
          name: 'Status labels',
          content: 'app/styleguide/core/welcome/status-label.md',
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
        },
        {
          name: 'Global styles',
          content: 'app/styleguide/core/global-styles/global-styles.md',
        },
      ]
    },
    {
      name: 'Plugins',
      content: '',
      sections: [
        {
          name: 'Vuetify',
          content: 'app/styleguide/core/vuetify/vuetify.md',
        },
        {
          name: 'Tabs',
          content: 'app/styleguide/core/plugins/tabs.md',
        },
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
  require: [
    '@babel/polyfill', // In vue application imported by webpack. Was not supported by vue-styleguidist
    path.join(__dirname, 'app/setup/_scss.scss'), // In vue application imported by main.js. Was not supported by vue-styleguidist
    path.join(__dirname, 'app/setup/vuetify/main.styl'), // In vue application imported by main.js. Was not supported by vue-styleguidist
    path.join(__dirname, 'app/setup/styleguidist/style.scss'),
    // Style only components
    path.join(__dirname, 'app/components/c-form.scss'),
    path.join(__dirname, 'app/components/c-tabs.scss'),
    path.join(__dirname, 'app/setup/styleguidist/required.js'),
  ],
  webpackConfig(env) {
    return require('./webpack.config')({
      production: env === 'production',
      styleguide: true
    })
  },
  ignore: [
    '**/components/s-palette-item.vue',
    '**/components/s-color-item.vue',
    '**/components/l-default.vue',
    '**/components/s-layout.vue',
    '**/components/c-swiper-modal.vue',
    '**/components/s-demo-settings.vue',
    '**/components/s-navigation.vue',
    '**/components/s-toggle.vue',
  ],
  theme,
  styles,
};
