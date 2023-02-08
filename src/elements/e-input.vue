<template>
  <span :class="b(modifiers)">
    <input v-if="uncontrolled"
           ref="input"
           :autocomplete="autocomplete"
           :class="b('field')"
           :disabled="disabled"
           :name="name"
           :title="title"
           v-bind="$attrs"
           @blur="onBlur"
           @focus="onFocus"
           @input="onInput"
           @keyup.enter="onEnterKeyUp"
           @mouseenter="mixinHasHover = true"
           @mouseleave="mixinHasHover = false"
    >
    <input v-else
           ref="input"
           :autocomplete="autocomplete"
           :class="b('field')"
           :disabled="disabled"
           :name="name"
           :value="standalone ? internalValue : value"
           :title="title"
           v-bind="$attrs"
           @blur="onBlur"
           @focus="onFocus"
           @input="onInput"
           @keyup.enter="onEnterKeyUp"
           @mouseenter="mixinHasHover = true"
           @mouseleave="mixinHasHover = false"
    >

    <span v-if="$slots.default || !mixinHasDefaultState" ref="slot" :class="b('slot-wrapper')">
      <span v-if="$slots.default" :class="b('slot')">
        <!-- @slot Use this slot for Content next to the input value. For e.g. icons or units. -->
        <slot></slot>
      </span>
      <span v-if="!mixinHasDefaultState && !focus" :class="b('icon-splitter')"></span>
      <e-icon v-if="!mixinHasDefaultState && !focus"
              :class="b('state-icon')"
              :icon="mixinStateIcon" />
    </span>
    <span v-if="showNotification" :class="b('notification')">
      <!-- eslint-disable-next-line vue/no-v-html -->
      <c-form-notification v-html="notification" :state="state" />
    </span>
  </span>
</template>

