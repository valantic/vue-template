import Vue from 'vue';
import vueBemCn from 'vue-bem-cn';
import vueAxios from '../plugins/axios';

Vue.use(vueAxios);
Vue.use(vueBemCn, {
  hyphenate: true,
});

export default { // TODO: check if this is really needed
  vueAxios,
  vueBemCn,
};
