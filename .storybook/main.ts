import type { StorybookConfig } from '@storybook/vue3-vite';
import { mergeConfig } from 'vite';
import { alias } from '../vite.config';

const config: StorybookConfig = {
  stories: [
    '../src/stories/**/*.mdx',
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
    '@storybook/addon-mdx-gfm',
    '@chromatic-com/storybook',
  ],
  framework: {
    name: '@storybook/vue3-vite',
    options: {},
  },
  staticDirs: ['../static'],
  async viteFinal(viteConfig) {
    return mergeConfig(viteConfig, {
      resolve: {
        alias,
      },
    });
  },
  docs: {},
};

export default config;
