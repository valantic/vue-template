<template>
  <div v-bem>
    <div :class="b('left')">
      <label v-t="'c-table-pagination.itemsPerPage'"
             v-bem:select-label
             :for="`table-rows--${uuid}`"></label>
      <div :class="b('select-wrapper')">
        <e-select :id="`table-rows--${uuid}`"
                  :value="rowsPerPageValue"
                  :options-list="rowsPerPageOptionsFormatted"
                  name="sorting"
                  @input="onUpdateRowsPerPage"
        />
      </div>
    </div>
    <div :class="b('right')">
      <div :class="b('amount')">
        <div>
          {{ currentItemRange.minValue }} - {{ currentItemRange.maxValue }}
          {{ $t('c-table-pagination.from') }}
          {{ totalAmount }}
        </div>
      </div>
      <ul :class="b('pages')">
        <li v-for="pageNumber in pages" :key="`page-${pageNumber}`" :class="b('page-item', {active: currentPage === pageNumber})">
          <a :class="b('page-link')"
             :title="$t('c-table-pagination.pageNumberTitle', {pageNumber})"
             href="#"
             @click.prevent="goToPage({ pageNumber })">{{ pageNumber }}</a>
        </li>
      </ul>
      <div :class="b('arrows')">
        <a :class="b('arrow', {disabled: currentPage <= 1})"
           :title="$t('c-table-pagination.lastPageTitle')"
           href="#"
           @click.prevent="onClickBack">
          <e-icon icon="i-arrow--left--info"
                  width="15"
                  height="15"
                  inline/>
          <span v-t="'c-table-pagination.lastPageTitle'" class="invisible"></span>
        </a>
        <a :class="b('arrow', {disabled: maxPage <= currentPage})"
           :title="$t('c-table-pagination.nextPageTitle')"
           href="#"
           @click.prevent="onClickNext">
          <e-icon icon="i-arrow--right--info"
                  width="15"
                  height="15"
                  inline/>
          <span v-t="'c-table-pagination.nextPageTitle'" class="invisible"></span>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
  import uuid from '../mixins/uuid';

  /**
   * This component is for the usage with a vuetify v-data-table component for the external pagination.
   */
  export default {
    name: 'c-table-pagination',
    // components: {},
    mixins: [
      uuid,
    ],

    props: {
      /**
       * The available options for the select element.
       */
      rowsPerPageOptions: {
        type: Array,
        default: () => [
          10, 50, 100,
        ],
      },

      /**
       * Current value of the amount of rows per page.
       */
      rowsPerPageValue: {
        type: Number,
        default: 10,
      },

      /**
       * The total amount of items in the table.
       */
      totalAmount: {
        type: Number,
        default: 0,
      },

      /**
       * The current visible table-page
       */
      currentPage: {
        type: Number,
        default: 1,
      },
    },
    // data() {
    //   return {};
    // },

    computed: {
      /**
       * Gets the formatted options of the select element.
       *
       * @returns {Array}
       */
      rowsPerPageOptionsFormatted() {
        return this.rowsPerPageOptions.map(item => ({
          value: item,
          label: item,
        }));
      },

      /**
       * Calculates the current min- and max value of the current visible items.
       *
       * @returns {{minValue: Number, maxValue: Number}}
       */
      currentItemRange() {
        const fromValue = (((this.totalAmount / this.maxPage) * this.currentPage) - this.rowsPerPageValue) + 1;
        const toValue = (fromValue + this.rowsPerPageValue) - 1;

        return {
          minValue: fromValue || 0,
          maxValue: (toValue > this.totalAmount ? this.totalAmount : toValue) || 0,
        };
      },

      /**
       * Gets the amount of pages depending on the amount ot items per page.
       *
       * @returns {Number}
       */
      pages() {
        if (this.rowsPerPageValue === null || this.totalAmount === null) {
          return 0;
        }

        return Math.ceil(this.totalAmount / this.rowsPerPageValue);
      },

      /**
       * Gets the latest / highest page.
       *
       * @returns {Number}
       */
      maxPage() {
        return this.totalAmount / this.rowsPerPageValue;
      }
    },
    watch: {
      /**
       * This watcher observes the current and the max page. It will set the current page to the max-page
       * if the amount of items per page changes.
       */
      maxPage() {
        if (this.maxPage < this.currentPage) {
          this.goToPage({ pageNumber: Math.ceil(this.maxPage) });
        }
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
       * Event gets fired after each select change.
       *
       * @param {Number} value - The amount of items per page.
       */
      onUpdateRowsPerPage(value) {
        /**
         * Emits the new amount of items per page.
         *
         * @event updateRowsPerPage
         * @property {object} value - The amount of items per page.
         */
        this.$emit('updateRowsPerPage', { value });
      },

      /**
       * Changes to the next page.
       */
      onClickNext() {
        this.changePage('next');
      },

      /**
       * Changes to the previous page.
       */
      onClickBack() {
        this.changePage('previous');
      },

      /**
       * Changes the page in a specific direction.
       *
       * @param {String} direction - The direction of the page switch possible values: next, previous.
       */
      changePage(direction) {
        let value = this.currentPage;

        switch (direction) {
          case 'next':
            if (this.maxPage > value) {
              value += 1;
            }
            break;

          case 'previous':
            if (value > 1) {
              value -= 1;
            }
            break;

          default:
            value = this.currentPage;
        }

        this.goToPage({ pageNumber: value });
      },

      /**
       * Goes to a specific page.
       *
       * @param {Number} pageNumber - The called page number.
       */
      goToPage({ pageNumber }) {
        /**
         * Emits the new page change.
         *
         * @event changePage
         * @property {Number} pageNumber - The new called page number.
         */
        this.$emit('changePage', pageNumber);
      }

    },
    // render() {},
  };
</script>

<style lang="scss">
  .c-table-pagination {
    @include font($font-size--14);

    display: flex;
    color: $color-grayscale--400;
    padding: 0 $spacing--10;

    @include media(sm) {
      padding: 0 $spacing--30;
    }

    &__left {
      flex: 1 0 auto;
      display: flex;
      justify-content: flex-start;
      border-right: 1px solid $color-grayscale--600;
      padding: $spacing--5 0;

      @include media(sm) {
        justify-content: flex-end;
        padding: $spacing--5 $spacing--30 $spacing--5 0;
      }
    }

    &__select-label {
      display: none;
      align-items: center;
      margin-right: $spacing--15;
      margin-bottom: 0;

      @include media(sm) {
        display: flex;
      }
    }

    &__select-wrapper {
      width: 70px;
    }

    &__right {
      display: flex;
      padding: $spacing--5 0 $spacing--5 $spacing--30;
    }

    &__amount {
      display: none;
      align-items: center;
      margin-right: $spacing--20;

      @include media(sm) {
        display: flex;
      }
    }

    &__pages {
      display: flex;
      align-items: center;
      margin: 0 $spacing--20 0 0;
      padding: 0;
    }

    &__page-item {
      @extend %list-reset;

      display: inline-block;
      margin-right: $spacing--5;
    }

    &__page-item:last-child {
      margin-right: 0;
    }

    &__page-item--active {
      color: $color-secondary--1;
    }

    &__page-link,
    &__page-link:active,
    &__page-link:hover,
    &__page-link:focus {
      color: inherit;
      cursor: pointer;
    }

    &__arrows {
      display: flex;
      align-items: center;
    }

    &__arrow {
      .e-icon {
        display: flex;
      }
    }

    &__arrow--disabled {
      path {
        fill: $color-grayscale--600;
      }
    }
  }
</style>
