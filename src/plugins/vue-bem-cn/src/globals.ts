/* eslint-disable id-length */

export type Delimiters = {
  ns: string;
  el: string;
  mod: string;
  modVal: string;
};

export const DEFAULT_DELIMITERS: Delimiters = {
  ns: '',
  el: '__',
  mod: '--',
  modVal: '-',
};

export const DEFAULT_CONFIG = {
  hyphenate: false,
  methodName: 'b',
};

export type Modifiers = {
  [key: string]: boolean | string | number | undefined;
};

export type VueBemFunction = (elementOrModifiers?: string | Modifiers, modifiers?: Modifiers) => string;
