<template>
  <div
    v-outside-click="close"
    :class="b({ range, isCalendarVisible })"
  >
    <div :class="b('anchor')">
      <e-date
        v-model="startDate"
        :class="b('start')"
        :label="startLabel || $t(range ? 'c-date-picker.inputStartLabel' : 'c-date-picker.inputLabel')"
        :name="startName"
        @focus="onFocusStartDate"
      >
        <e-icon
          :class="b('icon')"
          icon="i-calendar"
          size="18"
        />
      </e-date>
      <e-date
        v-if="range"
        v-model="endDate"
        :class="b('end')"
        :label="endLabel || $t('c-date-picker.inputEndLabel')"
        :name="endName"
        @focus="onFocusEndDate"
      >
        <e-icon
          :class="b('icon')"
          icon="i-calendar"
          size="18"
        />
      </e-date>
    </div>
    <transition :name="b('transition', { fade: true })">
      <div
        v-show="isCalendarVisible"
        :class="b('calendar-wrapper')"
      >
        <div :class="b('calendar-header')">
          <button
            :class="b('title')"
            type="button"
            @click.prevent="gotoToday"
          >
            {{ $t(range ? 'c-date-picker.calendarRangeTitle' : 'c-date-picker.calendarTitle') }}
          </button>
          <button
            :class="b('close')"
            :aria-label="$t('global.close')"
            type="button"
            @click.prevent="close(false)"
          >
            <e-icon
              icon="i-close"
              size="15"
            />
          </button>
        </div>
        <div
          ref="calendar"
          :class="b('calendar')"
        ></div>
      </div>
    </transition>
    <transition :name="b('transition', { fade: true })">
      <div
        v-if="isCalendarVisible"
        :class="b('backdrop')"
        @click="close(false)"
      ></div>
    </transition>
  </div>
</template>