<script>
  import propScale from '@/helpers/prop.scale';
  import cFormNotification from '@/components/c-form-notification.vue';
  import mixinFormStates from '@/mixins/form-states';
  import eIcon from '@/elements/e-icon';

  /**
   * Input form component
   *
   * **WARNING: uses 'v-html' for the 'notification'. Make sure, that the source for this data is trustworthy.**
   */
  export default {
    name: 'e-input',
    status: 0, // TODO: remove when component was prepared for current project.

    components: {
      eIcon,
      cFormNotification
    },
    mixins: [mixinFormStates],
    inheritAttrs: false,

    props: {

      /**
       * Value passed by v-model
       */
      value: {
        default: null,
        type: [String, Number],
      },

      /**
       * Adds name attribute
       */
      name: {
        required: true,
        type: String,
      },

      /**
       *  Adds title attribute
       */
      title: {
        default: null,
        type: String
      },

      /**
       * Adds autocomplete
       * Please refer to:
       * [HTML5 input autocomplete](https://developer.mozilla.org/de/docs/Web/HTML/Element/Input#attr-autocomplete)
       */
      autocomplete: {
        type: String,
        default: 'off',
      },

      /**
       * Defines the notification content in a state container bellow the input field
       */
      notification: {
        type: String,
        default: null
      },

      /**
       * Defines the border Style
       *
       * Available values: [0, 500]
       * Default: 500
       */
      border: propScale(500, [
        0,
        500,
      ]),

      /**
       * Option for selecting value text on focus.
       */
      selectOnFocus: {
        type: Boolean,
        default: false
      },

      /**
       * Hides the native browser control with CSS.
       *
       * Currently supported: `input[type="number"]`
       */
      noNativeControl: {
        type: Boolean,
        default: false,
      },

      /**
       * Allows to use the input as standalone.
       *
       * If 'true'
       * - $props.value will be used to set initial value.
       * - the component is not reactive to $props.value changes.
       */
      standalone: {
        type: Boolean,
        default: false
      },

      /**
       * Lets input handle value itself. This is used as in some cases the IE11 couldn't handle new input values
       * (e.g. skipped random keystrokes in searchSuggestion field).
       */
      uncontrolled: {
        type: Boolean,
        default: false
      },
    },

    data() {
      return {
        internalValue: this.value
      };
    },
    computed: {
      /**
       * Returns a flag, if field notifications should be displayed.
       *
       * @returns {Boolean}
       */
      showNotification() {
        return this.state && this.state !== 'default' && this.notification && this.hasFocus;
      },

      /**
       * Defines state modifier classes.
       *
       * @returns  {Object}   BEM classes
       */
      modifiers() {
        const {
          border,
          noNativeControl,
          notification
        } = this;

        return {
          ...this.mixinStateModifiers,
          notification: notification && this.hasFocus,
          type: this.$attrs.type || 'text',
          border,
          noNativeControl,
        };
      },
    },
    // watch: {},

    // beforeCreate() {},
    // created() {},
    // beforeMount() {},
    mounted() {
      /**
       * Calls the "setSlotSpacings" in a timeout function with a delay of 200ms because without
       * it's not working on iOS
       */
      this.setSlotSpacings();
      setTimeout(this.setSlotSpacings, 200);

      window.addEventListener('resizeend', this.setSlotSpacings);

      if (this.uncontrolled && this.$refs.input) {
        this.$refs.input.value = this.standalone ? this.internalValue : this.value;
      }
    },
    // beforeUpdate() {},
    updated() {
      setTimeout(this.setSlotSpacings);
    },
    // activated() {},
    // deactivated() {},
    // beforeDestroy() {},
    destroyed() {
      window.removeEventListener('resizeend', this.setSlotSpacings);
    },

    methods: {
      /**
       * Emits input to parent component.
       *
       * @param   {String}  event   Field input
       */
      onInput(event) {
        this.internalValue = event.target.value;

        /**
         * input event fires on input
         *
         * @event input
         */
        this.$emit('input', event.target.value);
      },

      /**
       * Emits focus to parent and wrapper component.
       * Update "hasFocus" state.
       *
       * @param {Event} event - The DOM event.
       */
      onFocus(event) {
        this.hasFocus = true;

        if (this.selectOnFocus) {
          this.selectValue(event);
        }

        /**
         * "focus" event fires on focus.
         *
         * @event focus
         */
        this.$emit('focus');
      },

      /**
       * Emits blur to parent and wrapper component.
       * Update "hasFocus" state.
       */
      onBlur() {
        this.hasFocus = false;

        /**
         * blur event fires on blur
         *
         * @event blur
         */
        this.$emit('blur');
      },

      /**
       * Emits enter key event to parent and wrapper component.
       */
      onEnterKeyUp() {
        /**
         * Enter keyboard event gets fired if user clicks on enter or num-pad enter.
         *
         * @event enter
         */
        this.$emit('enter');
      },

      /**
       * Calculates the width of the slot content and sets it as a padding-right to the input-field.
       */
      setSlotSpacings() {
        if (this.$refs.slot) {
          const slotWidth = this.$refs.slot.clientWidth;

          this.$refs.input.style.paddingRight = `${slotWidth + 10}px`;
        }
      },

      /**
       * Selects the value of the input field.
       */
      selectValue() {
        if (this.$props.value) {
          // Needed to select a number value on Chrome.
          this.$refs.input.select();

          // Timeout is needed that it works on all browsers (without there are problems on Safari, Edge, iOS)
          if ('ontouchstart' in window) {
            setTimeout(() => {
              this.$refs.input.setSelectionRange(0, this.$props.value.length);
            });
          }
        }
      },
    }
    // render() {},
  };
</script>

