const path = require('path');
const { theme, styles } = require('./src/setup/styleguide.styles');

module.exports = {
  renderRootJsx: path.join(__dirname, 'src/setup/styleguidist/root.js'),
  defaultExample: 'src/setup/styleguide.fallback.md',
  components: 'src/components/**/*.vue',
  styleguideDir: 'dist/styleguidist',
  previewDelay: 0, // This is already done by editor.
  pagePerSection: true,
  copyCodeButton: true,
  theme,
  styles, // Production build seemed to ignore the styles. Because of that I forced the development environment for the build.
  require: [
    'core-js/stable', // Normally used on webpack entry point but was not supported by vue-styleguidist
    path.join(__dirname, 'src/setup/styleguidist/required.js'),
  ],
  webpackConfig(env) {
    return require('./webpack.config')({
      mode: env,
    }, {
      styleguideBuild: env === 'production', // In 'development' we always expect the styleguide.
    });
  },
  ignore: [
    '**/components/app.vue',
    '**/components/l-default.vue',
  ],
  sections: [
    {
      name: 'Welcome',
      content: '',
      sections: [
        {
          name: 'Informations',
          content: 'src/styleguide/pages/welcome/information.md',
        },
        {
          name: 'Status labels',
          content: 'src/styleguide/pages/welcome/status-label.md',
        },
      ],
    },
    {
      name: 'Core',
      content: '',
      sections: [
        {
          name: 'Typography',
          content: 'src/styleguide/pages/core/typography.md',
        },
        {
          name: 'Colors',
          content: 'src/styleguide/pages/core/colors.md',
        },
        {
          name: 'Icons',
          content: 'src/styleguide/pages/core/icons.md',
        },
        {
          name: 'Grid',
          content: 'src/styleguide/pages/core/grid.md',
        },
        {
          name: 'Z-Index',
          content: 'src/styleguide/pages/core/z-index.md',
        },
        {
          name: 'Spacing',
          content: 'src/styleguide/pages/core/spacing.md',
        },
        {
          name: 'Global styles',
          content: 'src/styleguide/pages/core/global-styles.md',
        },
      ],
    },
    // {
    //   name: 'Plugins',
    //   content: '',
    //   sections: [
    //     {
    //       name: 'Vuetify',
    //       content: 'src/styleguide/pages/plugins/....md',
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
  ],
};
