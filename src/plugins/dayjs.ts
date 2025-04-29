import dayjs from 'dayjs';
import de from 'dayjs/locale/de';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import isBetween from 'dayjs/plugin/isBetween';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import { Plugin } from 'vue';

/**
 * Holds the date format templates used with dayjs.
 */
export enum DateFormat {
  DD_MM_YYYY = 'DD.MM.YYYY', // eslint-disable-line @typescript-eslint/naming-convention
  DD_MM_YYYY_HH_mm = 'DD.MM.YYYY HH:mm', // eslint-disable-line @typescript-eslint/naming-convention
  dddd_DD_MMMM_YYYY = 'dddd [/] DD. MMMM YYYY', // eslint-disable-line @typescript-eslint/naming-convention
  dddd_DD_MMMM_YYYY_HH_mm = 'dddd [/] DD. MMMM YYYY HH:mm', // eslint-disable-line @typescript-eslint/naming-convention
}

const plugin: Plugin = {
  install(app) {
    dayjs.locale('de-ch', de);
    dayjs.extend(customParseFormat);
    dayjs.extend(isSameOrBefore);
    dayjs.extend(isSameOrAfter);
    dayjs.extend(isBetween);

    app.config.globalProperties.$dayjs = dayjs;
  },
};

export default plugin;
