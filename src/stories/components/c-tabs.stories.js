import cTabs from '@/components/c-tabs.vue';
import eIcon from '@/elements/e-icon.vue';
import mapComponentEventsToStorybookActions from '@/stories/helpers/map-component-events-to-storybook-actions';

export default {
  component: cTabs,
  argTypes: {
    ...mapComponentEventsToStorybookActions(cTabs),
  },
  args: {
    tabs: [
      { title: 'Tab 1', id: 'tab1' },
      { title: 'Tab 2', id: 'tab2', active: true },
      { title: 'Tab 3', id: 'tab3' },
      { title: 'Link tab', id: 'tab4', meta: { href: '#tab4-link' } },
    ],
  },
};

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = (args, { story }) => {
  const demo = {
    components: {
      cTabs,
      eIcon,
    },

    setup() {
      return { args };
    },

    template: `
      <c-tabs v-bind="args">
        <template #tab1__tab>
          <e-icon icon="i-styleguide-heart"></e-icon>
        </template>
        <template v-for="tab in args.tabs" :key="tab.id" #[tab.id]>
          Content of '{{ tab.id }}'
        </template>
      </c-tabs>
    `,
  };

  if (story === 'No Content') {
    demo.template = `
      <c-tabs v-bind="args">
        <template #tab1__tab>
          <e-icon icon="i-styleguide-heart"></e-icon>
        </template>
        <template>
          <!-- Removes the tab content -->
        </template>
      </c-tabs>
    `;
  }

  return demo;
};

export const Default = {
  render: Template,
};

export const NoContent = {
  render: Template,
};
