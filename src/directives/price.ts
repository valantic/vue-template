import formatPrice from '@valantic/frontend-utils/src/helpers/format-price';
import { DirectiveBinding } from 'vue';
import { NamedDirective } from '@/types/named-directive';

/**
 * Formats the html content of the provided element as price.
 */
function format(el: HTMLElement, binding: DirectiveBinding): void {
  if (!binding.value && binding.value !== 0) {
    return;
  }

  const priceInput = Number.parseFloat(binding.value);

  el.textContent = Number.isNaN(priceInput)
    ? ''
    : formatPrice({
        value: Number.parseFloat(binding.value),
        currencyBefore: binding.modifiers?.currencyBefore ?? false,
        currencyAfter: binding.modifiers?.currencyAfter ?? false,
      });
}

/**
 * Directive to provide formatted prices.
 *
 * Examples:
 *
 * Default behaviour (without currency):
 * <span v-price="10"></span> => 10.00
 *
 * Displaying with currency symbol behind:
 * <span v-price.currencyBefore="10"></span> => CHF 10.00
 * <span v-price.currencyAfter="10"></span> => 10.00 CHF
 */
export default {
  name: 'price',

  beforeMount: format,
  updated: format,
} satisfies NamedDirective;
