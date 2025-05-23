import cComponent from '@/components/c-component';
import mapComponentEventsToStorybookActions from '@/stories/helpers/map-component-events-to-storybook-actions';

export default {
  component: cComponent,
  argTypes: {
    ...mapComponentEventsToStorybookActions(cComponent),
  },
  args: {},
};

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
/**
 * Add description for component here.
 */
const Template = (args) => ({
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
