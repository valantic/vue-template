import i18n from '@/setup/i18n';

/**
 * Formats the price according to project standards (Price value in cents).
 */
export default function formatPrice(value: number, currencyBefore: boolean, currencyAfter: boolean): string | null {
  const locale = 'de'; // TODO - replace hardcoded locale
  const currency = 'CHF'; // TODO - replace hardcoded currency

  const formattedPrice = i18n.global.n(value / 100, 'currency', locale).replace(/’|'/g, '\u0020'); // Divide by 100 because we get prices in centimes.
  const beforePriceSlot = currencyBefore ? `${currency} ` : '';
  const afterPriceSlot = currencyAfter ? ` ${currency}` : '';

  return `${beforePriceSlot}${formattedPrice}${afterPriceSlot}`;
}
