import i18n from '@/setup/i18n';

/**
 * Returns a date format string for the currently used localization.
 */
export default function getLocalizedDateFormat(locale = i18n.global.locale): string {
  const customDate = new Date(2222, 11, 18);
  const strDate = customDate.toLocaleDateString(locale);

  return strDate
    .replace('12', 'MM')
    .replace('18', 'DD')
    .replace('2222', 'YYYY');
}
