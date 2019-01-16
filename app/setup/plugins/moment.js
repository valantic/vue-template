import moment from 'moment';

export default {
  install(Vue /* , options */) {
    moment.locale('de-ch');

    // eslint-disable-next-line no-param-reassign
    Vue.prototype.$moment = moment;
  },
};
