<template>
  <div :class="b(modifiers)">
    <div :class="b('buttons-wrapper', modifiers)">
      <div :class="b('input', modifiers)">
        <e-input :id="`date-picker-value-${uuid}`"
                 ref="input"
                 :value="formatDate(validDate)"
                 :placeholder="$t('c-date-picker-input.chooseDate')"
                 :disabled="disabled"
                 name="date-picker-value"
                 @focus="isDatePickerOpen = true"
                 @input="onFieldInput"
        />
        <label :for="`date-picker-value-${uuid}`"
               class="invisible">
          {{ $t('c-date-picker-input.chooseDate') }}
        </label>
      </div>
      <div v-if="hasYearSelector" :class="b('select')">
        <e-select v-if="isDatePickerOpen"
                  :id="`date-picker-year-${uuid}`"
                  :value="selectedYear"
                  :options-list="years"
                  name="date-picker-year"
                  @input="onUpdateYear"
        />
        <label :for="`date-picker-year-${uuid}`"
               class="invisible">
          {{ $t('c-date-picker-input.chooseYear') }}
        </label>
      </div>
    </div>
    <div v-if="isDatePickerOpen" :class="b('overlay')">
      <c-date-picker :value="selectedDate"
                     :validate-date="validateDate"
                     :events="isEventDate"
                     @input="onDatePickerInput"
      />
    </div>
  </div>
</template>

