// Form elements
import eLabel from '@/components/e-label';
import eInput from '@/components/e-input';
import eSelect from '@/components/e-select';
import eRadio from '@/components/e-radio';
import eCheckbox from '@/components/e-checkbox';
import eTextarea from '@/components/e-textarea';
import eButton from '@/components/e-button';

// Elements
import eIcon from '@/components/e-icon';
import ePicture from '@/components/e-picture';
import eProgress from '@/components/e-progress';

// SSR related
import lDefault from '@/components/l-default';
import cHeader from '@/components/c-header';
import cFooter from '@/components/c-footer';

// Import style only 'components'.
require.context('@/components', false, /\.scss/);

export default {
  install(Vue) {
    const components = [
      // Elements
      eLabel,
      eInput,
      eSelect,
      eRadio,
      eCheckbox,
      eTextarea,
      eButton,
      eIcon,
      ePicture,
      eProgress,

      // SSR related
      lDefault,
      cHeader,
      cFooter,
    ];

    // This improves component usage in PhpStorm, while keeping optimized import in production
    if (process.env.NODE_ENV === 'production') {
      components.forEach((component) => {
        Vue.component(component.name, component);
      });
    } else {
      // Elements
      Vue.component(eLabel.name, eLabel);
      Vue.component(eInput.name, eInput);
      Vue.component(eSelect.name, eSelect);
      Vue.component(eRadio.name, eRadio);
      Vue.component(eCheckbox.name, eCheckbox);
      Vue.component(eTextarea.name, eTextarea);
      Vue.component(eButton.name, eButton);
      Vue.component(eIcon.name, eIcon);
      Vue.component(ePicture.name, ePicture);
      Vue.component(eProgress.name, eProgress);

      // SSR related
      Vue.component(lDefault.name, lDefault);
      Vue.component(cHeader.name, cHeader);
      Vue.component(cFooter.name, cFooter);
    }
  },
};
