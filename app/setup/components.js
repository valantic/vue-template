import cIcon from '../components/e-icon';

export default {
  install(Vue) {
    const components = [
      cIcon,
    ];

    components.forEach((component) => {
      Vue.component(component.name, component);
    });
  },
};
