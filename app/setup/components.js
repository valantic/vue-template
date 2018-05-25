import eIcon from '@/components/e-icon';
import eButton from '@/components/e-button';
import ePicture from '@/components/e-picture';
import eHeading from '@/components/e-heading';
import eInput from '@/components/e-input';
import eCheckbox from '@/components/e-checkbox';
import eLabel from '@/components/e-label';
import eProgress from '@/components/e-progress';
import eInfoLabel from '@/components/e-info-label';
import eRadio from '@/components/e-radio';

export default {
  install(Vue) {
    const components = [
      eButton,
      eIcon,
      ePicture,
      eHeading,
      eInput,
      eCheckbox,
      eLabel,
      eProgress,
      eInfoLabel,
      eRadio,
    ];

    // This improves component usage in PhpStorm, while keeping optimized import in production
    if (process.env.NODE_ENV === 'production') {
      components.forEach((component) => {
        Vue.component(component.name, component);
      });
    } else {
      Vue.component(eButton.name, eButton);
      Vue.component(eIcon.name, eIcon);
      Vue.component(ePicture.name, ePicture);
      Vue.component(eHeading.name, eHeading);
      Vue.component(eProgress.name, eProgress);
      Vue.component(eInput.name, eInput);
      Vue.component(eCheckbox.name, eCheckbox);
      Vue.component(eLabel.name, eLabel);
      Vue.component(eInfoLabel.name, eInfoLabel);
      Vue.component(eRadio.name, eRadio);
    }
  },
};