<script>
  import cDatePicker from '@/components/c-date-picker';
  import uuid from '../mixins/uuid';

  /**
   * Renders an input field which opens a date picker in an overlay. Additionally a select will be rendered to easily
   * change the year of the selected value.
   */
  export default {
    name: 'c-date-picker-input',
    // status: 1,

    components: {
      cDatePicker,
    },
    mixins: [uuid],

    props: {
      /**
       * The currently selected date. The format needs to be an ISO 8601 string (YYYY-MM-DD).
       */
      selectedDate: {
        type: String,
        default: '',
      },

      /**
       * A function that checks if the current date is an event date (Used in range input to show selected dates).
       */
      isEventDate: {
        type: Function,
        default: null,
      },

      /**
       * A function that checks for allowed dates.
       */
      validateDate: {
        type: Function,
        default: null,
      },

      /**
       * Defines if the form fields are disabled.
       */
      disabled: {
        type: Boolean,
        default: false,
      },

      /**
       * Defines if the input has a year selector.
       */
      hasYearSelector: {
        type: Boolean,
        default: false,
      },
    },

    data() {
      return {
        /**
         * @type {Boolean} Defines if the datepicker overlay is opened.
         */
        isDatePickerOpen: false,

        /**
         * @type {Array} Array containing select options for the next years.
         */
        years: [],
      };
    },

    computed: {
      /**
       * Gets the year out of the date string.
       *
       * @returns {Number}
       */
      selectedYear() {
        return (this.selectedDate && parseInt(this.selectedDate, 10)) || this.$dayjs().year();
      },

      /**
       * Returns either a valid date or an empty string.
       *
       * @returns {String}
       */
      validDate() {
        if (!this.selectedDate || !this.isValidDate(this.selectedDate)) {
          return '';
        }

        return this.selectedDate;
      },

      /**
       * Defines state modifier classes.
       *
       * @returns {Object} BEM classes
       */
      modifiers() {
        return {
          hasYearSelector: this.hasYearSelector,
        };
      },
    },
    watch: {
      isDatePickerOpen(value) {
        /**
         * @event toggle - Toggle event for date picker input.
         *
         * @type {Object} payload
         * @type {Boolean} payload.toggle - Defines if the date-picker is open.
         */
        this.$emit('toggle', {
          toggle: value,
        });
      },
    },

    // beforeCreate() {},
    created() {
      window.addEventListener('click', this.onOutsideClick);
      window.addEventListener('touchend', this.onOutsideClick);
    },

    beforeMount() {
      this.createYearsArray();
    },
    // mounted() {},
    // beforeUpdate() {},
    // updated() {},
    // activated() {},
    // deactivated() {},
    // beforeDestroy() {},
    destroyed() {
      window.removeEventListener('click', this.onOutsideClick);
      window.removeEventListener('touchend', this.onOutsideClick);
    },

    methods: {
      /**
       * Event handler for outside clicks.
       *
       * @param {Event} event - The event instance.
       */
      onOutsideClick(event) {
        if (this.isDatePickerOpen && !this.$el.contains(event.target) && this.$el !== event.target) {
          this.isDatePickerOpen = false;

          if (this.$refs.input && this.$refs.input.$refs.input) {
            this.$refs.input.$refs.input.blur();
          }
        }
      },

      /**
       * Is called when a date is selected in the date-picker.
       *
       * @param {String} date - The selected date as string.
       */
      onDatePickerInput(date) {
        if (!this.isValidDate(date)) {
          return;
        }

        this.isDatePickerOpen = false;

        /**
         * @event input - Input event for date picker input.
         *
         * @type {Object} payload
         * @type {String} payload.date - Formatted date string.
         */
        this.$emit('input', {
          date,
        });
      },

      /**
       * Is called when a date is edited directly in the input field. We only update the value if the date is a valid
       * date.
       *
       * @param {String} date - The new date which should be set.
       */
      onFieldInput(date) {
        if (!this.isValidDate(this.parseDate(date))) {
          return;
        }

        /**
         * @event input - Input event for date picker input.
         *
         * @type {Object} payload
         * @type {String} payload.date - Formatted date string.
         */
        this.$emit('input', {
          date: this.parseDate(date),
        });
      },

      /**
       * Is called when the year is changed in the select. This needs to update the selected date so the date-picker
       * reacts to the change.
       *
       * @param {String} year - The selected year.
       */
      onUpdateYear(year) {
        const date = this.selectedDate ? this.$dayjs(this.selectedDate) : this.$dayjs();

        /**
         * @event input - Input event for date picker input.
         *
         * @type {Object} payload
         * @type {String} payload.date - Formatted date string.
         */
        this.$emit('input', {
          date: date.set('year', year).format('YYYY-MM-DD'),
        });
      },

      /**
       * Creates an array containing the next 20 years as objects for select component.
       *
       * @param {Number} additionalYearsAmount - The amount of years in the future which should be created.
       */
      createYearsArray(additionalYearsAmount = 20) {
        let currentYear = new Date().getFullYear();
        const years = [];
        const endYear = currentYear + additionalYearsAmount;

        while (currentYear <= endYear) {
          years.push({
            label: currentYear,
            value: currentYear,
          });

          currentYear += 1;
        }

        this.years = years;
      },

      /**
       * Returns the date in our desired format with dots (DD.MM.YYYY).
       *
       * @param {String} date - The date in default format (YYYY-MM-DD).
       *
       * @returns {String|null}
       */
      formatDate(date) {
        if (!date) {
          return null;
        }

        return date.split('-').reverse().join('.');
      },

      /**
       * Parses the date to the default format (YYYY-MM-DD).
       *
       * @param {String} date - The date in our format with dots (DD.MM.YYYY).
       *
       * @returns {String}
       */
      parseDate(date) {
        if (!date || date.split('.').length !== 3) {
          return '';
        }

        const [day, month, year] = date.split('.');

        return this.$dayjs()
          .set('year', year)
          .set('month', month - 1)
          .set('date', day)
          .format('YYYY-MM-DD');
      },

      /**
       * Checks if the given date is valid according to the provided validate function in the props.
       *
       * @param {String} date - The date to test (YYYY-MM-DD).
       *
       * @returns {Boolean}
       */
      isValidDate(date) {
        if (typeof this.validateDate === 'function') {
          return this.validateDate(date);
        }

        return true;
      },
    },
    // render() {},
  };
</script>

<style lang="scss">
  .c-date-picker-input {
    position: relative;

    &--has-year-selector {
      @include media(xs) {
        width: 300px; // Width of the date-picker.
      }
    }

    &__overlay {
      @include z-index(dropdown);

      position: absolute;
      background-color: $color-grayscale--1000;
      width: 100%;
      margin-left: 0;
    }

    &__buttons-wrapper {
      display: flex;
      justify-content: space-between;
      width: 100%;
      min-width: 220px;

      &--has-year-selector {
        padding-right: $spacing--10;
      }
    }

    &__input {
      width: 100%;

      input {
        background-color: $color-grayscale--1000;
        min-width: 110px;
      }
    }

    &__input--has-year-selector {
      width: auto;

      input {
        @include media(xs) {
          width: 170px;
        }
      }
    }

    &__select {
      margin-left: $spacing--2;

      select {
        width: 105px;
        background-color: $color-grayscale--1000;
      }
    }
  }
</style>
