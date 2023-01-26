<template>
  <table :class="b({ enableRowLinks, hasRowLinks: !!rowHref })"
         :style="{ '--e-table--toggle-row-height': `${toggleButtonHeight}px` }"
         @contextmenu.capture="onContextMenu"
         @mousedown.capture="onMouseDown"
         @mouseup="onMouseUp($event)"
  >
    <!-- @slot Allows to display a customized header row. -->
    <slot
      :columns="columns"
      :sort-by="sortBy"
      :sort-ascending="sortAscending"
      name="header"
    >
      <tr v-if="isMobile"
          :class="b('toggle-row')"
      >
        <th :colspan="colspan">
          <div :id="`button--${uuid}`"
               ref="toggleButton"
               :class="b('toggle')"
               role="button"
               @click.prevent="toggleSortingOptions"
          >
            {{ $t('e-table.toggleSortingOptions') }}
          </div>
        </th>
      </tr>
      <tr :class="b('header-row')">
        <template v-if="showSortingOptions">
          <th v-if="selectable"
              :class="b('header-cell', { selectColumn: true })"
          >
            <e-checkbox :checked="!!selectedInternal.length"
                        :disabled="disabled"
                        value="0"
                        name="total"
                        @change="toggleAll"
            >

              <!-- eslint-disable-next-line vue/attributes-order -->
              <span v-if="!!selectedInternal.length" :class="{ invisible : !showSortingOptions || !isMobile}">
                {{ $t('e-table.deselectAll') }}
              </span>
              <!-- eslint-disable-next-line vue/attributes-order -->
              <span v-else :class="{ invisible : !showSortingOptions || !isMobile }">
                {{ $t('e-table.selectAll') }}
              </span>
            </e-checkbox>
          </th>

          <th
            v-for="column in columns"
            :key="column.key"
            :class="b('header-cell', headerCellModifiers(column))"
          >
            <button
              v-if="column.sortable !== false"
              :class="b('sort', sortButtonModifiers(column))"
              :aria-label="$t('e-table.sort', { name: column.title })"
              type="button"
              @click="onClickSort(column)"
            >
              <span :class="[b('sort-label'), { invisible: !isHeaderLabelVisible(column) }]">
                <!-- Adding the support for functions was needed, to allow the use of translations in the header row -->
                {{ typeof column.title === 'function' ? column.title() : column.title }}
              </span>
              <e-icon icon="arrow--down"
                      width="16"
                      height="16"
                      inline
              />
            </button>
            <span v-else :class="[b('sort-label'), { invisible: !$viewport.isMd || !isHeaderLabelVisible(column) }]">
              <!-- Adding the support for functions was needed, to allow the use of translations in the header row -->
              {{ typeof column.title === 'function' ? column.title() : column.title }}
            </span>
          </th>
        </template>

        <th v-if="hasDetailRows"
            :class="b('header-cell', { hidden: true })"
        >
          <span class="invisible">
            {{ $t('e-table.showDetailsHeader') }}
          </span>
        </th>
      </tr>
    </slot>
    <template v-for="(item, itemIndex) in itemsSorted">

      <tr
        :key="itemIndex"
        :class="b('data-row', { disabled: item.disabled })"
      >
        <td v-if="selectable"
            :class="b('data-cell')"
        >
          <div :class="b('select-column')">
            <e-checkbox v-model="selectedInternal"
                        :value="item[itemIdentifier]"
                        :name="`e-table__selection--${uuid}`"
                        :disabled="disabled"
            >
              <span :class="{ invisible : !isMobile}">
                {{ $t('e-table.selectItem') }}
              </span>
            </e-checkbox>
          </div>
        </td>
        <td
          v-for="(column, columnIndex) in columns"
          :key="columnIndex"
          :class="b('data-cell', cellModifiers(column))"
          :data-label="columnTitle(column)"
          @click="column.onClick || rowHref ? onCellClick(item, column, $event) : null"
        >
          <a v-if="!column.onClick && typeof rowHref === 'function'"
             :class="b('cell-link')"
             :href="rowHref(item) || '#'"
             :title="rowTitle(item)"
             tabindex="-1"
          ></a>

          <!-- @slot The default 'date' cell formatting for the project. Can be overwritten by a locale <template #date> -->
          <slot v-if="column.slotName === 'date'"
                :item="item"
                :column="column"
                name="date"
          >
            {{ $dayjs(item[column.key]).format('DD.MM.YYYY') }}
          </slot>
          <!-- @slot Use this dynamic slot to add custom templates to the cells -->
          <slot
            v-else
            :name="column.slotName"
            :item="item"
            :column="column"
          >
            {{ item[column.key] }}
          </slot>
        </td>

        <td v-if="hasDetailRows"
            :class="b('data-cell', { detailToggle: true })"
            :data-label="$t('e-table.showDetailsHeader')"
            @click.self="onDetailToggleClick(item)"
        >
          <label :class="b('detail-toggle-label')">
            <input v-model="expandedRowsComputed"
                   :class="b('detail-toggle-input')"
                   :value="item[itemIdentifier]"
                   type="checkbox"
                   name="details"
            >
            <e-icon :class="b('detail-toggle-icon')"
                    icon="arrow--down"
                    :alt="$t('e-table.showDetailsHeader')"
            />
          </label>
        </td>
      </tr>
      <tr v-if="hasDetailRows && expandedRows.includes(item)"
          :key="`detail--${itemIndex}`"
          :class="b('detail-row')"
      >
        <td :colspan="colspan">
          <!-- @slot Slot can be used to show detail information for a row. -->
          <slot name="detailRow"
                :item="item"
          ></slot>
        </td>
      </tr>
    </template>
    <!-- @slot Allows to display a customized 'no results' row. -->
    <slot v-if="!itemsSorted.length" name="noResults" :columns="columns">
      <tr>
        <td
          :colspan="columns.length"
          :class="b('no-results')"
        >
          {{ $t('e-table.noResults') }}
        </td>
      </tr>
    </slot>
    <tfoot v-else-if="$scopedSlots.footer">
      <tr :class="b('footer-row')">
        <td
          :colspan="colspan"
          :class="b('footer-cell')"
        >
          <slot name="footer" :columns="columns"></slot>
        </td>
      </tr>
    </tfoot>
  </table>
