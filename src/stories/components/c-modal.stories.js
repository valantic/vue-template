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
    title: 'My Modal Title that can be longer than one line or even longer than two lines on mobile',
    isClosable: true,
    closeOnOutsideClick: false,
    size: 600,
    spacing: 500,
    stickyFooter: false,
    content: faker.lorem.paragraph(200),
  },
};
const templateString = `
Paragraph to test scrolling on mobile when modal is closed: <br>
${faker.lorem.paragraph(50)}
<br>
<c-modal v-model:is-open="isOpen"
         v-bind="args"
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
`;

// More on component templates: https://storybook.js.org/docs/vue/writing-stories/introduction#using-args
const Template = {
  render: (args) => ({
    components: {
      eButton,
      cModal,
    },

    setup() {
      return {
        args,
      };
    },

    data() {
      return {
        isOpen: false,
      };
    },

    template: templateString,
  }),
};

export const Default = {
  ...Template,
};

export const HeaderSlot = {
  ...Template,
  args: {
    headerSlot: true,
  },
};

export const StickyFooterSlot = {
  ...Template,
  args: {
    stickyFooterSlot: true,
  },
};
