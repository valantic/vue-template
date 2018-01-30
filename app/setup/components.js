import eIcon from '../components/e-icon';
import eButton from '../components/e-button';

export default {
  install(Vue) {
    const components = [
      eIcon,
      eButton,
    ];

    components.forEach((component) => {
      Vue.component(component.name, component);
    });
  },
};
