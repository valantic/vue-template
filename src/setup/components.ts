import { Plugin } from 'vue';

// Form elements
import eButton from '@/components/e-button.vue';
import eCheckbox from '@/components/e-checkbox.vue';
import eFieldset from '@/components/e-fieldset.vue';
import eMultiselect from '@/components/e-multiselect.vue';
import eInput from '@/components/e-input.vue';
import eLabel from '@/components/e-label.vue';
import eRadio from '@/components/e-radio.vue';
import eSelect from '@/components/e-select.vue';
import eTextarea from '@/components/e-textarea.vue';

// Elements
import eIcon from '@/components/e-icon.vue';
import ePicture from '@/components/e-picture.vue';
import eProgress from '@/components/e-progress.vue';

// SSR related
import lDefault from '@/components/l-default.vue';
import cHeader from '@/components/c-header.vue';
import cFooter from '@/components/c-footer.vue';

// Imports style only components.
import.meta.glob([
  '@/elements/*.scss',
  '@/components/*.scss',
  '@/layouts/*.scss',
], { eager: true });

const plugin: Plugin = {
  install(app) {
    const components = [
      // Elements
      eButton,
      eCheckbox,
      eFieldset,
      eInput,
      eIcon,
      eLabel,
      eMultiselect,
      ePicture,
      eProgress,
      eRadio,
      eSelect,
      eTextarea,

      // SSR related
      lDefault,
      cHeader,
      cFooter,
    ];

    // This improves component usage in PhpStorm, while keeping optimized import in production
    if (import.meta.env.MODE === 'production') {
      components.forEach((component) => {
        app.component(component.name, component);
      });
    } else {
      // Elements
      app.component(eButton.name, eButton);
      app.component(eCheckbox.name, eCheckbox);
      app.component(eFieldset.name, eFieldset);
      app.component(eInput.name, eInput);
      app.component(eIcon.name, eIcon);
      app.component(eLabel.name, eLabel);
      app.component(eMultiselect.name, eMultiselect);
      app.component(ePicture.name, ePicture);
      app.component(eProgress.name, eProgress);
      app.component(eRadio.name, eRadio);
      app.component(eSelect.name, eSelect);
      app.component(eTextarea.name, eTextarea);

      // SSR related
      app.component(lDefault.name, lDefault);
      app.component(cHeader.name, cHeader);
      app.component(cFooter.name, cFooter);
    }
  },
};

export default plugin;
