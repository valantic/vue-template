import { Options } from '@popperjs/core';

export const BEM_BLOCK_NAME = 'c-tooltip';
export const CLASS_ANCHOR = `${BEM_BLOCK_NAME}__anchor`;
export const CLASS_TOOLTIP_WRAPPER = `${BEM_BLOCK_NAME}__tooltip-wrapper`;
export const CLASS_TOOLTIP_WRAPPER_ACTIVE = `${CLASS_TOOLTIP_WRAPPER}--active`;
export const CLASS_TOOLTIP_WRAPPER_VISIBLE = `${CLASS_TOOLTIP_WRAPPER}--visible`;
export const CLASS_TOOLTIP = `${BEM_BLOCK_NAME}__tooltip`;
export const DEBOUNCE_CLOSE = 200;

export const DEFAULT_POPPER_OPTIONS: Options = {
  placement: 'bottom',
  modifiers: [
    {
      name: 'flip',
      enabled: true,
      options: {
        fallbackPlacements: ['top', 'bottom', 'right', 'left'],
      },
    },
  ],
  strategy: 'absolute',
};
