import { faker } from '@faker-js/faker/locale/en';

import cModal from '@/components/c-modal.vue';
import eButton from '@/elements/e-button.vue';

export default {
  component: cModal,
  argTypes: {
    size: {
      options: [600, 700, 800],
      control: 'select',
    },
    spacing: {
      options: [0, 300, 500],
      control: 'select',
    },
  },
  args: {
    title: 'My Modal Title',
    isClosable: true,
    closeOnOutsideClick: false,
    size: 600,
    spacing: 500,
    stickyFooter: false,
    content: faker.lorem.paragraphs(),
  },
};

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = args => ({
  components: {
    eButton,
    cModal,
  },

  setup() {
    return { args };
  },
  data() {
    return {
      isOpen: false,
    };
  },

  template: `
    <c-modal v-model:is-open="isOpen"
             :title="args.title"
             :is-closable="args.isClosable"
             :close-on-outside-click="args.closeOnOutsideClick"
             :size="args.size"
             :spacing="args.spacing"
    >
      <template v-if="args.headerSlot" #head>
        <div style="border: 1px solid blue;">
          A custom header content
        </div>
      </template>
      {{ args.content }}
      <template v-if="args.stickyFooterSlot" #stickyFooter>
        <e-button width="full" @click="isOpen = false">
          Close
        </e-button>
      </template>
    </c-modal>
    <e-button @click="isOpen = true">
      Open
    </e-button>
  `,
});

export const Default = Template.bind({});
Default.args = {};

export const HeaderSlot = Template.bind({});
HeaderSlot.args = {
  headerSlot: true,
};

export const StickyFooterSlot = Template.bind({});
StickyFooterSlot.args = {
  stickyFooterSlot: true,
};
