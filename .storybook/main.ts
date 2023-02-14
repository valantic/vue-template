/* eslint-disable import/no-import-module-exports */
import { UserConfig, mergeConfig, UserConfigExport } from 'vite';
import { alias } from '../vite.config';

module.exports = {
  stories: [ // @see https://storybook.js.org/docs/react/configure/overview#configure-story-loading
    '../src/stories/**/*.stories.mdx', // Currently not supported because of a bug in the vite builder. @see https://github.com/storybookjs/builder-vite/pull/556
    {
      directory: '../src/stories/components/',
      titlePrefix: 'Components/',
      files: '*.stories.@(js|jsx|ts|tsx)',
    },
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/preset-scss',
  ],
  framework: '@storybook/vue3',
  core: {
    builder: '@storybook/builder-vite',
  },
  staticDirs: ['../static'],
  async viteFinal(config: UserConfig): Promise<UserConfigExport> {
    return mergeConfig(config, {
      resolve: {
        alias,
      },
    });
  },
};
