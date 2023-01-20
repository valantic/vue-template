<template>
  <label
    :style="style"
    :class="b(modifiers)"
    :title="format"
  >
    <span :class="b('label-text')">{{ label }}</span>
    <input
      v-model.lazy.trim="dateString"
      :class="b('input')"
      :maxlength="format.length"
      :name="name"
      @keypress.enter.prevent
      @keypress="onEnter"
      @focus="onFocus"
      @blur="onBlur"
    >
    <e-icon
      :class="b('icon')"
      icon="i-date-picker"
      size="20"
    />
  </label>
</template>

<script>
  import getLocalizedDateFormat from '@/helpers/get-localized-date-format';

  /**
   * Renders a date styled input.
   */
  export default {
    name: 'e-date',

    // components: {},
    // mixins: [],

    model: {
      /**
       * Changes v-model behavior and use 'change' instead of 'input' as event.
       */
      prop: 'value',
      event: 'change',
    },

    props: {
      /**
       * The `name` value for the field.
       */
      name: {
        type: String,
        required: true,
      },

      /**
       * Allows to set the accepted input format.
       */
      format: {
        type: String,
        default: () => getLocalizedDateFormat(),
      },

      /**
       * Allows to invert styles on darker backgrounds.
       */
      negative: {
        type: Boolean,
        default: false,
      },

      /**
       * The current value.
       */
      value: {
        type: Date,
        default: () => new Date(),
      },

      /**
       * The `label` text for the field.
       */
      label: {
        type: String,
        default() {
          return this.$t('e-date.defaultLabel');
        },
      },
    },
    data() {
      return {
        /**
         * The actual, valid value of the component (as Day.js Object).
         */
        dateValue: this.$dayjs(this.value),

        /**
         * The display and editable value of the input field.
         */
        textValue: '',

        /**
         * Holds the validity state of the component.
         */
        invalid: false,
      };
    },

    computed: {
      /**
       * Returns the components BEM modifiers.
       *
       * @returns {Object}
       */
      modifiers() {
        return {
          invalid: this.invalid,
          negative: this.negative,
        };
      },

      /**
       * Returns dynamic styles for the component.
       *
       * @returns {Object}
       */
      style() {
        return {
          '--e-date-format-length': `${this.format.length}ch`,
        };
      },

      /**
       * Calculates the supported input format patterns.
       *
       * @returns {Array.<String>}
       */
      inputFormats() {
        const shortFormat = this.format
          .replace('DD', 'D')
          .replace('MM', 'M')
          .replace('YYYY', 'YY');

        return [this.format, shortFormat];
      },

      /**
       * Validates, saves and returns the editable string value of the input field.
       *
       * @returns {String}
       */
      dateString: {
        set(value) {
          const date = this.$dayjs(value, this.inputFormats);

          this.invalid = !date.isValid();

          if (this.invalid) {
            this.textValue = value;
          } else {
            this.dateValue = date;
          }
        },
        get() {
          return this.invalid
            ? this.textValue
            : this.dateValue.format(this.format);
        },
      },
    },
    watch: {
      /**
       * Reset the invalid state when the date updates (most likely from the date field).
       *
       * @param {Object} newValue - The updated value.
       * @param {Object} oldValue - The previous value.
       */
      dateValue(newValue, oldValue) {
        if (newValue.toDate().getTime() !== oldValue.toDate().getTime()) {
          this.invalid = false;

          /**
           * Sends the current value to the parent.
           *
           * @event change
           *
           * @property {Date} date - The current date value.
           */
          this.$emit('change', this.dateValue.toDate());
        }
      },

      /**
       * Handles updates on the value prop.
       *
       * @param {Date} date - The new date value.
       */
      value(date) {
        this.dateValue = this.$dayjs(date);
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
    // beforeDestroy() {},
    // destroyed() {},

    methods: {
      /**
       * Event handler for 'enter' keypress on the input.
       *
       * @param {Event} event - The original DOM event.
       */
      onEnter(event) {
        event.target.blur(); // Triggers update.
      },

      /**
       * Event handler for the focus event of the input.
       *
       * @param {Event} event - The original DOM event.
       */
      onFocus(event) {
        /**
         * Forwards the focus event to the parent component.
         *
         * @event focus
         *
         * @property {Event} event - The original DOM event.
         */
        this.$emit('focus', event);
      },

      /**
       * Event handler for the blur event of the input.
       *
       * @param {Event} event - The original DOM event.
       */
      onBlur(event) {
        /**
         * Forwards the blur event to the parent component.
         *
         * @event blur
         *
         * @property {Event} event - The original DOM event.
         */
        this.$emit('blur', event);
      },
    },
    // render() {},
  };
</script>

<style lang="scss">
  @use '../setup/scss/variables';
  @use '../setup/scss/mixins';
  @use '../setup/scss/extends';
  @use '../setup/scss/functions';

  .e-date {
    $height: 30px;
    $border: 1px;

    display: flex;
    align-items: center;
    padding: 0 variables.$spacing--25; // Equalizes vertical centering
    border: $border solid transparent;
    background: variables.$color-grayscale--800;
    border-radius: variables.$border-radius--500;

    &__label-text {
      grid-area: label;
      align-self: center;
      color: variables.$color-primary--1;
    }

    &__input,
    &__input-spacer {
      margin: 0 variables.$spacing--5;
      color: variables.$color-grayscale--200;
    }

    &__input {
      @extend %input-reset;

      grid-area: input;
      width: 14ch; // 8 letters + 2 dividers + some, because IE11 does not count outer spacing of 0
      height: $height - (2 * $border) - 1px;
      margin-bottom: 1px; // Improves vertical centering.
    }

    &__icon {
      grid-area: icon;
      margin-left: auto;

      img {
        width: 22px;
        height: 22px;
      }
    }

    &--negative {
      background: variables.$color-grayscale--600;
    }

    &--invalid {
      border-color: variables.$color-status--danger;
    }
  }
</style>