<script lang="ts">
  import Pikaday from 'pikaday';
  import { Ref, defineComponent, ref } from 'vue';
  import eDate from '@/elements/e-date.vue';
  import eIcon from '@/elements/e-icon.vue';

  type Setup = {
    calendar: Ref<HTMLDivElement | undefined>;
  };

  type Data = {
    calendarInstance?: Pikaday;
    isCalendarVisible: boolean;
    startDate: Date;
    endDate: Date;
    editRangeStart: boolean;
    closeTimeout?: ReturnType<typeof setTimeout>;
  };

  type ChangePayload = {
    start: Date;
    end: Date;
  };

  /**
   * Renders a date picker element.
   */
  export default defineComponent({
    name: 'c-date-picker',

    components: {
      eDate,
      eIcon,
    },

    props: {
      /**
       * The initial start date.
       */
      start: {
        type: Date,
        default: () => new Date(),
      },

      /**
       * The initial end date.
       */
      end: {
        type: Date,
        default: undefined,
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
       * Allows to set a min date.
       */
      minDate: {
        type: Date,
        default: null,
      },

      /**
       * Allows to set a max date.
       */
      maxDate: {
        type: Date,
        default: null,
      },
    },
    emits: {
      'change': (payload: ChangePayload) => !!payload,
      'close': (payload: ChangePayload) => !!payload,
      'update:start': (payload: Date) => !!payload,
      'update:end': (payload: Date) => !!payload,
    },

    setup(): Setup {
      return {
        calendar: ref(),
      };
    },
    data(): Data {
      return {
        calendarInstance: undefined,
        isCalendarVisible: false,
        startDate: this.start,
        endDate: this.end || this.$dayjs().add(7, 'day').toDate(),
        editRangeStart: true,
        closeTimeout: undefined,
      };
    },

    // computed: {},
    watch: {
      start(value: Date, oldValue: Date): void {
        if (value?.getTime() !== oldValue?.getTime()) {
          this.startDate = value;
        }
      },

      end(value: Date, oldValue: Date): void {
        if (value?.getTime() !== oldValue?.getTime()) {
          this.endDate = value;
        }
      },

      startDate(value, oldValue): void {
        if (!this.calendarInstance) {
          // Cancel on external change.
          return;
        }

        if (this.$dayjs(value).format() === this.$dayjs(oldValue).format()) {
          return;
        }

        if (this.range) {
          this.calendarInstance.setStartRange(value);
          this.calendarInstance.draw(true);
        } else {
          this.close();
        }

        this.onChange();
      },

      endDate(value, oldValue): void {
        if (!this.calendarInstance) {
          // Cancel on external change.
          return;
        }

        if (this.$dayjs(value).format() !== this.$dayjs(oldValue).format()) {
          this.calendarInstance.setEndRange(value);
          this.calendarInstance.draw(true);

          this.onChange();
        }
      },

      isCalendarVisible(show): void {
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
        this.$nextTick(() => {
          this.createCalendar();
        });
      }
    },
    // beforeUpdate() {},
    // updated() {},
    // activated() {},
    // deactivated() {},
    beforeUnmount() {
      this.calendarInstance?.destroy();
    },
    // unmounted() {},

    methods: {
      createCalendar(): void {
        const now = this.$dayjs();
        const weekdays = Array(7)
          .fill(null)
          .map((item, index) => now.day(index).toDate());

        const picker = new Pikaday({
          // eslint-disable-line new-cap
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
            weekdays: weekdays.map((date) => this.$d(date, 'weekday')),
            weekdaysShort: weekdays.map((date) => this.$d(date, 'weekdayNarrow')),
          },
          onDraw: this.onCalendarDraw,
          keyboardInput: false, // Since Pikaday calls `onSelect` on every keyboard input, this is mostly useless for us, since we don't know if the user navigates or selects a date.
        });

        if (this.minDate) {
          picker.setMinDate(this.minDate);
        }

        if (this.maxDate) {
          picker.setMaxDate(this.maxDate);
        }

        this.calendarInstance = picker;
        this.calendar?.appendChild(picker.el);

        if (this.range) {
          this.calendarInstance.setStartRange(this.startDate);
          this.calendarInstance.setEndRange(this.endDate);
          this.calendarInstance.draw(true); // Pickaday does not update automatically when setting the Range. This seems to be a bug.
        }
      },

      onCalendarSelect(date: Date): void {
        if (this.editRangeStart) {
          this.startDate = date;

          if (this.range) {
            if (date.getTime() > this.endDate.getTime()) {
              this.endDate = date;
            }

            this.editRangeStart = false;
          }
        } else {
          this.endDate = date;

          if (date.getTime() < this.startDate.getTime()) {
            this.startDate = date;
          } else {
            this.editRangeStart = true;
            this.close(true);
          }
        }
      },

      getRangeCellSelector(date: Date): string {
        const dayjsDate = this.$dayjs(date);
        const yearSelector = `[data-pika-year="${dayjsDate.year()}"]`;
        const monthSelector = `[data-pika-month="${dayjsDate.month()}"]`;
        const daySelector = `[data-pika-day="${dayjsDate.date()}"]`;

        return yearSelector + monthSelector + daySelector;
      },

      onCalendarDraw(): void {
        if (this.range) {
          const calendar = this.calendarInstance?.el;

          if (!calendar) {
            return;
          }

          const startSelector = this.getRangeCellSelector(this.startDate);
          const start = calendar.querySelector(startSelector);
          const endSelector = this.getRangeCellSelector(this.endDate);
          const end = calendar.querySelector(endSelector);

          start?.parentElement?.classList.add('is-startrange');
          end?.parentElement?.classList.add('is-endrange');
        }
      },

      close(delay = true): void {
        if (!this.isCalendarVisible) {
          return;
        }

        // Closing delayed gives a better user experience showing the changed state for a moment.
        this.closeTimeout = setTimeout(
          () => {
            const activeElement = document.activeElement as HTMLElement;

            if (this.$el === activeElement || this.$el.contains(activeElement)) {
              // Removes focus on child elements so datepicker can be opened instantly again.
              activeElement.blur();
            }

            this.isCalendarVisible = false;
            this.editRangeStart = true;
            this.$emit('close', {
              start: this.startDate,
              end: this.endDate,
            });
          },
          delay ? 300 : 0
        );
      },

      show(): void {
        if (this.closeTimeout) {
          clearTimeout(this.closeTimeout);
        }

        this.isCalendarVisible = true;
      },

      onFocusStartDate(): void {
        this.show();

        this.$nextTick(() => {
          this.calendarInstance?.gotoDate(this.startDate);
        });
      },

      onFocusEndDate(): void {
        this.editRangeStart = false;
        this.show();

        this.$nextTick(() => {
          this.calendarInstance?.gotoDate(this.endDate);
        });
      },

      onChange(): void {
        this.$emit('change', {
          start: this.startDate,
          end: this.endDate,
        });
        this.$emit('update:start', this.startDate);
        this.$emit('update:end', this.endDate);
      },

      gotoToday(): void {
        this.calendarInstance?.gotoToday();
      },
    },
    // render() {},
  });
