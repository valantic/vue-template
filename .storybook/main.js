const webpackConfig = require('../webpack.config')();

module.exports = {
  stories: [ // @see https://storybook.js.org/docs/react/configure/overview#configure-story-loading
    '../src/**/*.stories.mdx',
    {
      directory: '../src/stories/elements/',
      titlePrefix: 'Elements/',
      files: '*.stories.js',
    },
    {
      directory: '../src/stories/components/',
      titlePrefix: 'Components/',
      files: '*.stories.js',
    },
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/preset-scss',
  ],
  framework: '@storybook/vue3',
  core: {
    'builder': 'webpack5'
  },
  staticDirs: ['../static'],

  webpackFinal: async (config) => {
    config.resolve.alias = { // Add alias from projects webpack config
      ...config.resolve.alias,
      ...webpackConfig.resolve.alias,
    };

    return config;
  }
}
