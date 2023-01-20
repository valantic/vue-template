<template>
  <div
    v-outside-click="close"
    :class="b({ negative, range, isCalendarVisible, isClosing })"
  >
    <div :class="b('anchor')">
      <e-date
        v-model="startDate"
        :class="b('start')"
        :label="startLabel || $t(range ? 'c-date-picker.inputStartName' : 'c-date-picker.inputName')"
        :name="startName"
        :negative="negative"
        @focus="onStartFocus"
      />
      <e-date
        v-if="range"
        v-model="endDate"
        :class="b('end')"
        :label="endLabel || $t('c-date-picker.inputEndName')"
        :name="endName"
        :negative="negative"
        @focus="onEndFocus"
      />
    </div>
    <div
      v-show="isCalendarVisible"
      :class="b('calendar-wrapper')"
    >
      <div :class="b('calendar-header')">
        <button
          :class="b('today')"
          type="button"
          @click.prevent="onTodayClick"
        >
          {{ $t('c-date-picker.calendarTitle') }}
        </button>
        <button
          :class="b('close')"
          :aria-label="$t('c-date-picker.close')"
          type="button"
          @click.prevent="close(false)"
        >
          <e-icon
            icon="i-close"
            size="20"
          />
        </button>
      </div>
      <div
        ref="calendar"
        :class="b('calendar')"
      ></div>
    </div>
    <div
      :class="b('backdrop')"
      @click="close(false)"
    ></div>
  </div>
</template>

