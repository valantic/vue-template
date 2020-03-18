const path = require('path');
const { theme, styles } = require('./src/setup/styleguide.styles');

const productiveTemplateCustomization = { // @see https://vue-styleguidist.github.io/Configuration.html#template
  head: {
    links: [
      {
        rel: 'stylesheet',
        href: 'assets/css/app.vendor.css',
      },
      {
        rel: 'stylesheet',
        href: 'assets/css/app.main.css',
      },
    ],
  },
};

module.exports = {
  renderRootJsx: path.join(__dirname, 'src/setup/styleguidist/root.js'),
  defaultExample: 'src/setup/styleguide.fallback.md',
  components: 'src/components/**/*.vue',
  styleguideDir: 'dist/styleguidist',
  previewDelay: 0, // This is already done by editor.
  pagePerSection: true,
  copyCodeButton: true,
  theme,
  styles,
  template: process.env.NODE_ENV === 'production'
    ? productiveTemplateCustomization
    : undefined,
  require: [
    'core-js/stable', // Normally used on webpack entry point but was not supported by vue-styleguidist
    path.join(__dirname, 'src/setup/styleguidist/required.js'),
  ],
  webpackConfig(env) {
    return require('./webpack.config')({
      mode: env,
    }, {
      styleguide: true,
    });
  },
  ignore: [
    '**/components/s-palette-item.vue',
    '**/components/s-color-item.vue',
    '**/components/l-default.vue',
    '**/components/s-layout.vue',
    '**/components/s-demo-settings.vue',
    '**/components/s-navigation.vue',
    '**/components/s-toggle.vue',
  ],
  sections: [
    {
      name: 'Welcome',
      content: '',
      sections: [
        {
          name: 'Informations',
          content: 'src/styleguide/core/welcome/information.md',
        },
        {
          name: 'Status labels',
          content: 'src/styleguide/core/welcome/status-label.md',
        },
      ],
    },
    {
      name: 'Core',
      content: '',
      sections: [
        {
          name: 'Typography',
          content: 'src/styleguide/core/typography/typography.md',
        },
        {
          name: 'Grid',
          content: 'src/styleguide/core/grid/grid.md',
        },
        {
          name: 'Z-Index',
          content: 'src/styleguide/core/z-index/z-index.md',
        },
        {
          name: 'Spacing',
          content: 'src/styleguide/core/spacing/spacing.md',
        },
        {
          name: 'Global styles',
          content: 'src/styleguide/core/global-styles/global-styles.md',
        },
      ],
    },
    // {
    //   name: 'Plugins',
    //   content: '',
    //   sections: [
    //     {
    //       name: 'Vuetify',
    //       content: 'src/styleguide/core/....md',
    //     },
    //   ],
    // },
    {
      name: 'Elements',
      components: 'src/components/**/e-*.vue',
    },
    {
      name: 'Components',
      components: 'src/components/**/c-*.vue',
    },
    {
      name: 'Styleguide',
      components: 'src/styleguide/components/!(s-readme).vue',
    },
  ],
};
