<template>
  <div :class="b({noResults: pagination.totalItems < 1})">
    <v-data-table
      v-model="selected"
      :headers="headers"
      :items="items"
      :pagination.sync="pagination"
      :search="searchTerm"
      :no-results-text="$t('c-table.noResultsFound')"
      select-all
      hide-actions
    >
      <!-- TABLE-HEADER -->
      <template slot="headers" slot-scope="props">
        <tr :class="b('header-row')">
          <th v-if="isSelectable">
            <e-checkbox :checked="!!selected.length"
                        :disabled="isDisabled"
                        value="0"
                        name="total"
                        @change="toggleAll">

              <!-- eslint-disable-next-line vue/attributes-order-->
              <span v-if="!!selected.length" v-t="'c-table.deselectAll'" class="invisible"></span>
              <!-- eslint-disable-next-line vue/attributes-order-->
              <span v-else v-t="'c-table.selectAll'" class="invisible"></span>
            </e-checkbox>
          </th>
          <th
            v-for="header in props.headers"
            :key="header.text"
            :class="['column sortable',
                     pagination.descending ? 'desc' : 'asc',
                     header.value === pagination.sortBy ? 'active' : '']"
            @click="changeSort(header.value)"
          >
            {{ header.text }}
            <e-icon :class="b('sort-icon', { desc: pagination.descending, active: header.value === pagination.sortBy})"
                    icon="i-arrow--down"
                    width="10"
                    height="10"
                    inline/>
          </th>
          <th v-if="hasLink">
            <span v-t="'c-table.linkLabel'" class="invisible"></span>
          </th>
        </tr>
      </template>

      <!-- TABLE-BODY -->
      <template slot="items" slot-scope="props">
        <tr :active="props.selected"
            :class="b('content-row',
                      { selected: selected.includes(props.item.id), isClickable: isRowClickable && !isDisabled })"
            :role="rowRole"
            @click="onClickRow(props.item)"
        >
          <!-- Optional select row cell -->
          <td v-if="isSelectable">
            <e-checkbox v-model="selected"
                        :value="props.item.id"
                        :name="`table-${uuid}-select-row`"
                        :disabled="isDisabled">
              <span v-t="'c-table.selectItem'" class="invisible"></span>
            </e-checkbox>
          </td>

          <!-- @slot Renders the cell templates -->
          <slot :props="props" :headers="headers">
            <!-- Fallback content -->
            <td v-for="headerItem in headers" :key="headerItem.value">
              {{ props.item[headerItem.value] }}
            </td>
          </slot>

        </tr>
      </template>
    </v-data-table>

    <!-- PAGINATION (optional) -->
    <div v-if="hasPagination" :class="b('pagination-wrapper')">
      <c-table-pagination :total-amount="pagination.totalItems"
                          :rows-per-page-value="pagination.rowsPerPage"
                          :current-page="pagination.page"
                          @updateRowsPerPage="onUpdateRowsPerPage"
                          @changePage="onChangePage"
      />
    </div>
  </div>
</template>