<script>
  import Pikaday from 'pikaday';
  import eDate from '@/components/e-date';

  /**
   * Renders a date picker element.
   */
  export default {
    name: 'c-date-picker',

    components: {
      eDate,
    },
    // mixins: [],

    props: {
      /**
       * The initial start date. Provides `.sync` support.
       */
      start: {
        type: Date,
        default: () => new Date(),
      },

      /**
       * The initial end date. Provides `.sync` support.
       */
      end: {
        type: Date,
        default() {
          return this.$dayjs().add(7, 'day').toDate();
        },
      },

      /**
       * Allows to en-/disable range selection
       */
      range: {
        type: Boolean,
        default: false,
      },

      /**
       * Allows to overwrite the default start input label.
       */
      startLabel: {
        type: String,
        default: null,
      },

      /**
       * Allows to overwrite the default end input label.
       */
      endLabel: {
        type: String,
        default: null,
      },

      /**
       * Allows to overwrite the default start input field name.
       */
      startName: {
        type: String,
        default: 'start',
      },

      /**
       * Allows to overwrite the default end input field name.
       */
      endName: {
        type: String,
        default: 'end',
      },

      /**
       * Allows to invert styles on darker backgrounds.
       */
      negative: {
        type: Boolean,
        default: false,
      },

      /**
       * Allows to set a min date.
       */
      minDate: {
        type: Date,
        default: null,
      },

      /**
       * Allows to set a min date.
       */
      maxDate: {
        type: Date,
        default: null,
      },
    },
    data() {
      return {
        /**
         * @type {Object} Holds the instance of the calendar widget.
         */
        calendarInstance: null,

        /**
         * @type {Boolean} Holds the visibility state of the calendar widget.
         */
        isCalendarVisible: false,

        /**
         * @type {Date} Holds the currently selected start date.
         */
        startDate: this.start,

        /**
         * @type {Date} - Holds the currently selected end date.
         */
        endDate: this.end,

        /**
         * @type {Boolean} Determines if the start or end date is currently edited.
         */
        editRangeStart: true,

        /**
         * @type {Number} Holds the current close timeout id.
         */
        closeTimeout: null,

        /**
         * @type {Boolean} Holds the flag, if the calendar is currently in closing state.
         */
        isClosing: false,
      };
    },

    // computed: {},
    watch: {
      start(value, oldValue) {
        if (value?.getTime() !== oldValue?.getTime()) {
          this.startDate = value;
        }
      },

      end(value, oldValue) {
        if (value?.getTime() !== oldValue?.getTime()) {
          this.endDate = value;
        }
      },

      startDate(value, oldValue) {
        if (!this.calendarInstance) { // Cancel on external change.
          return;
        }

        if (this.$dayjs(value).format() === this.$dayjs(oldValue).format()) {
          return;
        }

        if (this.range) {
          this.calendarInstance.setStartRange(value);
          this.calendarInstance.draw();
        } else {
          this.close();
        }
        this.onChange();
      },

      endDate(value, oldValue) {
        if (!this.calendarInstance) { // Cancel on external change.
          return;
        }

        if (this.$dayjs(value).format() !== this.$dayjs(oldValue).format()) {
          this.calendarInstance.setEndRange(value);
          this.calendarInstance.draw();

          this.onChange();
        }
      },

      isCalendarVisible(show) {
        if (show && !this.calendarInstance) {
          this.createCalendar();
        }
      },
    },

    // beforeCreate() {},
    // created() {},
    // beforeMount() {},
    mounted() {
      if (this.isCalendarVisible) {
        this.createCalendar();
      }
    },
    // beforeUpdate() {},
    // updated() {},
    // activated() {},
    // deactivated() {},
    beforeDestroy() {
      this.calendarInstance?.destroy();
    },
    // destroyed() {},

    methods: {
      /**
       * Creates a calendar instance.
       */
      createCalendar() {
        const now = this.$dayjs();
        const weekdays = Array(7)
          .fill(null)
          .map((item, index) => now.day(index).toDate());

        const picker = new Pikaday({ // eslint-disable-line new-cap
          field: this.$refs.field,
          onSelect: this.onCalendarSelect.bind(this),
          showDaysInNextAndPreviousMonths: true,
          enableSelectionDaysInNextAndPreviousMonths: true,
          defaultDate: this.startDate,
          setDefaultDate: true,
          firstDay: 1,
          yearRange: 5,
          i18n: {
            previousMonth: this.$t('c-date-picker.previousMonth'),
            nextMonth: this.$t('c-date-picker.nextMonth'),
            months: Array(12)
              .fill(null)
              .map((item, index) => this.$d(now.month(index).toDate(), 'month')),
            weekdays: weekdays.map(date => this.$d(date, 'weekday')),
            weekdaysShort: weekdays.map(date => this.$d(date, 'weekdayNarrow')),
          },
          onDraw: this.onCalendarDraw.bind(this),
        });

        if (this.minDate) {
          picker.setMinDate(this.minDate);
        }

        if (this.maxDate) {
          picker.setMaxDate(this.maxDate);
        }

        this.calendarInstance = picker;

        this.$refs.calendar.appendChild(picker.el);

        if (this.range) {
          this.calendarInstance.setStartRange(this.startDate);
          this.calendarInstance.setEndRange(this.endDate);
          this.calendarInstance.draw(); // Pickaday does not update automatically when setting the Range. This seems to be a bug.
        }
      },

      /**
       * Callback handler for the select event of the calendar.
       *
       * @param {Date} date - The selected start or end date.
       */
      onCalendarSelect(date) {
        if (this.editRangeStart) {
          this.startDate = date;

          if (this.range) {
            if (date.getTime() > this.endDate) {
              this.endDate = date;
            }

            this.editRangeStart = false;
          }
        } else {
          this.endDate = date;

          if (date.getTime() < this.startDate) {
            this.startDate = date;
          } else {
            this.editRangeStart = true;
            this.close(true);
          }
        }
      },

      /**
       * Gets a field query selector for the given date.
       *
       * @param {Date} date - The date on which the selector is based on.
       *
       * @returns {String}
       */
      getRangeCellSelector(date) {
        const dayjsDate = this.$dayjs(date);
        const yearSelector = `[data-pika-year="${dayjsDate.year()}"]`;
        const monthSelector = `[data-pika-month="${dayjsDate.month()}"]`;
        const daySelector = `[data-pika-day="${dayjsDate.date()}"]`;

        return yearSelector + monthSelector + daySelector;
      },

      /**
       * Callback function for Pikadays draw event.
       *
       * This is mostly a workaround for a bug, where the range start/end are initially not marked with a class...
       *
       * @param {Pikaday} picker - The pikaday instance.
       */
      onCalendarDraw(picker) {
        if (this.range) {
          const calendar = picker.el;
          const startSelector = this.getRangeCellSelector(this.startDate);
          const start = calendar.querySelector(startSelector);
          const endSelector = this.getRangeCellSelector(this.endDate);
          const end = calendar.querySelector(endSelector);

          if (start) {
            start.parentElement.classList.add('is-startrange');
          }

          if (end) {
            end.parentElement.classList.add('is-endrange');
          }
        }
      },

      /**
       * Hides the calendar widget.
       *
       * @param {Boolean} delay - Allows to enable a delay before the calender is hidden (for improved user experience).
       */
      close(delay) {
        if (!this.isCalendarVisible) {
          return;
        }

        /**
         * Callback for the transition end event.
         */
        const onTransitionEnd = () => {
          this.isClosing = false;
          this.isCalendarVisible = false;

          this.$el.removeEventListener('transitionend', onTransitionEnd);
        };
        const elementInFocus = document.querySelector(':focus');

        // Remove focus on child elements to allow instant re-opening when clicking the element again.
        if (elementInFocus && (elementInFocus === this.$el || this.$el.contains(elementInFocus))) {
          elementInFocus.blur();
        }

        this.editRangeStart = true;

        this.closeTimeout = setTimeout(() => { // Gives a better experience, when the change is visible for a moment, before closing.
          this.$el.addEventListener('transitionend', onTransitionEnd);

          this.isClosing = true;

          this.$emit('close', {
            start: this.startDate,
            end: this.endDate,
          });
        }, delay ? 300 : 0);
      },

      /**
       * Shows the calendar widget.
       */
      show() {
        clearTimeout(this.closeTimeout);

        this.isCalendarVisible = true;
      },

      /**
       * Event handler for the focus event of the start input.
       */
      onStartFocus() {
        this.show();

        this.$nextTick(() => {
          this.calendarInstance?.gotoDate(this.startDate);
        });
      },

      /**
       * Event handler for the focus event of the end input.
       */
      onEndFocus() {
        this.editRangeStart = false;
        this.show();

        this.$nextTick(() => {
          this.calendarInstance?.gotoDate(this.endDate);
        });
      },

      /**
       * Handles internal data changes and emits an update to the parent.
       */
      onChange() {
        /**
         * Emits the currently start and end date when one of them changes.
         *
         * @event change
         *
         * @property {Date} start - The start date.
         * @property {Date} end - The end date.
         */
        this.$emit('change', {
          start: this.startDate,
          end: this.endDate,
        });

        /**
         * Updates the start value, so .sync can be used on the prop.
         *
         * @event update:start
         *
         * @property {Date} start - The end date.
         */
        this.$emit('update:start', this.startDate);

        /**
         * Updates the end value, so .sync can be used on the prop.
         *
         * @event update:end
         *
         * @property {Date} end - The start date.
         */
        this.$emit('update:end', this.endDate);
      },

      /**
       * Event handler for the today button.
       */
      onTodayClick() {
        this.calendarInstance.gotoToday();
      },
    },
    // render() {},
  };
