import eIcon from '../components/e-icon';
import eButton from '../components/e-button';

export default {
  install(Vue) {
    const components = [
      eButton,
      eIcon,
    ];

    // This improves component usage in PhpStorm, while keeping optimized import in production
    if (process.env.NODE_ENV === 'production') {
      components.forEach((component) => {
        Vue.component(component.name, component);
      });
    } else {
      Vue.component(eButton.name, eButton);
      Vue.component(eIcon.name, eIcon);
    }
  },
};
