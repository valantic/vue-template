import i18n, { I18N_FALLBACK } from '@/setup/i18n';

/**
 * Formats the price according to project standards (Price value in cents).
 */
export default function formatPrice(value: number, currencyBefore?: boolean, currencyAfter?: boolean): string | null {
  const locale = I18N_FALLBACK;
  const currency = 'CHF'; // TODO - replace hardcoded currency

  // If we don't get a number, we don't modify the content.
  if (Number.isNaN(value)) {
    return '';
  }

  const formattedPrice = i18n.global.n(value / 100, 'decimal', locale).replaceAll(/’|'/g, '\u0020'); // Divide by 100 because we get prices in centimes.
  const beforePriceSlot = currencyBefore ? `${currency} ` : '';
  const afterPriceSlot = currencyAfter ? ` ${currency}` : '';

  return `${beforePriceSlot}${formattedPrice}${afterPriceSlot}`;
}
