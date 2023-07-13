// this plugin is a copy of https://www.npmjs.com/package/vue-bem-cn with some optimisations applied

import { App, Plugin } from 'vue';
import bemCn from './bem-cn';
import { DEFAULT_DELIMITERS, DEFAULT_CONFIG } from './globals';
import { hyphenate, isString } from './utils';

export default {
  install(app: App, config = { delimiters: {} }): void {
    const cfg = {
      ...DEFAULT_CONFIG,
      ...config,
      delimiters: {
        ...DEFAULT_DELIMITERS,
        ...config.delimiters,
      },
    };

    app.mixin({
      created() {
        const block = this.$options.block || this.$options.name;

        if (!isString(block)) {
          return;
        }

        const nsBlock = cfg.delimiters.ns + block;
        const generator = bemCn(cfg.hyphenate ? hyphenate(nsBlock) : nsBlock, cfg);

        this[cfg.methodName] = (...args: any[]): string => generator(...args as [string]);
      },
    });
  },
} satisfies Plugin;