</script>

<style lang="scss">
  @use 'sass:color';
  @use '@/setup/scss/mixins';
  @use '@/setup/scss/variables';
  @use 'pikaday/css/pikaday';

  .c-date-picker {
    $this: &;

    position: relative;

    &__calendar-wrapper {
      position: absolute;
      min-width: 100%; // Width of anchor.
      margin-top: variables.$spacing--10;
      background: variables.$color-grayscale--1000;

      @include mixins.media(sm) {
        min-width: 500px;
        margin-top: variables.$spacing--15;
      }
    }

    &__calendar-header {
      position: relative;
      display: flex;
      gap: variables.$spacing--5;
      justify-content: center;
      padding: variables.$spacing--15;
      border-bottom: 1px solid variables.$color-grayscale--0;
      text-align: center;
    }

    &__close {
      top: 50%;
      right: variables.$spacing--15;
      cursor: pointer;
    }

    &__calendar {
      display: flex;
      justify-content: center;
      padding-block: variables.$spacing--20;
    }

    &__title {
      @include mixins.font(variables.$font-size--18, variables.$line-height--20);
    }

    &__backdrop {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(variables.$color-grayscale--0, 0.85);
    }

    &--range {
      #{$this}__anchor {
        display: grid;
        grid-template-areas: 'start' 'end';
        grid-template-columns: 1fr;
        grid-template-rows: auto auto;
        row-gap: variables.$spacing--10;

        @include mixins.media(xs) {
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
      @include mixins.z-index(datePicker);

      #{$this}__anchor, // Safari backdrop layering fix.
      #{$this}__calendar-wrapper {
        @include mixins.z-index(datePicker);
      }

      #{$this}__anchor {
        // Safari backdrop layering fix.
        position: relative;
      }

      .e-date {
        &__icon {
          color: variables.$color-grayscale--1000;
        }

        .e-input__field {
          &,
          &:focus,
          &:hover {
            border-bottom-color: variables.$color-grayscale--1000;
            background-color: variables.$color-grayscale--1000;
          }
        }
      }
    }

    &__transition {
      &--fade-enter-active,
      &--fade-leave-active {
        transition: opacity variables.$transition-duration--200 ease;
      }

      &--fade-enter-from,
      &--fade-leave-to {
        opacity: 0;
      }
    }

    .pika-single {
      @include mixins.z-index(datePicker);

      border: none;
      color: variables.$color-grayscale--0;
      font-family: variables.$font-family--primary;

      .pika-lendar {
        width: 100%;
        margin: 0;
      }

      .pika-title {
        .pika-label {
          @include mixins.font(variables.$font-size--18, variables.$line-height--20, variables.$font-weight--bold);
        }

        .pika-prev,
        .pika-next {
          opacity: 1;
        }

        .pika-prev {
          background-image: url('../assets/icons/i-arrow-2--left.svg');
        }

        .pika-next {
          background-image: url('../assets/icons/i-arrow-2--right.svg');
        }
      }

      thead th abbr {
        // Unfortunately no classes available
        @include mixins.font(variables.$font-size--14, variables.$line-height--18);

        color: variables.$color-grayscale--0;
      }

      .pika-button.pika-day {
        @include mixins.font(variables.$font-size--16, variables.$line-height--18);

        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: variables.$spacing--10;
        border: initial !important; // stylelint-disable-line declaration-no-important
        border-radius: initial !important; // stylelint-disable-line declaration-no-important
        background: none;
        box-shadow: initial !important; // stylelint-disable-line declaration-no-important
        color: variables.$color-grayscale--0;
      }

      .is-today {
        .pika-button.pika-day {
          font-weight: initial;
          text-decoration: underline;
          text-underline-position: under;
        }
      }

      .is-outside-current-month {
        .pika-button.pika-day {
          opacity: 1;
          color: variables.$color-grayscale--400;
        }
      }

      .is-startrange,
      .is-endrange,
      .is-selected {
        .pika-button.pika-day {
          background: variables.$color-primary--1;
          color: variables.$color-grayscale--1000;
          font-weight: initial;
        }
      }

      .is-inrange {
        .pika-button.pika-day {
          background: none;
          color: variables.$color-grayscale--0;

          &::before {
            @include mixins.z-index(back);

            position: absolute;
            top: 0;
            left: 0;
            content: '';
            width: 100%;
            height: 100%;
            opacity: 0.3;
            background-color: variables.$color-primary--1;
          }
        }
      }
    }
  }
</style>
