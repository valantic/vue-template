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
  Object.entries(blocks).forEach(([key, value]) => {
    test(key, () => {
      expect(bemNames(value, DEFAULT_DELIMITERS)).toBe(key);
    });
  });
});

describe('Element', () => {
  Object.entries(elements).forEach(([key, value]) => {
    test(key, () => {
      expect(bemNames(value, DEFAULT_DELIMITERS)).toBe(key);
    });
  });
});

describe('Delimiters', () => {
  Object.entries(delimitersTest).forEach(([key, value]) => {
    test(key, () => {
      expect(bemNames(value, { ...DEFAULT_DELIMITERS, ...delimiters })).toBe(key);
    });
  });
});