</template>

<script>
  import uuid from '@/mixins/uuid';
  import eIcon from '@/elements/e-icon';
  import eCheckbox from '@/elements/e-checkbox';

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

    components: {
      eCheckbox,
      eIcon,
    },
    mixins: [
      uuid,
    ],

    model: {
      /**
       * Changes v-model behavior and use 'checked' instead of 'value' as prop.
       * Avoids conflict with default value attribute.
       */
      prop: 'selected',
      event: 'select',
    },

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
       * @property {Boolean} [titleHidden = false] - Title visibility state.
       * @property {String} [slotName] - Dynamic slot name for optional cell templates.
       * @property {String} [align = 'left'] - A flag to set the column alignment (default: 'left', options: 'center', 'right').
       * @property {Boolean} [sortable = false] - A flag that specifies whether the column is sortable or not.
       * @property {Function} [sort = (a, b) => a > b] - A custom sort function that might be passed for each column.
       * @property {Function} [onClick] - Allows to define a click handler for each cell.
       */
      columns: {
        type: Array,
        required: true,
      },

      /**
       * Accepts a method to generate a link for each row (except for columns with 'onClick' callback).
       *
       * @param {Object} rowLink - A definition for the row link.
       * @param {Object} rowLink.href - The link for the row link element.
       * @param {Object} rowLink.title - The title for the row link element.
       */
      rowLink: {
        type: Object,
        default: null,
        validator(rowLink) {
          return rowLink.href && rowLink.title;
        },
      },

      /**
       * Allows to set an Array of selected items.
       */
      selected: {
        type: Array,
        default: () => [],
      },

      /**
       * Adds a checkbox to each row to allow selections.
       */
      selectable: {
        type: Boolean,
        default: false,
      },

      /**
       * Disables the tables interaction features.
       */
      disabled: {
        type: Boolean,
        default: false,
      },

      /**
       * Determines if the table should show an additional column to toggle row details.
       */
      hasDetailRows: {
        type: Boolean,
        default: false,
      },

      /**
       * Allows to change the identifier property for a row item by which it will be identified internally.
       */
      itemIdentifier: {
        type: String,
        default: 'id',
      },
    },
    data() {
      return {
        /**
         * @type {Boolean} Holds a flag if sorting options are visible
         */
        showSortingOptions: true,

        /**
         * @type {Object} The currently selected 'column' to be sorted.
         */
        sortBy: null,

        /**
         * @type {Boolean} Holds to sort direction in case a 'sortBy' is active.
         */
        sortAscending: true,

        /**
         * @type {Boolean} Holds a flag if row links should be enabled.
         */
        enableRowLinks: false,

        /**
         * @type {Boolean} Holds a flag if there is currently a text selection inside the component.
         */
        hasSelection: false,

        /**
         * @type {Number} Holds the height of the sorting list toggle button.
         */
        toggleButtonHeight: 0,

        /**
         * Row items that should be displayed in expanded state.
         */
        expandedRows: [],
      };
    },

    computed: {
      /**
       * Checks if current viewport is mobile (<= sm).
       *
       * @returns {Boolean}
       */
      isMobile() {
        return !this.$viewport.isSm;
      },

      /**
       * Returns the href generator method of the rowLink.
       *
       * @returns {Function}
       */
      rowHref() {
        return this.rowLink?.href;
      },

      /**
       * Manages changes for the select prop.
       */
      selectedInternal: {
        get() {
          return this.selected.map(item => item[this.itemIdentifier]);
        },
        set(itemIds) {
          this.$emit('select', this.items.filter(item => itemIds.includes(item[this.itemIdentifier])));
        },
      },

      /**
       * Handles changes to the 'expandedRows' prop.
       */
      expandedRowsComputed: {
        get() {
          return this.expandedRows.map(item => item[this.itemIdentifier]);
        },
        set(itemIds) {
          this.expandedRows = this.items.filter(item => itemIds.includes(item[this.itemIdentifier]));
        },
      },

      /**
       * Returns a sorted copy of the table-items.
       *
       * @returns {Array.<Object>}
       */
      itemsSortedBy() {
        const { sortBy } = this;
        const items = this.items.slice();

        if (sortBy) {
          const sort = typeof this.sortBy.sort === 'function'
            ? sortBy.sort
            : this.sortByFieldConstructor(sortBy.key);

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

      /**
       * Counts the amount for columns that the table has.
       *
       * @returns {Number}
       */
      colspan() {
        let count = this.columns.length;

        if (this.selectable) {
          count += 1;
        }

        if (this.hasDetailRows) {
          count += 1;
        }

        return count;
      },
    },
    watch: {
      /**
       * Observes the current viewport and sets flag to show table sorting as a collapsible menu.
       */
      isMobile: {
        immediate: true,
        handler() {
          this.showSortingOptions = !this.isMobile;
        },
      },
    },

    // beforeCreate() {},
    created() {
      if (this.isMobile) {
        window.addEventListener('resizeend', this.updateToggleButtonHeight);
      } else {
        window.removeEventListener('resizeend', this.updateToggleButtonHeight);
      }
    },
    // beforeMount() {},
    // mounted() {},
    // beforeUpdate() {},
    // updated() {},
    // activated() {},
    // deactivated() {},
    // beforeDestroy() {},
    destroyed() {
      window.removeEventListener('resizeend', this.updateToggleButtonHeight);
    },

    methods: {
      /**
       * Returns the title of the actual table column.
       * @param {Object} column - The table column data object.
       *
       * @returns {String|null}
       */
      columnTitle(column) {
        switch (typeof column?.title) {
          case 'string':
            return column.title;

          case 'function':
            return column.title() || null;

          default:
            return null;
        }
      },

      /**
       * Toggle the visibility for the sorting options.
       */
      toggleSortingOptions() {
        if (this.isMobile) {
          this.updateToggleButtonHeight();
        }
        this.showSortingOptions = !this.showSortingOptions;
      },

      /**
       * Get the height of the sorting list toggle button.
       */
      updateToggleButtonHeight() {
        this.toggleButtonHeight = this.$refs.toggleButton.clientHeight;
      },

      /**
       * Returns a title for the row link, based on the type of the definition.
       *
       * @param {Object} item - The rows related data object.
       *
       * @returns {String|null}
       */
      rowTitle(item) {
        const { rowLink } = this;

        switch (typeof rowLink?.title) {
          case 'string':
            return rowLink.title;

          case 'function':
            return rowLink.title(item) || null;

          default:
            return null;
        }
      },

      /**
       * Toggles the select all option.
       */
      toggleAll() {
        if (this.selectedInternal.length) {
          this.selectedInternal = [];
        } else {
          this.selectedInternal = this.items.map(item => item[this.itemIdentifier]);
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
        // Adding the support for functions was needed, to change visibility state dynamically (improved a11y).
        return !!(typeof column.titleHidden === 'function' ? column.titleHidden() : column.titleHidden !== true);
      },

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
       * Calculates a sort button modifier object.
       *
       * @param {Object} column - A column definition object.
       *
       * @returns {Object}
       */
      sortButtonModifiers(column) {
        const active = this.sortBy === column;

        return {
          active,
          desc: active && !this.sortAscending,
        };
      },

      /**
       * Returns BEM modifiers for header cells.
       *
       * @param {Object} column - The related column.
       *
       * @returns {Object}
       */
      headerCellModifiers(column) {
        return {
          align: column.align || 'left',
          col: column.key,
          hidden: (!this.$viewport.isMd && column.sortable === false) || !this.isHeaderLabelVisible(column),
          sortable: column.sortable !== false,
        };
      },

      /**
       * Returns BEM modifiers for cells.
       *
       * @param {Object} column - The related column.
       *
       * @returns {Object}
       */
      cellModifiers(column) {
        return {
          align: column.align || 'left',
          hasEvent: !!column.onClick,
          col: column.key,
          sortable: column.sortable !== false,
          nowrap: column.nowrap,
        };
      },

      /**
       * Returns a sort function which will sort the elements of an Array by the given field.
       *
       * @param {String} field - The field by which the items should be sorted.
       *
       * @returns {Function}
       */
      sortByFieldConstructor(field) {
        return (a, b) => {
          const aValue = a[field];
          const bValue = b[field];

          switch (true) {
            case typeof aValue === 'string':
              return aValue.localeCompare(bValue, undefined, { numeric: true }); // eslint-disable-line no-undefined

            case typeof aValue === 'number':
              return aValue > bValue ? 1 : -1;

            case typeof aValue === 'boolean':
              return !aValue ? 1 : -1;

            case aValue instanceof Date:
              return this.$dayjs(aValue).isAfter(bValue) ? 1 : -1;

            default:
              return 0;
          }
        };
      },

      /**
       * Enables the row link for a few ms to allow link specific context menus (even IE11).
       */
      enableRowLink() {
        if (this.rowHref && !this.hasSelection) { // It was not possible to test for rowHref when binding the event in the template.
          this.enableRowLinks = true;

          setTimeout(() => {
            this.enableRowLinks = false;
          }, 100);
        }
      },

      /**
       * Callback for the tables mousedown event.
       */
      onMouseDown() { // All browsers
        this.hasSelection = !!window.getSelection()?.toString();
      },

      /**
       * Callback for the tables contextmenu event.
       */
      onContextMenu() { // Chromium, webkit: mousedown, contextmenu
        this.enableRowLink();

        setTimeout(() => {
          window.getSelection().removeAllRanges(); // Safari marks words on right click by default, which would cause trouble on next context event.
        });
      },

      /**
       * Callback for the tables mouseup event.
       *
       * @param {PointerEvent} event - The related DOM event.
       */
      onMouseUp(event) { // FF: mousedown, mouseup, contextmenu
        if (!this.enableRowLinks) {
          // Firefox marks a cells content when holding ctrl/meta while clicking it.
          this.hasSelection = !(event.ctrlKey || event.metaKey) && !!window.getSelection()?.toString();

          this.enableRowLink();
        }
      },

      /**
       * Callback for clicks within a row.
       *
       * @param {Object} item - The item related to the cell.
       * @param {Object} column - The column definition related to the cell.
       * @param {PointerEvent} event - The DOM related event.
       */
      onCellClick(item, column, event) {
        if (this.hasSelection) { // Cancel cell action if a text selection is active.
          return;
        }

        if (column.onClick) {
          column?.onClick?.(item, column, event);
        } else {
          const url = this.rowHref(item, column);

          if (event.ctrlKey || event.metaKey) {
            window.open(url, '_blank');
          } else {
            window.location = url;
          }
        }
      },

      /**
       * Click callback for the toggle cell (increases click area on mobile).
       *
       * @param {Object} item - The item for the clicked row.
       */
      onDetailToggleClick(item) {
        const id = item[this.itemIdentifier];

        if (id) {
          const expandedRows = this.expandedRowsComputed.slice();

          if (expandedRows.includes(id)) {
            this.expandedRowsComputed = expandedRows.filter(itemId => itemId !== id);
          } else {
            expandedRows.push(id);

            this.expandedRowsComputed = expandedRows;
          }
        }
      },
    },
    // render() {},
  };
</script>

<style lang="scss">
  @use '../setup/scss/mixins';
  @use '../setup/scss/variables';

  .e-table {
    $this: &;

    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;

    @include mixins.media(sm) {
      display: table;
    }

    &__toggle-row {
      position: sticky;
      top: 0;
      background-color: variables.$color-grayscale--1000;
      z-index: 1;
    }

    &__toggle {
      border-bottom: 0;
      cursor: pointer;
      display: block;
      padding: variables.$spacing--10 0;
      position: relative;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    &__toggle-icon {
      position: absolute;
      left: variables.$spacing--5;
      top: 50%;
      transform: translateY(-50%);
      transition: transform variables.$transition-duration--200 ease;

      &--open {
        transform: translateY(-50%) rotate(180deg);
      }
    }

    &__header-row {
      border-bottom: 2px solid variables.$color-grayscale--0;
      background-color: variables.$color-grayscale--1000;
      display: flex;
      flex-direction: column;
      position: sticky;
      top: calc(var(--header-height, 0px) + var(--e-table--toggle-row-height, 0px));
      z-index: 1;

      @include mixins.media(sm) {
        background-color: inherit;
        display: table-row;
        top: auto;
      }
    }

    &__header-cell {
      padding-bottom: variables.$spacing--10;
      color: variables.$color-grayscale--0;
      vertical-align: bottom;

      &:first-child {
        @include mixins.media(sm) {
          padding-left: variables.$spacing--5;
        }
      }

      &:last-child:not(&--sortable) {
        @include mixins.media(sm) {
          padding-right: variables.$spacing--5;
        }
      }

      &--select-column {
        width: auto;
        vertical-align: middle;

        @include mixins.media(sm) {
          width: 1px; // Forces minimal width for checkbox column.
        }
      }

      &--text-center {
        text-align: center;
      }

      &--text-right {
        text-align: right;
      }

      &--hidden {
        padding: 0;
      }
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

    &__sort {
      display: flex;
      align-items: center;

      .e-icon {
        opacity: 0.3;
        transform: rotate(180deg);
        margin-left: variables.$spacing--5;
      }

      &--desc {
        .e-icon {
          transform: none;
        }
      }

      &--active {
        .e-icon {
          opacity: 1;
        }
      }
    }

    &__sort-label {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    &__data-cell {
      display: flex;
      justify-content: space-between;
      position: relative;
      padding: variables.$spacing--5;
      text-align: right;

      // This is a hacky solution for a FF issue where the background color overlaps the border.
      // See: https://bugzilla.mozilla.org/show_bug.cgi?id=688556
      // https://sonepar-suisse.atlassian.net/browse/WF-5573
      background-clip: padding-box;

      @include mixins.media(sm) {
        display: table-cell;
        padding: variables.$spacing--5 variables.$spacing--20 variables.$spacing--5 0;
        text-align: inherit;
      }

      &::before {
        content: attr(data-label);
        margin-right: variables.$spacing--10;
        text-align: left;

        @include mixins.media(sm) {
          display: none;
        }
      }

      &:first-child {
        @include mixins.media(sm) {
          padding-left: variables.$spacing--5;
        }
      }

      &:last-child {
        padding-right: variables.$spacing--5;
      }

      &:nth-child(odd) {
        background-color: variables.$color-grayscale--700;

        @include mixins.media(sm) {
          background-color: inherit;
        }
      }

      &--align-center {
        text-align: center;
      }

      &--align-right {
        text-align: right;
      }

      &--has-event {
        cursor: pointer;
      }

      &--nowrap {
        white-space: nowrap;
      }

      &--detail-toggle {
        padding-right: variables.$spacing--5;
        text-align: right;
      }
    }

    &__select-column {
      margin-left: -(variables.$spacing--10);
      text-align: left;
      width: 100%;

      @include mixins.media(sm) {
        margin-left: 0;
      }
    }

    &__footer-row {
      border-bottom: 3px solid variables.$color-grayscale--500;
      color: variables.$color-grayscale--200;
    }

    &__footer-cell {
      padding: variables.$spacing--15 variables.$spacing--2;
    }

    &__cell-link {
      position: absolute;
      display: block;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      pointer-events: none;
    }

    &__no-results {
      padding-top: variables.$spacing--15;
      padding-bottom: variables.$spacing--15;
    }

    &--has-row-links {
      #{$this}__data-row {
        cursor: pointer;
      }
    }

    &--enable-row-links {
      #{$this}__cell-link {
        pointer-events: auto;
      }
    }

    &__detail-toggle-label {
      margin: 0;
      cursor: pointer;
    }

    &__detail-toggle-input {
      position: absolute;
      visibility: hidden;
      pointer-events: none;
      -webkit-appearance: none;

      &:checked ~ #{$this}__detail-toggle-icon {
        transform: rotate(180deg);
      }
    }

    &__detail-toggle-icon {
      transition: transform variables.$transition-duration--200;
    }

    &__detail-row {
      border-bottom: 1px solid variables.$color-grayscale--600;
      padding: 0 variables.$spacing--10;
    }
  }
</style>
