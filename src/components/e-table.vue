<template>
  <table :class="b()">
    <!-- @slot Allows to display a customized header row. -->
    <slot
      :columns="columns"
      :sortBy="sortBy"
      :sortAscending="sortAscending"
      name="header"
    >
      <tr :class="b('header-row')">
        <th
          v-for="column in columns"
          :key="column.key"
          :class="b('header-cell', { 'text': column.align || 'left' })"
        >
          <!-- Adding the support for functions was needed, to change visibility state dynamically (improved a11y) -->
          <span :class="isHeaderLabelVisible(column) ? 'invisible' : null">
            <!-- Adding the support for functions was needed, to allow the use of translations in the header row -->
            {{ typeof column.title === 'function' ? column.title() : column.title }}
          </span>
          <button
            v-if="column.sortable"
            :class="b('button-sort', getSortButtonModifiers(column))"
            :aria-label="$t('e-table.sort', { name: column.title })"
            @click="onClickSort(column)"
          ></button>
        </th>
      </tr>
    </slot>
    <tr
      v-for="(item, itemIndex) in itemsSorted"
      :key="itemIndex"
      :class="b('data-row', { disabled: item.disabled })"
    >
      <td
        v-for="(column, columnIndex) in columns"
        :key="columnIndex"
        :class="b('data-cell', { text: column.align || 'left', hasEvent: !!column.onClick })"
        @click="column.onClick ? column.onClick(item, column) : null"
      >
        <!-- @slot Use this dynamic slot to add custom templates to the cells -->
        <slot
          :name="column.slotName"
          :item="item"
          :column="column"
        >
          {{ item[column.key] }}
        </slot>
      </td>
    </tr>
    <!-- @slot Allows to display a customized 'no results' row. -->
    <slot v-if="!itemsSorted.length" name="noResults">
      <tr>
        <td
          v-text="$t('e-table.noResults')"
          :colspan="columns.length"
          :class="b('no-results')"
        ></td>
      </tr>
    </slot>
  </table>
</template>

<script>

  /**
   * This component renders a table based on a given column setup and an array of row items.
   * By default, the cell values are used as text.
   *
   * Custom cell templates can be defined by defining a 'slotName' for a column and give a custom template
   * by using an identical named slot binding ('v-slot:\<slotName\>') to the component.
   */
  export default {
    name: 'e-table',
    status: 0, // TODO: remove when component was prepared for current project.

    // components: {},
    // mixins: [],

    props: {
      /**
       * Array of data objects to render in table.
       *
       * @property {Boolean} [disabled = false] - Disables the interaction with the current row.
       */
      items: {
        type: Array,
        required: true,
      },

      /**
       * Array of column definition objects.
       *
       * @property {String} title - Column title.
       * @property {String} [key] - Column identifier on the rows.
       * @property {String} [titleHidden = false] - Title visibility state.
       * @property {String} [slotName] - Dynamic slot name for optional cell templates.
       * @property {String} [align = 'left'] - A flag to set the column alignment (default: 'left', options: 'center', 'right').
       * @property {Boolean} [sortable = false] - A flag that specifies whether the column is sortable or not.
       * @property {Function} [sort = (a, b) => a > b] - A custom sort function that might be passed for each column.
       * @property {Function} [onClick] - Allows to define a click handler for each cell.
       *
       */
      columns: {
        type: Array,
        required: true,
      },
    },
    data() {
      return {
        /**
         * @type {Object} The currently selected 'column' to be sorted.
         */
        sortBy: null,

        /**
         * @type {Boolean} Holds to sort direction in case a 'sortBy' is active.
         */
        sortAscending: true,
      };
    },

    computed: {
      /**
       * Returns a sorted copy of the table-items.
       *
       * @returns {Array.<Object>}
       */
      itemsSortedBy() {
        const items = this.items.slice();

        if (this.sortBy) {
          const sort = typeof this.sortBy.sort === 'function'
            ? this.sortBy.sort
            : (a, b) => a[this.sortBy.key].localeCompare(b[this.sortBy.key]);

          items.sort(sort);
        }

        return items;
      },

      /**
       * Reverts the sort direction if required.
       *
       * @returns {Array.<Object>}
       */
      itemsSorted() {
        if (!this.sortAscending) {
          return this.itemsSortedBy.slice().reverse();
        }

        return this.itemsSortedBy;
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
    // beforeDestroy() {},
    // destroyed() {},

    methods: {
      /**
       * Will set the sort-parameters.
       *
       * @param {Object} column - Object which holds the information about the current column.
       */
      onClickSort(column) {
        if (this.sortBy === column) {
          const asc = this.sortAscending;

          if (!asc) {
            this.sortBy = null;
          }

          this.sortAscending = !asc;
        } else {
          this.sortBy = column;
          this.sortAscending = true;
        }
      },

      /**
       * Checks if the given column should display the header label.
       *
       * @param {Object} column - A column definition object.
       *
       * @returns {Boolean}
       */
      isHeaderLabelVisible(column) {
        return !!(typeof column.titleHidden === 'function' ? column.titleHidden() : column.titleHidden);
      },

      /**
       * Calculates a sort button modifier object.
       *
       * @param {Object} column - A column definition object.
       *
       * @returns {Object}
       */
      getSortButtonModifiers(column) {
        const active = this.sortBy === column;

        return {
          active,
          desc: active && !this.sortAscending
        };
      }
    },
    // render() {},
  };
</script>

<style lang="scss">
  @use '../setup/scss/mixins';
  @use '../setup/scss/variables';
  // TODO replace @extend by mixin
  // stylelint-disable-next-line no-invalid-position-at-import-rule
  @import '../setup/scss/extends/button-reset';

  .e-table {
    $this: &;

    width: 100%;

    &__header-row {
      border-bottom: 2px solid variables.$color-grayscale--0;
    }

    &__header-cell {
      @include mixins.font(variables.$font-size--14);

      padding-bottom: variables.$spacing--10;
      color: variables.$color-grayscale--0;
    }

    &__header-cell--text-center {
      text-align: center;
    }

    &__header-cell--text-right {
      text-align: right;
    }

    &__data-row {
      border-bottom: 1px solid variables.$color-grayscale--0;

      &--disabled {
        position: relative;
        pointer-events: none;

        #{$this}__data-cell {
          opacity: 0.5;
        }
      }
    }

    &__button-sort {
      @extend %button-reset;

      display: inline-block;
      height: 0;
      width: 0;
      opacity: 0.3;
      border: 10px solid transparent;
      border-bottom-color: variables.$color-grayscale--0;

      &--desc {
        border-bottom-color: transparent;
        border-top-color: variables.$color-grayscale--0;
      }

      &--active {
        opacity: 1;
      }
    }

    &__data-cell {
      @include mixins.font(variables.$font-size--14);

      position: relative;
      color: variables.$color-secondary--1;
      padding: variables.$spacing--10 0;

      &--text-center {
        text-align: center;
      }

      &--text-right {
        text-align: right;
      }

      &--has-event {
        cursor: pointer;
      }
    }

    &__no-results {
      font-size: variables.$font-size--14;
      padding-top: variables.$spacing--15;
      padding-bottom: variables.$spacing--15;
    }
  }
</style>
