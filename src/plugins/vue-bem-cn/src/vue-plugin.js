import bemCn from './bem-cn';
import { DEFAULT_DELIMITERS, DEFAULT_CONFIG } from './globals';
import { hyphenate, isString } from './utils';

export default {
  install(Vue, config = { delimiters: {} }) {
    const cfg = {
      ...DEFAULT_CONFIG,
      ...config,
      delimiters: {
        ...DEFAULT_DELIMITERS,
        ...config.delimiters,
      },
    };

    Vue.mixin({
      created() {
        const block = this.$options.block || this.$options.name;

        if (!isString(block)) {
          return;
        }

        const nsBlock = cfg.delimiters.ns + block;
        const generator = bemCn(cfg.hyphenate ? hyphenate(nsBlock) : nsBlock, cfg);

        this[cfg.methodName] = (...args) => generator(...args);
      },
    });
  },
};
