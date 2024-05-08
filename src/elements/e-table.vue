<template>
  <table
    :class="b({ enableRowLinks, hasRowLinks: !!rowLink?.href })"
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
      <tr
        v-if="isMobile"
        :class="b('toggle-row')"
      >
        <th :colspan="colspan">
          <button
            ref="toggleButton"
            :class="b('toggle')"
            type="button"
            @click.prevent="toggleSortingOptions"
          >
            {{ $t('e-table.toggleSortingOptions') }}
          </button>
        </th>
      </tr>
      <tr :class="b('header-row')">
        <template v-if="showSortingOptions">
          <th
            v-if="selectable"
            :class="b('header-cell', { selectColumn: true })"
          >
            <e-checkbox
              v-model="toggleAllValue"
              :disabled="disabled"
              value="0"
              name="total"
            >
              <span :class="{ invisible: !showSortingOptions || !isMobile }">
                {{ selectedInternal.length ? $t('e-table.deselectAll') : $t('e-table.selectAll') }}
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
              <e-icon
                icon="i-arrow--down"
                width="16"
                height="16"
                inline
              />
            </button>
            <span
              v-else
              :class="[b('sort-label'), { invisible: !$viewport.isMd || !isHeaderLabelVisible(column) }]"
            >
              <!-- Adding the support for functions was needed, to allow the use of translations in the header row -->
              {{ typeof column.title === 'function' ? column.title() : column.title }}
            </span>
          </th>
        </template>

        <th
          v-if="hasDetailRows"
          :class="b('header-cell', { hidden: true })"
        >
          <span class="invisible">
            {{ $t('e-table.showDetailsHeader') }}
          </span>
        </th>
      </tr>
    </slot>

    <template
      v-for="(item, itemIndex) in itemsSorted"
      :key="item[itemIdentifier] || itemIndex"
    >
      <tr :class="b('data-row', { disabled: item.disabled })">
        <td
          v-if="selectable"
          :class="b('data-cell')"
        >
          <div :class="b('select-column')">
            <e-checkbox
              v-model="selectedInternal"
              :value="item[itemIdentifier]"
              :name="`e-table__selection--${uuid}`"
              :disabled="disabled"
            >
              <span :class="{ invisible: !isMobile }">
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
          @click="column.onClick || rowLink?.href ? onCellClick(item, column, $event) : null"
        >
          <a
            v-if="!column.onClick && typeof rowLink?.href === 'function'"
            :class="b('cell-link')"
            :href="rowLink.href(item) || '#'"
            :title="rowTitle(item)"
            tabindex="-1"
          ></a>

          <!-- @slot The default 'date' cell formatting for the project. Can be overwritten by a locale <template #date> -->
          <slot
            v-if="column.slotName === 'date'"
            :item="item"
            :column="column"
            name="date"
          >
            {{ $dayjs(item[column.key] as Date).format(DateFormat.DD_MM_YYYY) }}
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

        <td
          v-if="hasDetailRows"
          :class="b('data-cell', { detailToggle: true })"
          :data-label="$t('e-table.showDetailsHeader')"
          @click.self="onDetailToggleClick(item)"
        >
          <label :class="b('detail-toggle-label')">
            <input
              v-model="expandedRowsComputed"
              :class="b('detail-toggle-input')"
              :value="item[itemIdentifier]"
              type="checkbox"
              name="details"
            />
            <e-icon
              :class="b('detail-toggle-icon')"
              icon="i-arrow--down"
              :alt="$t('e-table.showDetailsHeader')"
            />
          </label>
        </td>
      </tr>
      <tr
        v-if="hasDetailRows && expandedRows.includes(item)"
        :key="`detail--${itemIndex}`"
        :class="b('detail-row')"
      >
        <td :colspan="colspan">
          <!-- @slot Slot can be used to show detail information for a row. -->
          <slot
            name="detailRow"
            :item="item"
          ></slot>
        </td>
      </tr>
    </template>

    <!-- @slot Allows to display a customized 'no results' row. -->
    <slot
      v-if="!itemsSorted.length"
      name="noResults"
      :columns="columns"
    >
      <tr>
        <td
          :colspan="columns.length"
          :class="b('no-results')"
        >
          {{ $t('globalMessages.noResults') }}
        </td>
      </tr>
    </slot>
    <tfoot v-else-if="$slots.footer">
      <tr :class="b('footer-row')">
        <td
          :colspan="colspan"
          :class="b('footer-cell')"
        >
          <slot
            name="footer"
            :columns="columns"
          ></slot>
        </td>
      </tr>
    </tfoot>
  </table>
</template>

