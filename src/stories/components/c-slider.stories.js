import cSliderItemX from '@/components/c-slider-item-x.vue';
import cSlider from '@/components/c-slider.vue';
import ePicture from '@/elements/e-picture.vue';
import { createSrcSetImage } from '@/styleguide/mock-data/data-object/image';

export default {
  component: cSlider,
  args: {
    autoPlay: false,
  },
};

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = {
  render: (args) => ({
    components: {
      cSlider,
      cSliderItemX,
      ePicture,
    },

    setup() {
      return {
        args,
        images: new Array(15).fill(null).map(() => createSrcSetImage()),
      };
    },

    template: `
      <c-slider v-bind="args">
      <c-slider-item-x v-for="(image, index) in images" :key="index">
        <e-picture :srcset="image.srcset"
                   :fallback="image.fallback"
                   :alt="image.alt"
                   :ratio="1"
        />
      </c-slider-item-x>
      </c-slider>
    `,
  }),
};

export const Default = {
  ...Template,
};
