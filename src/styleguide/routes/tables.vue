<template>
  <div :class="b()">
    <!-- Rendered form -->
    <section :class="b('table')">
      <h1>
        Table
      </h1>
      <e-table :items="mockData.dummyTableData"
               :columns="columnsDefinition" />
    </section>
  </div>
</template>
<script>
  import eTable from '@/components/e-table';

  export default {
    name: 'tables',
    components: {
      eTable,
    },
    // components: {},
    data() {
      return {
        columnsDefinition: [
          {
            title: 'City',
            key: 'city',
            align: 'left',
            slotName: 'city',
            sortable: false
          },
          {
            title: 'Firstname',
            key: 'firstName',
            align: 'left',
            slotName: 'firstname',
            sortable: false
          },
          {
            title: 'Lastname',
            key: 'lastName',
            align: 'left',
            titleHidden: true,
            slotName: 'lastname',
            sortable: false
          },
          {
            title: 'Birthdate',
            key: 'birthDate',
            align: 'left',
            slotName: 'birthDate',
            sortable: false
          },
          {
            title: 'Company',
            key: 'company',
            align: 'left',
            slotName: 'company',
            sortable: false
          },
          {
            title: 'Children',
            key: 'children',
            align: 'left',
            slotName: 'children',
            sortable: false
          },

        ]
      };
    },
    // methods: {}
    // components: {},
    // watch: {},
    // beforeCreate() {},
    // created() {},
    // beforeMount() {},
    // mounted() {},
    // beforeUpdate() {},
    // updated() {},
    // activated() {},
    // deactivated() {},
    // beforeDestroy() {},
    // destroyed() {},
  };
</script>

<style lang="scss">
  @use '../../setup/scss/variables';
</style>
