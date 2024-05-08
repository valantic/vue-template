import eCheckbox from '@/elements/e-checkbox.vue';
import mapComponentEventsToStorybookActions from '@/stories/helpers/map-component-events-to-storybook-actions';

export default {
  component: eCheckbox,
  argTypes: {
    ...mapComponentEventsToStorybookActions(eCheckbox),
  },
  args: {
    checked: false,
  },
};

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = {
  render: (args) => ({
    components: {
      eCheckbox,
    },

    setup() {
      return { args };
    },

    data() {
      return {
        isChecked: args.checked,
      };
    },

    template: `
      <e-checkbox v-model="isChecked" v-bind:bind:checked="args" :value="true" name="demo" />

      {{ isChecked }}
    `,
  }),
};

export const Default = {
  ...Template,
  args: {},
};
