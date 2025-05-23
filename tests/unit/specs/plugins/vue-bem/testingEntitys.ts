/* eslint-disable-line unicorn/filename-case */
export const block = 'BlockName';
export const el = 'elementName';
export const delimiters = {
  // eslint-disable-next-line id-length
  ns: 'ns**',
  el: '++',
  mod: '==',
  modVal: '~',
};

type Block = {
  block: string;
  mods?: Record<string, boolean | string | number>;
  mixin?: string;
};

type Blocks = {
  [key: string]: Block;
};

export const blocks: Blocks = {
  [block]: { block },
  [`${block} ${block}--mod`]: { block, mods: { mod: true } },
  [`${block} ${block}--mod-val`]: { block, mods: { mod: 'val' } },
  [`${block} ${block}--mod-123`]: { block, mods: { mod: 123 } },
  [`${block} ${block}--mod-val ${block}--modbool`]: {
    block,
    mods: {
      'mod': 'val',
      'modbool': true,
      'unsupported-mod': false,
    },
  },
  [`${block} mix`]: { block, mixin: 'mix' },
  [`${block} ${block}--mod mix`]: { block, mods: { mod: true }, mixin: 'mix' },
};

type Elements = Blocks & {
  [key: string]: Block & { el: string };
};

export const elements: Elements = {
  [`${block}__${el}`]: { block, el },
  [`${block}__${el} ${block}__${el}--mod`]: { block, el, mods: { mod: true } },
  [`${block}__${el} ${block}__${el}--mod-val`]: { block, el, mods: { mod: 'val' } },
  [`${block}__${el} ${block}__${el}--mod-123`]: { block, el, mods: { mod: 123 } },
  [`${block}__${el} ${block}__${el}--mod-val ${block}__${el}--modbool`]: {
    block,
    el,
    mods: {
      'mod': 'val',
      'modbool': true,
      'unsupported-mod': false,
    },
  },
  [`${block}__${el} mix`]: { block, el, mixin: 'mix' },
  [`${block}__${el} ${block}__${el}--mod-val mix`]: {
    block,
    el,
    mods: { mod: 'val' },
    mixin: 'mix',
  },
};

type DelimitersTest = {
  [key: string]: Block & { el: string };
};

export const delimitersTest: DelimitersTest = {
  [`ns**${block}++${el} ns**${block}++${el}==mod~val ns**${block}++${el}==modbool`]: {
    block: delimiters.ns + block,
    el,
    mods: {
      'mod': 'val',
      'modbool': true,
      'unsupported-mod': false,
    },
  },
};

export const hyphenate = {
  'block-name': { block },
  'block-name block-name--has-mod': { block, mods: { hasMod: true } },
  'block-name__element-name': { block, el },
};
