import mapComponentEventsToStorybookActions from '@/stories/helpers/map-component-events-to-storybook-actions';
import eButton from '@/elements/e-button.vue';

export default {
  component: eButton,
  argTypes: {
    ...mapComponentEventsToStorybookActions(eButton),
    spacing: {
      options: [0, 500],
      control: 'select',
    },
    width: {
      options: [null, 'auto', 'full'],
      control: 'select',
    },
    size: {
      options: [300, 500],
      control: 'select',
    },
  },
  args: {
    label: 'Click me',
    negative: false,
    disabled: false,
    progress: false,
    spacing: 500,
    width: null,
    size: 500,
    href: '',
  },
};

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = args => ({
  components: { eButton },

  setup() {
    return { args };
  },

  template: `
    <e-button v-bind="args">
      {{ args.label }}
    </e-button>
  `,
});

export const Default = Template.bind({});
Default.args = {
  primary: false,
};

export const Primary = Template.bind({});
Primary.args = {
  primary: true,
};

export const Link = Template.bind({});
Link.args = {
  href: 'http://www.google.com',
};