<script>
  import * as VDataTable from 'vuetify/es5/components/VDataTable';
  import cTablePagination from '@/components/c-table-pagination';
  import uuid from '@/mixins/uuid';

  /**
   * This component wraps the vuetify table "v-data-table" and styles the table.
   * It uses a slot-scope for rendering the cells (except the select-row cell)
   */
  export default {
    name: 'c-table',
    components: {
      ...VDataTable,
      cTablePagination,
    },
    mixins: [
      uuid,
    ],

    props: {
      /**
       * The list of all the items.
       */
      items: {
        type: Array,
        required: true,
      },

      /**
       * The list of headers.
       */
      headers: {
        type: Array,
        required: true,
      },

      /**
       * The optional search term to filter the table.
       */
      searchTerm: {
        type: String,
        default: '',
      },

      /**
       * Flag shows/hides the pagination bar.
       */
      hasPagination: {
        type: Boolean,
        default: false,
      },

      /**
       * Flag makes the rows selectable by a checkbox.
       */
      isSelectable: {
        type: Boolean,
        default: false,
      },

      /**
       * Flag shows the detail link icon. (Needed to render the header, the cell comes in the slot)
       */
      hasLink: {
        type: Boolean,
        default: false,
      },

      /**
       * Flag set's disabled state to every interaction of the table.
       */
      isDisabled: {
        type: Boolean,
        default: false,
      },

      /**
       * Flag set's if the row itself is clickable.
       */
      isRowClickable: {
        type: Boolean,
        default: false,
      },

      /**
       * Defines the attribute role for the rows.
       */
      rowRole: {
        type: [String, Boolean],
        default: false,
      }
    },

    data() {
      return {
        /**
         * @type {Array} selected - The list of selected rows (ids).
         */
        selected: [],

        /**
         * @type {Object} pagination - The default pagination setup.
         */
        pagination: {
          rowsPerPage: this.hasPagination ? 10 : 9999,
        }
      };
    },

    // computed: {},
    watch: {
      /**
       * Observes the selected lists and sends the update event on every change.
       */
      selected() {
        /**
         * Sends the event by every change of the selected rows.
         *
         * @event onChangeSelected
         * @property {Array} - The list of all the selected elements.
         */
        this.$emit('onChangeSelected', this.selected);
      }
    },

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
      /**
       * Toggles the select all option.
       */
      toggleAll() {
        if (this.selected.length) {
          this.selected = [];
        } else {
          this.selected = this.items.map(item => item.id);
        }
      },

      /**
       * Changes the sorting by a column.
       *
       * @param {String} column - The name of the column (header).
       */
      changeSort(column) {
        if (this.pagination.sortBy === column) {
          this.pagination.descending = !this.pagination.descending;
        } else {
          this.pagination.sortBy = column;
          this.pagination.descending = false;
        }
      },

      /**
       * Changes the parameter which handles the amount of rows per page.
       *
       * @param {Number} value - The amount of rows.
       */
      onUpdateRowsPerPage({ value }) {
        this.pagination.rowsPerPage = parseInt(value, 10);
      },

      /**
       * The change page handler.
       *
       * @param {Number} page - The page number.
       */
      onChangePage(page) {
        this.pagination.page = page;
      },

      /**
       * The row click handler.
       *
       * @param {Object} item - The underlying item.
       */
      onClickRow(item) {
        if (this.isRowClickable && !this.isDisabled) {
          /**
           * Sends the event when a row gets clicked.
           *
           * @event clickRow
           * @type {Object} payload
           * @type {Object} payload.item - The underlying item of the clicked row.
           */
          this.$emit('clickRow', { item });
        }
      }
    },
    // render() {},
  };
</script>

<style lang="scss">
  .c-table {
    $this: &;

    @include font($font-size--14, 18px);

    color: $color-grayscale--400;

    &__header-row {
      background-color: $color-grayscale--700;
      border-top: 1px solid $color-grayscale--600;
    }

    &__sort-icon {
      margin-left: $spacing--5;

      path {
        fill: transparent;
      }
    }

    &__sort-icon--active {
      path {
        fill: $color-grayscale--200;
      }
    }

    // stylelint-disable selector-class-pattern
    th.column.sortable:hover {
      #{$this}__sort-icon {
        path {
          fill: $color-grayscale--500;
        }
      }

      #{$this}__sort-icon--active {
        path {
          fill: $color-grayscale--200;
        }
      }
    }

    &__sort-icon--desc {
      transform: rotate(180deg);
    }

    &__content-row {
      color: $color-grayscale--200;
      border-top: 1px solid $color-grayscale--500;
    }

    &__content-row:last-child {
      border-bottom: 1px solid $color-grayscale--500;
    }

    &__content-row--selected {
      background-color: $color-grayscale--700;
      border-color: $color-secondary--1;

      &:last-child {
        border-color: $color-secondary--1;
      }
    }

    &__content-row--selected + &__content-row {
      border-top: 1px solid $color-secondary--1;
    }
    
    &__content-row--is-clickable {
      cursor: pointer;

      &:hover {
        background-color: $color-grayscale--700;
      }
    }
    
    &__link {
      display: flex;
      justify-content: flex-end;
    }

    table.v-table thead tr,
    table.v-table tbody tr {
      height: 40px;
      transition: none;
      will-change: unset;
    }

    table.v-table thead th,
    table.v-table tbody td {
      @include font($font-size--14, 18px);
    }

    table.v-table thead td:not(:nth-child(1)),
    table.v-table tbody td:not(:nth-child(1)),
    table.v-table thead th:not(:nth-child(1)),
    table.v-table tbody th:not(:nth-child(1)),
    table.v-table thead td:first-child,
    table.v-table tbody td:first-child,
    table.v-table thead th:first-child,
    table.v-table tbody th:first-child {
      padding: 0 $spacing--10;

      @include media(sm) {
        padding: 0 $spacing--20;
      }
    }
    
    .v-datatable__progress {
      display: none;
    }

    &--no-results {
      .v-table__overflow {
        border-bottom: 1px solid $color-grayscale--500;
      }

      #{$this}__header-row {
        border-bottom: 1px solid $color-grayscale--600;
      }
    }

    .e-checkbox {
      height: 17px; // Is needed to align the checkbox with the table row cells.
    }
  }
</style>
