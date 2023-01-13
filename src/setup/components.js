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
      // Element
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
