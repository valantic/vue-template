<template>
  <div :class="b({ isFullWidth })">
    <v-date-picker
      :value="value"
      :scrollable="false"
      :locale="$i18n.locale"
      :allowed-dates="validateDate"
      :events="events"
      v-bind="$attrs"
      first-day-of-week="1"
      no-title
      full-width
      @input="$emit('input', $event)"
    />
  </div>
</template>

<script>
  import * as VDatePicker from 'vuetify/es5/components/VDatePicker';
  import * as VGrid from 'vuetify/es5/components/VGrid';

  /**
   * Renders a custom styled vuetify date picker.
   * See https://vuetifyjs.com/en/components/date-pickers for further information.
   */
  export default {
    name: 'c-date-picker',
    components: {
      ...VDatePicker,
      ...VGrid,
    },
    // mixins: [],

    props: {
      /**
       * The currently selected date. The format needs to be an ISO 8601 string (YYYY-MM-DD).
       */
      value: {
        default: '',
        type: String,
      },

      /**
       * Function that checks for allowed dates for the datepicker.
       */
      validateDate: {
        default: null,
        type: Function,
      },

      /**
       * Function that checks for event dates for the datepicker.
       */
      events: {
        default: null,
        type: Function,
      },

      /**
       * Defines if the date-picker should fill up 100%.
       */
      isFullWidth: {
        default: true,
        type: Boolean,
      },
    },
    // data() {
    //   return {};
    // },

    // computed: {},
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

    // methods: {},
    // render() {},
  };
</script>

<style lang="scss">
  .c-date-picker {
    color: $color-grayscale--400;
    width: 100%;
    min-width: 220px;
    background-color: $color-grayscale--1000;

    @include media(xs) {
      width: 300px;
    }

    &--is-full-width {
      @include media(xs) {
        width: 100%;
      }
    }

    // Adjust vuetify styles
    .v-picker { // Increases weight of selectors
      .v-date-picker-header {
        padding: $spacing--5 0;
        color: $color-grayscale--400;

        .v-date-picker-header__value:not(.v-date-picker-header__value--disabled) strong:not(:hover) {
          color: $color-grayscale--400 !important; // stylelint-disable-line declaration-no-important
        }

        .v-btn {
          color: $color-grayscale--500;
          border: 0;

          &:focus { // stylelint-disable-line max-nesting-depth
            outline: none;
          }
        }
      }

      .v-date-picker-table {
        padding: 0 $spacing--5;
        height: 232px;

        thead {
          border-bottom: 1px solid $color-secondary--1;
        }

        th {
          @include font($font-size--16, 20px, $font-weight--regular);

          color: $color-secondary--1;
          padding: $spacing--5 0;
        }

        td {
          padding: $spacing--5 0;
        }

        .v-btn { // stylelint-disable-line no-descending-specificity
          @include font($font-size--18, 16px);

          color: $color-grayscale--400;
          height: 28px;
          width: 28px;
          border: 1px solid transparent;
          cursor: pointer;
          background-color: transparent;

          &:focus { // stylelint-disable-line max-nesting-depth
            outline: none;
          }
        }
      }

      .v-btn::before {
        color: $color-secondary--1;
        border-radius: $border-radius--default;
      }

      .v-date-picker-table .v-btn.v-btn--active {
        border-radius: $border-radius--default;
        border: 1px solid $color-secondary--1;
        outline: none;
        color: $color-secondary--1;
        background: none;

        &::before {
          background-color: $color-grayscale--1000;
        }
      }

      .v-btn.v-btn--outline {
        border-color: transparent;
        border-radius: $border-radius--default;

        .v-btn__content {
          color: $color-secondary--1;
        }
      }

      .v-picker__body {
        border-bottom: 3px solid $color-primary--1;
        cursor: default;
      }

      .v-date-picker-years {
        margin-bottom: 0;
        color: $color-grayscale--400;

        .active { // stylelint-disable-line selector-class-pattern
          color: $color-secondary--1;
        }
      }

      .v-btn.v-btn--disabled {
        color: $color-grayscale--450;
      }

      .v-date-picker-table__event {
        bottom: 5px;
        content: "";
        height: 28px;
        transform: translateX(-14px);
        width: 28px;
        border-radius: 3px;
        border: 1px solid $color-grayscale--500;
        z-index: -1;
      }
    }
  }
</style>
