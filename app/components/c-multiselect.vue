<template>
  <div :class="b(modifiers)"
       @mouseenter="hasHover=true"
       @mouseleave="hasHover=false"
  >
    <span v-if="title.length" :class="b('title')">{{ title }}</span>
    <div :class="b('wrapper', { isActive })" @click="onInsideClick">
      <div :class="b('content')">
        <div v-if="!isActive" :class="b('output')" @click="onOutputClick">
          <span v-if="outputValue" :class="b('value')">{{ outputValue }}</span>
          <span v-else :class="b('placeholder')">{{ placeholder }}</span>

          <div v-show="isError" :class="b('icon-wrapper')">
            <span :class="b('icon-splitter')"></span>
            <e-icon inline
                    icon="i-error"
                    width="20px"
                    height="20px"
            />
          </div>
          <div v-show="!isError" :class="b('icon-wrapper')">
            <e-icon v-show="isSuccess"
                    inline
                    icon="i-check"
            />
            <e-icon v-show="!isSuccess"
                    :color="disabled ? 'lightgray' : 'default'"
                    inline
                    icon="i-arrow--down--info"
                    width="18px"
                    height="18px"
            />
          </div>
        </div>

        <div v-else :class="b('search-wrapper')">
          <e-input ref="searchInput"
                   v-model="searchTerm"
                   :placeholder="$t('c-multiselect.search')"
                   :title="$t('c-multiselect.searchTitle')"
                   :focus-shadow="false"
                   :select-on-focus="true"
                   name="search-field"
                   autocomplete="off"
                   type="search"
                   border="0"
                   tabindex="0"
                   @input="onSearchInput"
          >
            <e-icon :class="b('icon')"
                    :inline="true"
                    icon="i-search"
                    tabindex="-1" />
          </e-input>
        </div>

        <div :class="b('items-wrapper')" data-simplebar data-simplebar-auto-hide="false">
          <div class="simplebar-scroll-content">
            <div class="simplebar-content">
              <div
                v-for="item in checkboxItemsFiltered"
                v-show="item.display"
                :class="b('item-wrapper')"
                :key="item.id"
              >
                <e-checkbox v-model="checkedItems"
                            :name="item.name"
                            :value="trimValue(item.value)"
                            :ref="item.name"
                            @change="onCheckboxChange">
                  <span>{{ item.displayName }}</span>
                </e-checkbox>
              </div>

              <span v-if="checkboxItemsFilteredEmpty" :class="b('list-empty')">
                {{ $t('c-multiselect.itemsEmpty') }}
              </span>
            </div>
          </div>
        </div>
        <div :class="b('button-wrapper')">
          <e-button :disabled="!isChanged"
                    width="full"
                    primary
                    @click="onSaveClick"
          >
            {{ $t('c-multiselect.save') }}
          </e-button>
        </div>

        <div v-if="isError && isActive" :class="b('error-msg-wrapper')">
          <span :class="b('error-msg')">
            {{ errorMessage }}
          </span>
          <div :class="b('error-icon-wrapper')">
            <e-icon inline
                    icon="i-error"
                    color="white"
                    width="20px"
                    height="20px"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import 'simplebar';
  import 'simplebar/dist/simplebar.css';
  import CSearch from '@/components/c-search';
  import formStates from '../mixins/form-states';

  /**
   * Multiselect component which contains a list of checkboxes. It contains an input field for filtering the values
   * of the checkboxes and a save button, to save the checked items to an array. By clicking on the save button or
   * clicking outside of the component, the component state gets updated and is emitted to the parent component.
   */
  export default {
    name: 'c-multiselect',
    components: { CSearch },
    mixins: [formStates],

    props: {
      /**
       * Array of Strings which are the basis for the checkbox items.
       */
      items: {
        type: Array,
        required: true,
      },

      /**
       * Title of the component.
       */
      title: {
        type: String,
        default: '',
      },

      /**
       * Name of the facet (for internal use).
       */
      facetName: {
        type: String,
        required: true,
      },

      /**
       * Initially selected active values.
       */
      activeValue: {
        type: String,
        default: '',
      },

      /**
       * Placeholder for displaying in the output field, if no values are selected.
       */
      placeholder: {
        type: String,
        default: '',
      },

      /**
       * Sets the error message, which will be displayed on the error state.
       */
      errorMessage: {
        type: String,
        default: '',
      },

      /**
       * Converts the component to a flex item which aligns title/dropdown at top/bottom of element.
       */
      equalHeight: {
        type: Boolean,
        default: false,
      },
    },

    data() {
      return {
        /**
         * @type {Boolean} Defines if the multi-select is in error state.
         */
        isError: this.$props.state === 'error',

        /**
         * @type {Boolean} Defines if the multi-select is in success state.
         */
        isSuccess: this.$props.state === 'success',

        /**
         * @type {Boolean} Defines if the multi-select has been changed.
         */
        isChanged: false,

        /**
         * @type {String} The output value as string.
         */
        outputValue: '',

        /**
         * @type {Array} The filtered checkbox items.
         */
        checkboxItemsFiltered: [],

        /**
         * @type {Array} The checkbox items.
         */
        checkboxItems: [],

        /**
         * @type {Array} The checked items.
         */
        checkedItems: [],

        /**
         * @type {Array} The checked and stored items.
         */
        checkedStored: [],

        /**
         * @type {Boolean} Defines if there are no filtered checkbox items.
         */
        checkboxItemsFilteredEmpty: false,

        /**
         * @type {String} The search term to filter values.
         */
        searchTerm: '',
      };
    },

    computed: {
      /**
       * Returns active values as array.
       *
       * @returns {Array}
       */
      activeValuesArray() {
        if (this.activeValue) {
          if (Array.isArray(this.activeValue)) {
            return this.activeValue;
          } else if (typeof this.activeValue === 'string') {
            return this.activeValue.split(',');
          } else if (typeof this.activeValue === 'number') {
            return [this.activeValue];
          }
        }

        return null;
      },

      /**
       * Defines state modifier classes.
       *
       * @returns {Object}
       */
      modifiers() {
        return {
          ...this.stateModifiers,
          equalHeight: this.$props.equalHeight,
          success: this.isSuccess,
          error: this.isError,
        };
      },
    },
    // watch: {},
    // beforeCreate() {},
    created() {
      window.addEventListener('click', this.onOutsideClick);
    },
    // beforeMount() {},
    mounted() {
      this.initCheckboxItems();
      this.updateCheckboxes();
    },
    // beforeUpdate() {},
    // updated() {},
    // activated() {},
    // deactivated() {},
    // beforeDestroy() {},
    destroyed() {
      window.removeEventListener('click', this.onOutsideClick);
    },

    methods: {
      /**
       * Resets the active items.
       */
      reset() {
        this.checkedItems.splice(0);
        this.checkedStored.splice(0);
      },

      /**
       * Initializes the checkboxItems and checkboxItemsFiltered arrays, based on the given
       * string array provided by the parent component.
       */
      initCheckboxItems() {
        this.items.forEach((element, index) => {
          this.checkboxItems.push({
            id: index,
            name: 'multiple',
            value: element.value,
            displayName: element.doc_count ? `${element.value} (${element.doc_count})` : element.value,
            display: true,
          });
        });

        this.checkboxItemsFiltered = this.checkboxItems;

        if (this.activeValuesArray) {
          this.items.forEach((element) => {
            this.activeValuesArray.forEach((activeValue) => {
              if (element.value === activeValue) {
                this.checkedItems.push(activeValue);
              }
            });
          });
        }
      },

      /**
       * Sets isChanged on true, if a checkbox is checked or unchecked.
       */
      onCheckboxChange() {
        this.isChanged = true;
      },

      /**
       * Updates the state of the checkboxes and updates the state of the multiselect component.
       */
      updateCheckboxes() {
        if (this.$refs.multiple) {
          this.$refs.multiple.forEach((item) => {
            item.updateCheckedState();
          });
        }

        this.checkedItems.sort(this.compare);
        this.checkedStored = this.checkedItems;
        this.outputValue = this.getStringFromArray(this.checkedStored);
        this.isSuccess = this.checkedItems.length > 0;

        /**
         * Will be triggered when the multiselect component is updated.
         *
         * @event update
         *
         * @type {cMultiselect} Multiselect component.
         */
        this.$emit('update', this);
      },

      /**
       * Checks, if the click was outside of the component, and if so, toggles the active state.
       */
      onOutsideClick() {
        if (this.isActive) {
          this.update();
        }
      },

      /**
       * Detects a click inside the component and stops the event propagation, so that onOutputClick() is not triggered.
       *
       * @param {Event} event - Click event.
       */
      onInsideClick(event) {
        event.stopPropagation();
      },

      /**
       * Sets the active state of the component, if there is a click on the output field.
       */
      onOutputClick() {
        if (!this.disabled) {
          this.isActive = true;
          this.setFocusOnInput();

          /**
           * Will be triggered when the multiselect component is active.
           *
           * @event active
           *
           * @type {cMultiselect} Multiselect component.
           */
          this.$emit('active', this);
        }
      },

      /**
       * Calls the update function, if the save button is clicked.
       */
      onSaveClick() {
        this.update();
      },

      /**
       * Updates the state of the component. If the checked array changed, it will update the checkedStore
       * and emit the new checked array to the parent component.
       */
      update() {
        if (!this.arraysEqual(this.checkedItems, this.checkedStored)) {
          this.checkedItems.sort(this.compare);
          this.checkedStored = this.checkedItems;
          this.outputValue = this.getStringFromArray(this.checkedStored);

          /**
           * Will be triggered when the multiselect component is updated.
           *
           * @event update
           *
           * @type {cMultiselect} Multiselect component.
           */
          this.$emit('update', this);

          /**
           * Will be triggered when the component state is saved.
           *
           * @event save
           */
          this.$emit('save');
        }

        this.isActive = false;
        this.isSuccess = this.checkedItems.length > 0;
        this.isChanged = false;
        this.checkboxItemsFiltered.forEach((checkboxItem) => {
          checkboxItem.display = true;
        });
      },

      /**
       * Iterates through the checkboxItemsFiltered Array and checks if it contains an object, whose display
       * attribute value contains the value parameter (case sensitive).
       *
       * @param {String} value - String value of the input field.
       */
      onSearchInput(value) {
        let checkBoxItemsFilteredEmptyTemp = true;

        this.checkboxItemsFiltered.forEach((checkboxItem) => {
          if (checkboxItem.value.toLowerCase().indexOf(value.trim().toLowerCase()) !== -1) {
            checkboxItem.display = true;
            checkBoxItemsFilteredEmptyTemp = false;
          } else {
            checkboxItem.display = false;
          }
        });

        this.checkboxItemsFilteredEmpty = checkBoxItemsFilteredEmptyTemp;
      },

      /**
       * Checks if the two arrays are equal.
       *
       * @param {Array} array1 - First array.
       * @param {Array} array2 - Second array.
       *
       * @returns {Boolean}
       */
      arraysEqual(array1, array2) {
        if (array1.length !== array2.length) {
          return false;
        }

        for (let i = array1.length; i >= 0; i -= 1) {
          if (array1[i] !== array2[i]) {
            return false;
          }
        }

        return true;
      },

      /**
       * Returns a string which contains all the array values, which are separated by a comma.
       *
       * @param {Array} array - Array of string or number values.
       *
       * @returns {String}
       */
      getStringFromArray(array) {
        return Array.isArray(array) ? array.join(', ') : '';
      },

      /**
       * Compares two array string values according to their localCompare method.
       * If the values are numbers, it compares them based on their value.
       *
       * @param {(String|Number)} value1 - First value to compare.
       * @param {(String|Number)} value2 - Second value to compare.
       *
       * @returns {Number}
       */
      compare(value1, value2) {
        if (typeof value1 === 'number' && typeof value2 === 'number') {
          if (value1 > value2) {
            return 1;
          } else if (value1 < value2) {
            return -1;
          }
        } else if (typeof value1 === 'string' && typeof value2 === 'string') {
          return value1.localeCompare(value2);
        }

        return 0;
      },

      /**
       * Sets the focus to the input element of the c-search component.
       */
      setFocusOnInput() {
        this.$nextTick(() => {
          if (this.$refs.searchInput) {
            this.$refs.searchInput.$refs.input.focus();
          }
        });
      },

      /**
       * Trims the value if it is a string.
       *
       * @param {(String|Number)} value - Value to be trimmed.
       *
       * @returns {(String|Number)}
       */
      trimValue(value) {
        return typeof value === 'string' ? value.trim() : value;
      },
    },
    // render() {},
  };