</script>

<style lang="scss">
  @use '../setup/scss/variables';
  @use '../setup/scss/mixins';
  @use '../setup/scss/functions';
  @use '../setup/scss/extends.scss';

  .c-date-picker {
    $this: &;

    padding-top: variables.$spacing--20;
    position: relative;

    &__calendar-wrapper {
      position: absolute;
      min-width: 100%; // Width of anchor.
      margin-top: variables.$spacing--10;
      background: variables.$color-grayscale--1000;

      @include mixins.media(sm) {
        width: 500px;
        margin-top: variables.$spacing--15;
      }
    }

    &__calendar-header {
      position: relative;
      padding: variables.$spacing--15 variables.$spacing--55;
      border-bottom: 1px solid variables.$color-grayscale--600;
      text-align: center;
    }

    &__today,
    &__close {
      @extend %button-reset;

      color: variables.$color-grayscale--200;
    }

    &__close {
      position: absolute;
      top: 50%;
      right: variables.$spacing--15;
      transform: translateY(-50%);

      .e-icon img {
        width: 20px;
        height: 20px;
      }
    }

    &__calendar {
      display: flex;
      justify-content: center;

      @include mixins.media(sm) {
        padding: 0 variables.$spacing--60 variables.$spacing--25;
      }
    }

    &__backdrop {
      position: fixed;
      top: 0;
      right: 100%;
      bottom: 100%;
      left: 0;
      opacity: 0;
      background: rgba(variables.$color-grayscale--200, 0.8);
      transition: opacity variables.$transition-duration--200 ease-in-out;
    }

    &--range {
      #{$this}__anchor {
        display: grid;
        grid-template-areas: 'start' 'end';
        grid-template-columns: 1fr;
        grid-template-rows: auto auto;
        row-gap: variables.$spacing--10;

        @include mixins.media(sm) {
          grid-template-areas: 'start end';
          grid-template-columns: 1fr 1fr;
          grid-template-rows: auto;
          column-gap: variables.$spacing--25;
        }
      }

      #{$this}__start {
        grid-area: start;
      }

      #{$this}__end {
        grid-area: end;
      }
    }

    &--is-calendar-visible {
      @include mixins.z-index(front);

      #{$this}__anchor, // Safari backdrop layering fix.
      #{$this}__calendar-wrapper {
        @include mixins.z-index(front);
      }

      #{$this}__anchor { // Safari backdrop layering fix.
        position: relative;
      }

      #{$this}__backdrop {
        right: 0;
        bottom: 0;
        opacity: 1;
      }
    }

    &--is-closing {
      #{$this}__backdrop {
        right: 0;
        bottom: 0;
        opacity: 0;
      }

      #{$this}__calendar-wrapper {
        opacity: 0;
        transition: opacity variables.$transition-duration--200 ease-in-out;
      }
    }

    &.focus-item {
      position: relative; // Fixes z-index stacking.
      background: transparent;
    }
  }
</style>
