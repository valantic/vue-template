import { Meta, Story } from '@storybook/vue3';
import eVideo from '@/elements/e-video.vue';

export default {
  component: eVideo,
  argTypes: {
    source: {
      options: ['youtube', 'vimeo'],
      control: 'select',
    },
    width: {
      options: [null, '560'],
      control: 'select',
    },
    height: {
      options: [null, '315'],
      control: 'select',
    },
  },
  args: {
    source: 'youtube',
    allowFullscreen: false,
    videoUrl: 'https://www.youtube.com/watch?v=rSSPwrdGx-M',
    videoId: null,
    width: null,
    height: null,
  },
} as Meta;

const Template: Story = (args) => ({
  components: { eVideo },
  setup() {
    return { args };
  },
  template: '<e-video v-bind="args" />',
});

export const Youtube = Template.bind({});
Youtube.args = {
  source: 'youtube',
  videoUrl: 'https://www.youtube.com/watch?v=rSSPwrdGx-M',
};

export const Vimeo = Template.bind({});
Vimeo.args = {
  source: 'vimeo',
  videoId: '264037633',
};
