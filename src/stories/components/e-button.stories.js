import eButton from '@/components/e-button';

export default {
  component: eButton,
};

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = args => ({
  // Components used in your story `template` are defined in the `components` object
  components: { eButton },
  // The story's `args` need to be mapped into the template through the `setup()` method
  setup() {
    return { args };
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: '<e-button v-bind="args">{{ args.label }}</e-button>',
});

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
Primary.args = {
  primary: true,
  label: 'Primary',
};

export const Secondary = Template.bind({});
// More on args: https://storybook.js.org/docs/vue/writing-stories/args
Secondary.args = {
  primary: false,
  label: 'Secondary',
};
