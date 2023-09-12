/* eslint-disable import/no-import-module-exports */
import { mergeConfig } from 'vite';
import type { StorybookConfig } from '@storybook/vue3-vite';
import { alias } from '../vite.config';

const config: StorybookConfig = {
  stories: [ // @see https://storybook.js.org/docs/react/configure/overview#configure-story-loading
    '../src/stories/**/*.stories.mdx', // Currently not supported because of a bug in the vite builder. @see https://github.com/storybookjs/builder-vite/pull/556
    {
      directory: '../src/stories/elements/',
      titlePrefix: 'Elements/',
      files: '*.stories.@(js|ts)',
    },
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
    '@storybook/addon-mdx-gfm'
  ],
  framework: {
    name: '@storybook/vue3-vite',
    options: {}
  },
  staticDirs: ['../static'],
  async viteFinal(viteConfig) {
    return mergeConfig(viteConfig, {
      resolve: {
        alias,
      },
    });
  },
  docs: {
    autodocs: true
  },
  features: {
    legacyMdx1: true, // 👈 Enables MDX v1 support
  },
};

export default config;
