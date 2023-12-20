import { describe, test, expect } from 'vitest';
import { DEFAULT_DELIMITERS, DEFAULT_CONFIG } from '@/plugins/vue-bem-cn/src/globals';
import bemCn from '@/plugins/vue-bem-cn/src/bem-cn';
import {
  blocks,
  elements,
  block,
  delimiters,
  delimitersTest,
  hyphenate,
} from './testingEntitys';

const config = {
  ...DEFAULT_CONFIG,
  delimiters: {
    ...DEFAULT_DELIMITERS,
  },
};

describe('Block', () => {
  const b = bemCn(block, config);

  Object.keys(blocks).forEach((item) => {
    test(item, () => {
      expect(b(blocks[item]?.mods, blocks[item]?.mixin)).toBe(item);
    });
  });

  test('BlockName BlockName--mod, when elem = false', () => {
    const val = { el: false, mods: { mod: 'val' } };

    expect(b(val.el, val.mods)).toBe('BlockName BlockName--mod-val');
  });
});

describe('Elements', () => {
  const b = bemCn(block, config);

  Object.entries(elements).forEach(([key, value]) => {
    test(key, () => {
      expect(b(value.el, value.mods, value.mixin)).toBe(key);
    });
  });
});

describe('Delimiters', () => {
  const b = bemCn(delimiters.ns + block, { ...config, delimiters });

  Object.entries(delimitersTest).forEach(([key, value]) => {
    test(key, () => {
      expect(b(value.el, value.mods))
        .toBe(key);
    });
  });
});

describe('Hyphenate', () => {
  const b = bemCn('block-name', { ...config, hyphenate: true });

  Object.keys(hyphenate).forEach((item) => {
    test(item, () => {
      // @ts-ignore Needed because TypeScript cannot detect if object key exists
      expect(b(hyphenate[item].mods || hyphenate[item].el)).toBe(item);
    });
  });
});
