<template>
  <l-default>
    <!-- SEARCH -->
    <div :class="b('search')" style="margin-bottom: 50px;">
      <e-input v-model="searchTerm"
               :class="b('search-field')"
               :placeholder="$t('c-table.searchPlaceholder')"
               :title="$t('c-table.searchTitle')"
               name="search-field"
               autocomplete="off"
               type="search"
               tabindex="0"
               select-on-focus
      >
        <e-icon :class="b('icon')"
                icon="i-search"
                tabindex="-1"
                inline/>
      </e-input>
    </div>

    <!-- TOOLBAR -->
    <div v-if="selectedItems.length">{{ selectedItems }}</div>

    <!-- TABLE -->
    <c-table :items="items"
             :headers="headers"
             :search-term="searchTerm"
             is-selectable
             has-link
             has-pagination
             @onChangeSelected="changeSelectedItems">

      <template slot-scope="slotProps">

        <!-- Dynamic content cells -->
        <td v-for="headerItem in slotProps.headers" :key="headerItem.value">

          <!-- Checkbox example -->
          <e-checkbox
            v-if="headerItem.type === 'checkbox'"
            :checked="slotProps.props.item[headerItem.value]"
            :value="slotProps.props.item.id"
            name="example"
            disabled
          >
            <span class="invisible">label text</span>
          </e-checkbox>

          <!-- Price cell -->
          <span v-price.currencyBefore="slotProps.props.item[headerItem.value]
                && slotProps.props.item[headerItem.value].grandTotal"
                v-else-if="headerItem.type === 'price'"></span>

          <!-- Date cell -->
          <span v-else-if="headerItem.type === 'date'">
            {{ new Date(slotProps.props.item[headerItem.value]).toLocaleDateString() }}
          </span>

          <!-- Text cell -->
          <template v-else>
            {{ slotProps.props.item[headerItem.value] }}
          </template>
        </td>

        <td>
          <a :class="b('link')"
             href="#">
            <e-icon icon="i-arrow--right--info"
                    width="15"
                    height="15"/>
          </a>
        </td>
      </template>
    </c-table>
  </l-default>
</template>

<script>
  import cTable from '@/components/c-table';
  import cTablePagination from '@/components/c-table-pagination';
  import tableMockData from '../../styleguide/mock-data/table';

  export default {
    name: 'tables',
    components: {
      cTable,
      cTablePagination,
    },
    // mixins: [],

    // props: {},
    data() {
      return {
        searchTerm: '',
        headers: [
          { text: 'ID', value: 'id', type: 'text' },
          { text: 'Vorname', value: 'firstName', type: 'text' },
          { text: 'Nachname', value: 'lastName', type: 'text' },
          { text: 'Stadt', value: 'city', type: 'text' },
          { text: 'Geburtsdatum', value: 'birthDate', type: 'date' },
          { text: 'Firma', value: 'company', type: 'text' },
          { text: 'Infos komplett', value: 'isComplete', type: 'checkbox' },
          { text: 'Kinder', value: 'children', type: 'text' },
        ],
        selectedItems: [],
        items: tableMockData,
      };
    },

    // computed: {},
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

    methods: {
      changeSelectedItems(list) {
        this.selectedItems = list;
      },
    },
    // render() {},
  };
</script>

<style lang="scss">
  .tables {
    // Add styling
  }
</style>
