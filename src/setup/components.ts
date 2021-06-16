import { Plugin } from 'vue';

// Form elements
import eLabel from '@/components/e-label.vue';
import eInput from '@/components/e-input.vue';
import eSelect from '@/components/e-select.vue';
import eRadio from '@/components/e-radio.vue';
import eCheckbox from '@/components/e-checkbox.vue';
import eTextarea from '@/components/e-textarea.vue';
import eButton from '@/components/e-button.vue';

// Elements
import eIcon from '@/components/e-icon.vue';
import ePicture from '@/components/e-picture.vue';
import eProgress from '@/components/e-progress.vue';

// SSR related
import lDefault from '@/components/l-default.vue';
import cHeader from '@/components/c-header.vue';
import cFooter from '@/components/c-footer.vue';

// Import style only 'components'.
require.context('@/components', false, /\.scss/);

const plugin: Plugin = {
  install(app) {
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
        app.component(component.name, component);
      });
    } else {
      // Elements
      app.component(eLabel.name, eLabel);
      app.component(eInput.name, eInput);
      app.component(eSelect.name, eSelect);
      app.component(eRadio.name, eRadio);
      app.component(eCheckbox.name, eCheckbox);
      app.component(eTextarea.name, eTextarea);
      app.component(eButton.name, eButton);
      app.component(eIcon.name, eIcon);
      app.component(ePicture.name, ePicture);
      app.component(eProgress.name, eProgress);

      // SSR related
      app.component(lDefault.name, lDefault);
      app.component(cHeader.name, cHeader);
      app.component(cFooter.name, cFooter);
    }
  },
};

export default plugin;
