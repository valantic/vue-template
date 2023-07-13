import mapComponentEventsToStorybookActions from '@/stories/helpers/map-component-events-to-storybook-actions';
import cComponent from '@/components/c-component';

export default {
  component: cComponent,
  argTypes: {
    ...mapComponentEventsToStorybookActions(cComponent),
  },
  args: {},
};

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = args => ({
  components: {
    cComponent,
  },

  setup() {
    return { args };
  },

  template: `
    <c-component v-bind="args"></c-component>
  `,
});

export const Default = Template.bind({});
Default.args = {};

