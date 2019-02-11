import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isBetween from 'dayjs/plugin/isBetween';
// eslint-disable-next-line id-length
import de from 'dayjs/locale/de';

export default {
  install(Vue /* , options */) {
    dayjs.locale('de-ch', de);
    dayjs.extend(customParseFormat);
    dayjs.extend(isSameOrBefore);
    dayjs.extend(isSameOrAfter);
    dayjs.extend(isBetween);

    // eslint-disable-next-line no-param-reassign
    Vue.prototype.$dayjs = dayjs;
  },
};
