import eIcon from '@/components/e-icon';
import eButton from '@/components/e-button';
import ePicture from '@/components/e-picture';
import eHeading from '@/components/e-heading';
import ePanel from '@/components/c-panel';
import eInput from '@/components/e-input';
import eCheckbox from '@/components/e-checkbox';
import eLabel from '@/components/e-label';
import eProgress from '@/components/e-progress';
import eTextarea from '@/components/e-textarea';
import eRadio from '@/components/e-radio';
import cModal from '@/components/c-modal';
import cModalHeader01 from '@/components/c-modal-header-01';
import eSelect from '@/components/e-select';
import eFieldset from '@/components/e-fieldset';
import eLink from '@/components/e-link';
import cBreadcrumb from '@/components/c-breadcrumb';
import cSearch from '@/components/c-search';

// Twig related imports
import lDefault from '@/components/l-default';

// Import style only 'components'.
require.context('@/components', false, /\.scss/);

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
      eTextarea,
      eRadio,
      ePanel,
      cModal,
      cModalHeader01,
      eSelect,
      lDefault,
      eLink,
      cBreadcrumb,
      cSearch,
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
      Vue.component(ePanel.name, ePanel);
      Vue.component(eProgress.name, eProgress);
      Vue.component(eInput.name, eInput);
      Vue.component(eCheckbox.name, eCheckbox);
      Vue.component(eLabel.name, eLabel);
      Vue.component(eTextarea.name, eTextarea);
      Vue.component(eRadio.name, eRadio);
      Vue.component(cModal.name, cModal);
      Vue.component(cModalHeader01.name, cModalHeader01);
      Vue.component(eSelect.name, eSelect);
      Vue.component(eFieldset.name, eFieldset);
      Vue.component(lDefault.name, lDefault);
      Vue.component(eLink.name, eLink);
      Vue.component(cBreadcrumb.name, cBreadcrumb);
      Vue.component(cSearch.name, cSearch);
    }
  },
};
