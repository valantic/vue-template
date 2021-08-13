/* eslint-disable id-length */

export interface IDelimiters {
  ns: string
  el: string;
  mod: string;
  modVal: string;
}

export const DEFAULT_DELIMITERS: IDelimiters = {
  ns: '',
  el: '__',
  mod: '--',
  modVal: '-',
};

export const DEFAULT_CONFIG = {
  hyphenate: false,
  methodName: 'b',
};

interface IModifiers {
  [key: string]: boolean
}

export type IVueBemFunction = (elementOrModifiers: string | IModifiers, modifiers?: IModifiers) => string;
