import { describe, test, expect } from 'vitest';
import bemNames from '@/plugins/vue-bem-cn/src/bem-cn/bem-names';
import { DEFAULT_DELIMITERS } from '@/plugins/vue-bem-cn/src/globals';
import {
  blocks,
  elements,
  delimiters,
  delimitersTest,
} from './testingEntitys';

describe('Block', () => {
  Object.keys(blocks).forEach((item) => {
    test(item, () => {
      expect(bemNames(blocks[item], DEFAULT_DELIMITERS)).toBe(item);
    });
  });
});

describe('Element', () => {
  Object.keys(elements).forEach((item) => {
    test(item, () => {
      expect(bemNames(elements[item], DEFAULT_DELIMITERS)).toBe(item);
    });
  });
});

describe('Delimiters', () => {
  Object.keys(delimitersTest).forEach((item) => {
    test(item, () => {
      expect(bemNames(delimitersTest[item], { ...DEFAULT_DELIMITERS, ...delimiters })).toBe(item);
    });
  });
});
