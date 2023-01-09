// Form elements
import eLabel from '@/elements/e-label.vue';
import eInput from '@/elements/e-input.vue';
import eSelect from '@/elements/e-select.vue';
import eRadio from '@/elements/e-radio.vue';
import eCheckbox from '@/elements/e-checkbox.vue';
import eTextarea from '@/elements/e-textarea.vue';
import eButton from '@/elements/e-button.vue';

// Elements
import eIcon from '@/elements/e-icon.vue';
import ePicture from '@/elements/e-picture.vue';
import eProgress from '@/elements/e-progress.vue';

// SSR related
import lDefault from '@/layouts/l-default.vue';
import cHeader from '@/components/c-header.vue';
import cFooter from '@/components/c-footer.vue';

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