<style lang="scss">
  @use '../setup/scss/mixins';
  @use '../setup/scss/variables';
  // stylelint-disable no-descending-specificity
  // TODO: refactor style to get rid of no-descending-specificity

  $e-input-height: 30px;

  .e-input {
    $this: &;

    position: relative;
    display: block;

    &--border-0 &__field {
      border: 1px solid transparent;
    }

    // input
    &__field {
      @include mixins.font(variables.$font-size--14, 18px);

      position: relative;
      width: 100%;
      height: $e-input-height;
      padding: variables.$spacing--5 variables.$spacing--10;
      border: 1px solid variables.$color-grayscale--500;
      border-radius: variables.$border-radius--500;
      color: variables.$color-secondary--1;
      font-family: variables.$font-family--primary;

      // disable iPhone styling
      -webkit-appearance: none;

      // sets proper input color for safari
      -webkit-text-fill-color: initial;
    }

    // remove x on in put field within IE
    &__field::-ms-clear {
      display: none;
      width: 0;
      height: 0;
    }

    // Hide autofill Safari icon
    // noinspection CssInvalidPseudoSelector
    &__field::-webkit-contacts-auto-fill-button {
      position: absolute;
      right: 0;
      visibility: hidden;
      pointer-events: none;
    }

    // placeholder (has to be split in seperate blocks to work on each browser)
    &__field::-webkit-input-placeholder { // WebKit, Blink, Edge
      opacity: 1;
      color: variables.$color-grayscale--400;
      font-family: variables.$font-family--primary;
    }

    &__field:-moz-placeholder { // Mozilla Firefox 4 to 18
      opacity: 1;
      color: variables.$color-grayscale--400;
      font-family: variables.$font-family--primary;
    }

    &__field::placeholder { // Most modern browsers support this now
      opacity: 1;
      color: variables.$color-grayscale--400;
      font-family: variables.$font-family--primary;
    }

    &__fixed-label {
      @include mixins.font(variables.$font-size--14, 18px);

      position: absolute;
      top: 50%;
      left: variables.$spacing--5;
      display: flex;
      transform: translateY(-50%);
      color: variables.$color-grayscale--400;
    }

    &__icon-splitter {
      margin: 0 variables.$spacing--5;
      border-left: 1px solid;
    }

    &__notification {
      @include mixins.z-index(form-notification);

      position: absolute;
      top: calc(#{$e-input-height} - 1px);
      display: block;
      width: 100%;
    }

    &__slot-wrapper {
      position: absolute;
      top: 50%;
      right: variables.$spacing--5;
      display: flex;
      transform: translateY(-50%);
    }

    &__slot {
      @include mixins.font(variables.$font-size--14);

      display: flex;
      color: variables.$color-grayscale--400;
      line-height: $e-input-height;
    }

    // active
    &:not(&--border-0) &__field:active,
    &--active:not(&--border-0) &__field {
      border: 1px solid variables.$color-grayscale--400;
    }

    // focus
    &__field:focus,
    &--focus &__field {
      outline: none;
    }

    &:not(&--border-0) &__field:focus,
    &--focus:not(&--border-0) &__field {
      border: 1px solid variables.$color-grayscale--400;
    }

    // hover
    &:not(&--border-0) &__field:hover,
    &--hover:not(&--border-0) &__field {
      border: 1px solid variables.$color-grayscale--400;
    }

    // disabled
    &__field:disabled,
    &:not(&--border-0) &__field:disabled,
    &--disabled &__field,
    &--disabled:not(&--border-0) &__field,
    &--disabled &__field:hover,
    &--disabled:not(&--border-0) &__field:hover {
      border-color: variables.$color-grayscale--600;
      background-color: variables.$color-grayscale--1000;
      color: variables.$color-grayscale--300;

      &::placeholder {
        color: variables.$color-grayscale--300;
      }
    }

    &--disabled {
      #{$this}__slot {
        color: variables.$color-grayscale--300;
      }
    }

    /**
    * states
    **/
    &--state-default {
      .e-input__slot-wrapper {
        right: variables.$spacing--5;
      }
    }

    &--state-error:not(.e-input--border-0) &__field {
      border-color: variables.$color-status--error;
    }

    &--state-error .e-input__icon-splitter {
      border-color: variables.$color-status--error;
    }

    &--state-error:not(.e-input--border-0) &__field:hover {
      border: 1px solid variables.$color-status--error;
    }

    &--state-error:not(.e-input--border-0) &__field:focus {
      border: 1px solid variables.$color-status--error;
    }

    &--state-info {
      .e-input__icon-splitter {
        border-color: variables.$color-grayscale--500;
      }
    }

    &--state-error {
      color: variables.$color-status--error;
    }

    &--state-success {
      .e-input__icon-splitter {
        display: none;
      }
    }

    /*
     * Notification is visible
     */
    &--notification {
      .e-input__field {
        padding: variables.$spacing--5 variables.$spacing--10;
        background: none;
      }
    }

    .e-icon {
      display: flex;
      margin: auto;
    }

    &--type-hidden {
      display: none;
    }
  }

  .e-input--no-native-control {
    .e-input__field {
      // NOTE: FF also uses webkit style. But it will be overwritten by 'appearance' (and vendor prefixing).
      // 'none' must be used to remove native webkit shadow.
      -webkit-appearance: none;
      appearance: textfield;

      &::-webkit-inner-spin-button,
      &::-webkit-outer-spin-button {
        margin: 0;
        -webkit-appearance: none;
      }
    }

    .e-input__field::-webkit-inner-spin-button {
      margin: 0;
      -webkit-appearance: none;
    }
  }
</style>
