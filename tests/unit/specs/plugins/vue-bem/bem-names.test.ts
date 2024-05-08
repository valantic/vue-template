import { describe, expect, test } from 'vitest';
import bemNames from '@/plugins/vue-bem-cn/src/bem-cn/bem-names';
import { DEFAULT_DELIMITERS } from '@/plugins/vue-bem-cn/src/globals';
import { blocks, delimiters, delimitersTest, elements } from './testingEntitys';

describe('Block', () => {
  Object.entries(blocks).forEach(([output, input]) => {
    test(output, () => {
      expect(bemNames(input, DEFAULT_DELIMITERS)).toBe(output);
    });
  });
});

describe('Element', () => {
  Object.entries(elements).forEach(([output, input]) => {
    test(output, () => {
      expect(bemNames(input, DEFAULT_DELIMITERS)).toBe(output);
    });
  });
});

describe('Delimiters', () => {
  Object.entries(delimitersTest).forEach(([output, input]) => {
    test(output, () => {
      expect(bemNames(input, { ...DEFAULT_DELIMITERS, ...delimiters })).toBe(output);
    });
  });
});
