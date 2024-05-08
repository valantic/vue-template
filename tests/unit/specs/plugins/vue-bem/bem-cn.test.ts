import { describe, expect, test } from 'vitest';
import bemCn from '@/plugins/vue-bem-cn/src/bem-cn';
import { DEFAULT_CONFIG, DEFAULT_DELIMITERS } from '@/plugins/vue-bem-cn/src/globals';
import { block, blocks, delimiters, delimitersTest, elements, hyphenate } from './testingEntitys';

const config = {
  ...DEFAULT_CONFIG,
  delimiters: {
    ...DEFAULT_DELIMITERS,
  },
};

describe('Block', () => {
  const b = bemCn(block, config);

  Object.entries(blocks).forEach(([output, input]) => {
    test(output, () => {
      expect(b(input.mods, input.mixin)).toBe(output);
    });
  });

  test('BlockName BlockName--mod, when elem = false', () => {
    const val = { el: false, mods: { mod: 'val' } };

    expect(b(val.el, val.mods)).toBe('BlockName BlockName--mod-val');
  });
});

describe('Elements', () => {
  const b = bemCn(block, config);

  Object.entries(elements).forEach(([output, input]) => {
    test(output, () => {
      expect(b(input.el, input.mods, input.mixin)).toBe(output);
    });
  });
});

describe('Delimiters', () => {
  const b = bemCn(delimiters.ns + block, { ...config, delimiters });

  Object.entries(delimitersTest).forEach(([output, input]) => {
    test(output, () => {
      expect(b(input.el, input.mods)).toBe(output);
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
