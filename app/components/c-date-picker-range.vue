<template>
  <div v-bem>
    <e-label :for="startId"
             :name="labelName"
             :position="labelPosition"
    >
      <div v-bem:fields>
        <c-date-picker-input :id="startId"
                             :selected-date="internalStart"
                             :validate-date="isValidStartDate"
                             :is-event-date="isEventDate"
                             @input="onInputStartValue"
        />
        <!-- eslint-disable-next-line vue/singleline-html-element-content-newline -->
        <div v-bem:to>—</div>
        <c-date-picker-input :selected-date="internalEnd"
                             :validate-date="isValidEndDate"
                             :is-event-date="isEventDate"
                             @input="onInputEndValue"
        />
      </div>
    </e-label>
  </div>
</template>

<script>
  import uuid from '../mixins/uuid';
  import cDatePickerInput from './c-date-picker-input';

  /**
   * A date picker which allows to define a date range.
   */
  export default {
    name: 'c-date-picker-range',
    components: {
      cDatePickerInput,
    },
    mixins: [
      uuid,
    ],

    props: {
      /**
       * The preselected start date. The format needs to be an ISO 8601 string (YYYY-MM-DD).
       */
      start: {
        type: String,
        default: '',
      },

      /**
       * The preselected end date. The format needs to be an ISO 8601 string (YYYY-MM-DD).
       */
      end: {
        type: String,
        default: '',
      },

      /**
       * Defines if the form fields are disabled.
       */
      disabled: {
        type: Boolean,
        default: false,
      },

      /**
       * Text for label.
       */
      labelName: {
        type: String,
        default: '',
      },

      /**
       * Position of label.
       */
      labelPosition: {
        type: String,
        default: 'top',
      },
    },
    data() {
      return {
        /**
         * @type {Boolean} Defines if the datepicker overlay is opened.
         */
        isDatePickerOpen: false,

        /**
         * @type {String} The currently selected start date. The format needs to be an ISO 8601 string (YYYY-MM-DD).
         */
        internalStart: this.start,

        /**
         * @type {String} The currently selected end date. The format needs to be an ISO 8601 string (YYYY-MM-DD).
         */
        internalEnd: this.end,
      };
    },

    computed: {
      /**
       * Returns a unique id to link label and start field.
       *
       * @returns {String}
       */
      startId() {
        return `${this.$options.name}__start--${this.uuid}`;
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
       * Checks if the given date is valid.
       *
       * @param {String} date - Date which should be checked. The format needs to be an ISO 8601 string (YYYY-MM-DD).
       *
       * @returns {Boolean}
       */
      isValidDate(date) {
        return this.$moment(date, 'YYYY-MM-DD', true).isValid()
          && this.$moment(date).isSameOrAfter('1920-01-01', 'year');
      },

      /**
       * Checks if the given date is before the selected end date.
       *
       * @param {String} date - Date which should be checked. The format needs to be an ISO 8601 string (YYYY-MM-DD).
       *
       * @returns {Boolean}
       */
      isValidStartDate(date) {
        if (!this.isValidDate(date)) {
          return false;
        }

        if (this.internalEnd) {
          return this.$moment(date).isSameOrBefore(this.internalEnd, 'day');
        }

        return true;
      },

      /**
       * Checks if the given date is after the selected start date.
       *
       * @param {String} date - Date which should be checked. The format needs to be an ISO 8601 string (YYYY-MM-DD).
       *
       * @returns {Boolean}
       */
      isValidEndDate(date) {
        if (!this.isValidDate(date)) {
          return false;
        }

        if (this.isValidDate(date) && this.internalStart) {
          return this.$moment(date).isSameOrAfter(this.internalStart, 'day');
        }

        return true;
      },

      /**
       * Checks if the given date is in the selected range.
       *
       * @param {String} dateString - Date which should be checked. The format needs to be an ISO 8601 string (YYYY-MM-DD).
       *
       * @returns {Boolean}
       */
      isEventDate(dateString) {
        const date = this.$moment(dateString);
        const { internalStart, internalEnd } = this;

        if (internalStart && internalEnd) {
          return date.isSameOrAfter(internalStart, 'day')
            && date.isSameOrBefore(internalEnd, 'day');
        }

        if (internalStart) {
          return date.isSameOrAfter(internalStart, 'day');
        }

        if (internalEnd) {
          return date.isSameOrBefore(internalEnd, 'day');
        }

        return false;
      },

      /**
       * Handles the input for the start value.
       *
       * @param {Object} payload - Payload object.
       * @param {String} payload.date - Formatted date string.
       */
      onInputStartValue(payload) {
        this.internalStart = payload.date;

        /**
         * @event updateStartDate - Update event for start date.
         *
         * @type {Object} payload
         * @type {String} payload.date - Formatted date string.
         */
        this.$emit('updateStartDate', {
          date: payload.date,
        });
      },

      /**
       * Handles the input for the end value.
       *
       * @param {Object} payload - Payload object.
       * @param {String} payload.date - Formatted date string.
       */
      onInputEndValue(payload) {
        this.internalEnd = payload.date;

        /**
         * @event updateEndDate - Update event for end date.
         *
         * @type {Object} payload
         * @type {String} payload.date - Formatted date string.
         */
        this.$emit('updateEndDate', {
          date: payload.date,
        });
      },
    },
    // render() {},
  };
</script>

<style lang="scss">
  .c-date-picker-range {
    &__fields {
      @include media(sm) {
        display: flex;
      }
    }

    &__start,
    &__end {
      flex: 1 1 auto;
    }

    &__to {
      padding: 0 $spacing--5;
    }

    .c-date-picker-input {
      @include media(xs) {
        width: 100%;
      }
    }
  }
</style>
