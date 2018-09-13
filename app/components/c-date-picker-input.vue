<template>
  <div :class="b()">
    <div :class="b('buttons-wrapper')">
      <div :class="b('input')">
        <e-input :value="formatDate(validDate)"
                 :id="`date-picker-value-${uuid}`"
                 :placeholder="$t('c-date-picker-input.chooseDate')"
                 :disabled="disabled"
                 name="date-picker-value"
                 @focus="isDatePickerOpen = true"
                 @input="onFieldInput"
        />
        <label v-t="'c-date-picker-input.chooseDate'"
               :for="`date-picker-value-${uuid}`"
               class="invisible">
        </label>
      </div>
      <div :class="b('select')">
        <e-select v-if="isDatePickerOpen"
                  :value="selectedYear"
                  :options-list="years"
                  :id="`date-picker-year-${uuid}`"
                  name="date-picker-year"
                  @input="onUpdateYear"
        />
        <label v-t="'c-date-picker-input.chooseYear'"
               :for="`date-picker-year-${uuid}`"
               class="invisible">
        </label>
      </div>
    </div>
    <div v-if="isDatePickerOpen" :class="b('overlay')">
      <c-date-picker :value="selectedDate"
                     :validate-date="validateDate"
                     @input="onDatePickerInput"
      />
    </div>
  </div>
</template>

<script>
  import moment from 'moment';
  import cDatePicker from '@/components/c-date-picker';
  import uuid from '@/mixins/uuid';

  /**
   * Renders an input field which opens a date picker in an overlay. Additionally a select will be rendered to easily
   * change the year of the selected value.
   */
  export default {
    name: 'c-date-picker-input',
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
       * @returns {String}
       */
      selectedYear() {
        return (this.selectedDate && parseInt(this.selectedDate, 10).toString()) || moment().year().toString();
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
      }
    },

    // beforeCreate() {},
    created() {
      window.addEventListener('click', this.onOutsideClick);
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
       * TODO: Find a solution without slicing the string. It's not easily possible with momentJS because we don't
       * know if we get a full datestring or just year and month (If year is changed without selecting a date).
       *
       * @param {String} year - The selected year.
       */
      onUpdateYear(year) {
        const rest = (this.selectedDate && this.selectedDate.slice(5)) || moment().year(year).format('YYYY-MM');
        let date = `${year}-${rest}`;

        if (!this.isValidDate(date)) {
          date = moment().year(year).format('YYYY-MM');
        }

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

        return moment()
          .year(year)
          .month(month - 1)
          .date(day)
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
      }
    },
    // render() {},
  };
</script>

<style lang="scss">
  .c-date-picker-input {
    position: relative;

    &__overlay {
      @include z-index(dropdown);

      position: absolute;
      background-color: $color-grayscale--1000;
      width: 100%;
      margin-left: -$spacing--30;

      @include media(xs) {
        width: auto;
      }
    }

    &__buttons-wrapper {
      display: flex;
      justify-content: space-between;
      width: 100%;
      padding-right: $spacing--10;
      min-width: 220px;

      @include media(xs) {
        width: 300px; // Width of the date-picker.
      }
    }

    &__input input {
      background-color: $color-grayscale--1000;
      min-width: 110px;

      @include media(xs) {
        width: 170px;
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
