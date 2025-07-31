<template>
  <l-vas-layout>
    <e-table
      v-model:selected="selectedItems"
      :items="items"
      :columns="columnsDefinition"
      selectable
      has-detail-rows
    >
      <template #detailRow="{ item }"> Detail row for {{ item.id }}. </template>
    </e-table>
  </l-vas-layout>
</template>

<script lang="ts">
  import { faker } from '@faker-js/faker';
  import lVasLayout from '@valantic/vue-styleguide/src/layouts/l-vas-layout.vue';
  import { defineComponent } from 'vue';
  import eTable, { TableColumn, TableItem } from '@/elements/e-table.vue';

  type Setup = {
    columnsDefinition: TableColumn[];
  };

  export default defineComponent({
    name: 'r-table',

    components: {
      lVasLayout,
      eTable,
    },

    // props: {},
    // emits: {},

    setup(): Setup {
      return {
        columnsDefinition: [
          {
            title: 'City',
            key: 'city',
            slotName: 'city',
            sortable: true,
          },
          {
            title: 'Firstname',
            key: 'firstName',
            slotName: 'firstname',
          },
          {
            title: 'Lastname',
            key: 'lastName',
            titleHidden: true,
            slotName: 'lastname',
            sortable: false,
          },
          {
            title: 'Birthdate',
            key: 'birthDate',
            slotName: 'date',
          },
          {
            title: 'Company',
            key: 'company',
            align: 'center',
            slotName: 'company',
            sortable: false,
          },
          {
            title: 'Children',
            key: 'children',
            align: 'right',
            slotName: 'children',
            sortable: false,
          },
        ],
      };
    },
    data() {
      return {
        selectedItems: [],
      };
    },

    computed: {
      items(): TableItem[] {
        return Array.from({ length: 40 })
          .fill(null)
          .map((item, index) => ({
            id: index + 1,
            isComplete: index === 5,
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            birthDate: faker.date.anytime(),
            city: faker.location.city(),
            company: faker.company.name(),
            children: 3,
          }));
      },
    },
    // watch: {},

    // beforeCreate() {},
    // created() {},
    // beforeMount() {},
    // mounted() {},
    // beforeUpdate() {},
    // updated() {},
    // activated() {},
    // deactivated() {},
    // beforeUnmount() {},
    // unmounted() {},

    // methods: {},
    // render() {},
  });
</script>
