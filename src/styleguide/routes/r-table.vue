<template>
  <div :class="b()">
    <h1>
      Table
    </h1>
    <e-table v-model:selected="selectedItems"
             :items="items"
             :columns="columnsDefinition"
             selectable
             has-detail-rows
    >
      <template #detailRow="{ item }">
        Detail row for {{ item.id }}.
      </template>
    </e-table>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { faker } from '@faker-js/faker/locale/en';
  import eTable, { IETableColumn, IETableItem } from '@/elements/e-table.vue';

  interface ISetup {
    columnsDefinition: IETableColumn[];
  }

  export default defineComponent({
    name: 'r-table',

    components: { eTable },

    // props: {},
    // emits: {},

    setup(): ISetup {
      return {
        columnsDefinition: [
          {
            title: 'City',
            key: 'city',
            align: 'left',
            slotName: 'city',
            sortable: true,
          },
          {
            title: 'Firstname',
            key: 'firstName',
            align: 'left',
            slotName: 'firstname',
            sortable: true,
          },
          {
            title: 'Lastname',
            key: 'lastName',
            align: 'left',
            titleHidden: true,
            slotName: 'lastname',
            sortable: false,
          },
          {
            title: 'Birthdate',
            key: 'birthDate',
            align: 'left',
            slotName: 'date',
            sortable: true,
          },
          {
            title: 'Company',
            key: 'company',
            align: 'left',
            slotName: 'company',
            sortable: false,
          },
          {
            title: 'Children',
            key: 'children',
            align: 'left',
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
      items(): IETableItem[] {
        return new Array(40)
          .fill(null)
          .map((item, index) => ({
            id: index,
            isComplete: index === 5,
            firstName: faker.name.firstName(),
            lastName: faker.name.lastName(),
            birthDate: '2018-08-20 18:15:09.587786',
            city: faker.address.city(),
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

<style lang="scss">
  // @use '../setup/scss/variables';

  .r-table {
    // ...
  }
</style>
