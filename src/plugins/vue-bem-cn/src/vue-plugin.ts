import { Plugin } from 'vue';
import bemCn from './bem-cn';
import { DEFAULT_DELIMITERS, DEFAULT_CONFIG } from './globals';
import { hyphenate, isString } from './utils';

const plugin: Plugin = {
  install(app, config = { delimiters: {} }) {
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

        // @ts-ignore
        this[cfg.methodName] = (...args: any[]) => generator(...args);
      },
    });
  },
};

export default plugin;