<script lang="ts">
  import { PropType, Ref, defineComponent, ref } from 'vue';
  import useUuid, { Uuid } from '@/compositions/uuid';
  import eCheckbox from '@/elements/e-checkbox.vue';
  import eIcon from '@/elements/e-icon.vue';
  import { DateFormat } from '@/plugins/dayjs';
  import { Modifiers } from '@/plugins/vue-bem-cn/src/globals';

  type ItemId = number | string;

  export type TableItem = {
    disabled?: boolean;
    [key: string]: ItemId | unknown;
  };

  export type TableColumn = {
    title: string | (() => string);
    key: string;
    align?: 'left' | 'center' | 'right';
    slotName?: string;
    sortable?: boolean;
    nowrap?: boolean;
    titleHidden?: boolean | (() => boolean);
    onClick?(item: TableItem, column: TableColumn, event?: Event): void;
    sort?(a: unknown, b: unknown): number;
  };

  type RowLink = {
    href?(item: TableItem, column?: TableColumn, event?: Event): string;
    title?: string | ((item?: TableItem) => string);
  };

  type Setup = Uuid & {
    DateFormat: typeof DateFormat;
    toggleButton: Ref<HTMLButtonElement>;
  };

  type Data = {
    /**
     * Holds a flag if sorting options are visible
     */
    showSortingOptions: boolean;

    /**
     * The currently selected 'column' to be sorted by.
     */
    sortBy: TableColumn | null;

    /**
     * Holds to sort direction in case a 'sortBy' is active.
     */
    sortAscending: boolean;

    /**
     * Holds a flag if row links should be enabled.
     */
    enableRowLinks: boolean;

    /**
     * Holds a flag if there is currently a text selection inside the component.
     */
    hasSelection: boolean;

    /**
     * Holds the height of the sorting list toggle button.
     */
    toggleButtonHeight: number;

    /**
     * Row items that should be displayed in expanded state.
     */
    expandedRows: TableItem[];
  };

  /**
   * This component renders a table based on a given column setup and an array of row items.
   * By default, the cell values are used as text.
   *
   * Custom cell templates can be defined by defining a 'slotName' for a column and give a custom template
   * by using an identical named slot binding ('v-slot:\<slotName\>') to the component.
   */
  export default defineComponent({
    name: 'e-table',

    components: {
      eIcon,
      eCheckbox,
    },

    props: {
      /**
       * Array of data objects to render in table.
       */
      items: {
        type: Array as PropType<TableItem[]>,
        required: true,
      },

      /**
       * Allows to set an Array of selected items.
       */
      selected: {
        type: Array as PropType<TableItem[]>,
        default: () => [],
      },

      /**
       * Array of column definition objects.
       */
      columns: {
        type: Array as PropType<TableColumn[]>,
        required: true,
      },

      /**
       * Accepts a method to generate a link for each row (except for columns with 'onClick' callback).
       */
      rowLink: {
        type: Object as PropType<RowLink>,
        default: null,
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
        type: String as PropType<ItemId>,
        default: 'id',
      },
    },
    emits: {
      'update:selected': (payload: unknown): boolean => Array.isArray(payload),
    },

    setup(): Setup {
      const toggleButton = ref();

      return {
        ...useUuid(),
        DateFormat,
        toggleButton,
      };
    },
    data(): Data {
      return {
        showSortingOptions: true,
        sortBy: null,
        sortAscending: true,
        enableRowLinks: false,
        hasSelection: false,
        toggleButtonHeight: 0,
        expandedRows: [],
      };
    },

    computed: {
      /**
       * Model Value for toggle all checkbox.
       */
      toggleAllValue: {
        get(): boolean {
          return !!this.selectedInternal.length;
        },
        set(): void {
          if (this.selectedInternal.length) {
            this.selectedInternal = [];
          } else {
            this.selectedInternal = this.items.map((item) => item[this.itemIdentifier] as ItemId);
          }
        },
      },

      /**
       * Checks if current viewport is mobile (<= sm).
       */
      isMobile(): boolean {
        return !this.$viewport.isSm;
      },

      /**
       * Manages changes for the 'select' prop.
       */
      selectedInternal: {
        get(): ItemId[] {
          return this.selected.map((item) => item[this.itemIdentifier] as ItemId);
        },
        set(itemIds: ItemId[]): void {
          this.$emit(
            'update:selected',
            this.items.filter((item) => itemIds.includes(item[this.itemIdentifier] as ItemId))
          );
        },
      },

      /**
       * Handles changes to the 'expandedRows' prop.
       */
      expandedRowsComputed: {
        get(): ItemId[] {
          return this.expandedRows.map((item) => item[this.itemIdentifier] as ItemId);
        },
        set(itemIds: ItemId[]) {
          this.expandedRows = this.items.filter((item) => itemIds.includes(item[this.itemIdentifier] as ItemId));
        },
      },

      /**
       * Returns a sorted copy of the table-items.
       */
      itemsSortedBy(): TableItem[] {
        const { sortBy } = this;
        const items = this.items.slice();

        if (sortBy) {
          const sort = typeof sortBy?.sort === 'function' ? sortBy.sort : this.sortByFieldConstructor(sortBy.key);

          items.sort(sort);
        }

        return items;
      },

      /**
       * Reverts the sort direction if required.
       */
      itemsSorted(): TableItem[] {
        if (!this.sortAscending) {
          return this.itemsSortedBy.slice().reverse();
        }

        return this.itemsSortedBy;
      },

      /**
       * Counts the amount for columns that the table has.
       */
      colspan(): number {
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
        handler(value: boolean): void {
          this.showSortingOptions = !value;

          if (value) {
            window.addEventListener('resizeend', this.updateToggleButtonHeight);
          } else {
            window.removeEventListener('resizeend', this.updateToggleButtonHeight);
          }
        },
      },
    },

    // beforeCreate() {},
    // created() {},
    // beforeMount() {},
    // mounted() {},
    // beforeUpdate() {},
    // updated() {},
    // activated() {},
    // deactivated() {},
    beforeUnmount() {
      window.removeEventListener('resizeend', this.updateToggleButtonHeight);
    },
    // unmounted() {},

    methods: {
      /**
       * Returns the title of the actual table column.
       */
      columnTitle(column: TableColumn): string | null {
        switch (typeof column?.title) {
          case 'string':
            return column.title;

          case 'function':
            return column.title();

          default:
            return null;
        }
      },

      /**
       * Toggle the visibility for the sorting options.
       */
      toggleSortingOptions(): void {
        if (this.isMobile) {
          this.updateToggleButtonHeight();
        }

        this.showSortingOptions = !this.showSortingOptions;
      },

      /**
       * Set the height of the sorting list toggle button.
       */
      updateToggleButtonHeight(): void {
        this.toggleButtonHeight = this.toggleButton?.clientHeight || 0;
      },

      /**
       * Returns a title for the row link, based on the type of the definition.
       */
      rowTitle(item: TableItem): string | undefined {
        const { rowLink } = this;

        switch (typeof rowLink?.title) {
          case 'string':
            return rowLink.title;

          case 'function':
            return rowLink.title(item) || undefined;

          default:
            return undefined;
        }
      },

      /**
       * Checks if the given column should display the header label.
       */
      isHeaderLabelVisible(column: TableColumn): boolean {
        // Adding the support for functions was needed, to change visibility state dynamically (improved a11y).
        return !!(typeof column.titleHidden === 'function' ? column.titleHidden() : column.titleHidden !== true);
      },

      /**
       * Checks if the table is sorted by a given column.
       *
       * Since Vue3 leverages proxies for data properties for reactivity, we can't compare the objects directly.
       */
      isSortedBy(column: TableColumn): boolean {
        return this.sortBy?.key === column.key;
      },

      /**
       * Will set the sort-parameters.
       */
      onClickSort(column: TableColumn): void {
        if (this.isSortedBy(column)) {
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
       */
      sortButtonModifiers(column: TableColumn): Modifiers {
        const active = this.isSortedBy(column);

        return {
          active,
          desc: active && !this.sortAscending,
        };
      },

      /**
       * Returns BEM modifiers for header cells.
       */
      headerCellModifiers(column: TableColumn): Modifiers {
        return {
          align: column.align || 'left',
          col: column.key,
          hidden: (!this.$viewport.isMd && column.sortable === false) || !this.isHeaderLabelVisible(column),
          sortable: column.sortable !== false,
        };
      },

      /**
       * Returns BEM modifiers for cells.
       */
      cellModifiers(column: TableColumn): Modifiers {
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
       */
      sortByFieldConstructor(field: string): (a: TableItem, b: TableItem) => number {
        return (a, b) => {
          const aValue = a[field as keyof TableItem];
          const bValue = b[field as keyof TableItem];

          switch (true) {
            case typeof aValue === 'string':
              return (aValue as string).localeCompare(bValue as string, undefined, { numeric: true }); // eslint-disable-line no-undefined, no-extra-parens

            case typeof aValue === 'number':
              return (aValue as number) > (bValue as number) ? 1 : -1; // eslint-disable-line no-extra-parens

            case typeof aValue === 'boolean':
              return !aValue ? 1 : -1;

            case aValue instanceof Date:
              return this.$dayjs(aValue as Date).isAfter(bValue as Date) ? 1 : -1;

            default:
              return 0;
          }
        };
      },

      /**
       * Enables the row link for a few ms to allow link specific context menus.
       */
      enableRowLink(): void {
        if (this.rowLink?.href && !this.hasSelection) {
          // It was not possible to test for rowHref when binding the event in the template.
          this.enableRowLinks = true;

          setTimeout(() => {
            this.enableRowLinks = false;
          }, 100);
        }
      },

      /**
       * Callback for the tables mousedown event.
       */
      onMouseDown(): void {
        // All browsers
        this.hasSelection = !!window.getSelection()?.toString();
      },

      /**
       * Callback for the tables contextmenu event.
       */
      onContextMenu(): void {
        // Chromium, webkit: mousedown, contextmenu
        this.enableRowLink();

        setTimeout(() => {
          window?.getSelection()?.removeAllRanges(); // Safari marks words on right click by default, which would cause trouble on next context event.
        });
      },

      /**
       * Callback for the tables mouseup event.
       */
      onMouseUp(event: MouseEvent): void {
        // FF: mousedown, mouseup, contextmenu
        if (!this.enableRowLinks) {
          // Firefox marks a cells content when holding ctrl/meta while clicking it.
          this.hasSelection = !(event.ctrlKey || event.metaKey) && !!window.getSelection()?.toString();

          this.enableRowLink();
        }
      },

      /**
       * Callback for clicks within a row.
       */
      onCellClick(item: TableItem, column: TableColumn, event: MouseEvent): void {
        if (this.hasSelection) {
          // Cancel cell action if a text selection is active.
          return;
        }

        if (typeof column.onClick === 'function') {
          column.onClick(item, column, event);
        } else {
          const url = this.rowLink?.href?.(item, column);

          if (!url) {
            return;
          }

          if (event.ctrlKey || event.metaKey) {
            window.open(url, '_blank');
          } else if (typeof url === 'string') {
            window.location.href = url;
          }
        }
      },

      /**
       * Click callback for the toggle cell (increases click area on mobile).
       */
      onDetailToggleClick(item: TableItem): void {
        const id = item[this.itemIdentifier] as ItemId;

        if (!id) {
          return;
        }

        const expandedRows = this.expandedRowsComputed.slice();

        if (expandedRows.includes(id)) {
          this.expandedRowsComputed = expandedRows.filter((itemId) => itemId !== id);
        } else {
          expandedRows.push(id);

          this.expandedRowsComputed = expandedRows;
        }
      },
    },
    // render() {},
  });
</script>

<style lang="scss">
  @use '../setup/scss/variables';
  @use '../setup/scss/mixins';

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
      z-index: 1;
      background-color: variables.$color-grayscale--1000;
    }

    &__toggle {
      position: relative;
      display: block;
      padding: variables.$spacing--10 0;
      overflow: hidden;
      border-bottom: 0;
      cursor: pointer;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    &__toggle-icon {
      position: absolute;
      top: 50%;
      left: variables.$spacing--5;
      transform: translateY(-50%);
      transition: transform variables.$transition-duration--200 ease;

      &--open {
        transform: translateY(-50%) rotate(180deg);
      }
    }

    &__header-row {
      position: sticky;
      top: calc(var(--header-height, 0px) + var(--e-table--toggle-row-height, 0px));
      z-index: 1;
      display: flex;
      flex-direction: column;
      border-bottom: 2px solid variables.$color-grayscale--0;
      background-color: variables.$color-grayscale--1000;

      @include mixins.media(sm) {
        top: auto;
        display: table-row;
        background-color: inherit;
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
      cursor: pointer;

      .e-icon {
        margin-left: variables.$spacing--5;
        opacity: 0.3;
        transform: rotate(180deg);
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
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    &__data-cell {
      position: relative;
      display: flex;
      justify-content: space-between;
      padding: variables.$spacing--5;

      // This is a hacky solution for a FF issue where the background color overlaps the border.
      // See: https://bugzilla.mozilla.org/show_bug.cgi?id=688556
      // https://sonepar-suisse.atlassian.net/browse/WF-5573
      background-clip: padding-box;
      text-align: right;
      vertical-align: middle;

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
      width: 100%;
      margin-left: -(variables.$spacing--10);
      text-align: left;

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
      inset: 0;
      display: block;
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
      -webkit-appearance: none;
      pointer-events: none;

      &:checked ~ #{$this}__detail-toggle-icon {
        transform: rotate(180deg);
      }
    }

    &__detail-toggle-icon {
      transition: transform variables.$transition-duration--200;
    }

    &__detail-row {
      padding: 0 variables.$spacing--10;
      border-bottom: 1px solid variables.$color-grayscale--600;
    }
  }
</style>