</script>

<style lang="scss">
  .c-multiselect {
    position: relative;

    &--equal-height {
      display: flex;
      justify-content: space-between;
      flex-direction: column;
      height: 100%;
    }

    &__wrapper {
      position: relative;
      display: flex;
      align-items: flex-end;
      height: 30px;
    }

    &__wrapper--is-active {
      min-height: 30px;
    }

    &__content {
      width: 100%;
      transition: box-shadow $transition-duration-200 ease-in-out;
    }

    &--active &__content {
      @include z-index(dropdown);

      position: absolute;
      border: 1px solid $color-grayscale--500;
      border-radius: $border-radius--default;
      box-shadow: 0 2px 5px 0 rgba($color-grayscale--500, 0.5);
      top: calc(100% - 30px);
    }

    &--error &__content {
      border-color: $color-status--danger;
      box-shadow: none;
    }

    &__title {
      color: $color-grayscale--400;
    }

    &--active &__title,
    &--focus &__title {
      color: $color-secondary--1;
    }

    &--disabled &__title {
      color: $color-grayscale--500;
    }

    &--error &__title {
      color: $color-status--danger;
    }

    // output
    &__output {
      height: $spacing--30;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border: 1px solid $color-grayscale--400;
      border-radius: $border-radius--default;
    }

    &--hover &__output {
      border: 1px solid $color-grayscale--500;
    }

    // placeholder and value
    &__placeholder,
    &__value {
      @include font-size($font-size--14);

      padding: 0 $spacing--5;
      color: $color-grayscale--400;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    &--disabled &__placeholder,
    &--disabled &__value {
      color: $color-grayscale--600;
    }

    &__icon-wrapper {
      height: percentage(4 / 5); // for positioning the icon
      padding: 0 $spacing--5 0;
      align-self: flex-end;
      width: $spacing--30;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    &__error-icon-wrapper { // necessary to position the error icon in the center
      height: 100%;
      padding-top: 3px;
      margin-bottom: -3px;
    }

    &__icon-splitter {
      position: absolute;
      right: 30px;
      height: calc(100% - 4px);
      top: $spacing--2;
      border-left: 1px solid $color-status--danger;
    }

    &__items-wrapper {
      display: none;
      padding: $spacing--5 $spacing--1 $spacing--5 0; // spacing right is needed, otherwise IE11 shows a scrollbar.
      background-color: #f8f8f8;
      border-top: 1px solid $color-grayscale--500;
      border-bottom: 1px solid $color-grayscale--500;
      overflow-y: scroll;
    }

    &--active &__items-wrapper {
      display: block;
    }

    &__item-wrapper {
      padding: $spacing--5;
    }

    &__list-empty {
      @include font($font-size--14, 18px);

      display: block;
      padding: $spacing--5;
      color: $color-grayscale--400;
    }

    &__search-button {
      border: 0;
      background: transparent;
      padding: $spacing--5 0 0;
      margin: 0;

      &:focus {
        outline: none;
      }
    }

    &__button-wrapper {
      display: none;
      padding: $spacing--10;
    }

    &--active &__button-wrapper {
      display: block;
      background-color: $color-grayscale--1000;

      .e-button { // if not applied, the button can overflow the multiselect component.
        min-width: auto;
      }
    }

    &__error-msg-wrapper {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: $spacing--5;
      background-color: $color-status--danger;
    }

    &__error-msg {
      @include font-size($font-size--14);

      color: $color-grayscale--1000;
    }

    // styles for the custom scrollbar (simplebar)
    [data-simplebar] {
      max-height: 165px;
    }

    [data-simplebar="init"] {
      display: none;
    }

    &--active [data-simplebar="init"] {
      display: block;
    }

    /* Necessary disabling of stylelint due to the specific structure of the simplebar library */
    /* stylelint-disable-next-line */
    .simplebar-track.vertical {
      top: 4px;
      bottom: $spacing--2;
    }

    .simplebar-scrollbar {
      right: 4px;
    }

    .simplebar-scrollbar::before {
      border: 1px solid $color-grayscale--500;
      background: $color-grayscale--1000;
    }
  }
</style>
