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
           @mouseenter="hover = true"
           @mouseleave="hover = false"
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
           @mouseenter="hover = true"
           @mouseleave="hover = false"
    >

    <span v-if="$slots.default || !hasDefaultState" ref="slot" :class="b('slot-wrapper')">
      <span v-if="$slots.default" :class="b('slot')">
        <!-- @slot Use this slot for Content next to the input value. For e.g. icons or units. -->
        <slot></slot>
      </span>
      <span v-if="!hasDefaultState && !focus" :class="b('icon-splitter')"></span>
      <e-icon v-if="!hasDefaultState && !focus"
              :class="b('state-icon')"
              :icon="stateIcon" />
    </span>
    <span v-if="showNotification" :class="b('notification')">
      <!-- eslint-disable-next-line vue/no-v-html -->
      <c-form-notification v-html="notification" :state="state" />
    </span>
  </span>
</template>

<script lang="ts">
  import { defineComponent, ref, Ref } from 'vue';
  import propScale from '@/helpers/prop.scale';
  import cFormNotification from '@/components/c-form-notification.vue';
  import useFormStates, { IFormStates } from '@/compositions/form-states';
  import { IModifiers } from '@/plugins/vue-bem-cn/src/globals';

  interface ISetup extends IFormStates {
    input: Ref<HTMLInputElement | null>;
    slot: Ref<HTMLSpanElement | null>;
  }

  /**
   * Input form component
   *
   * **WARNING: uses 'v-html' for the 'notification'. Make sure, that the source for this data is trustworthy.**
   */
  export default defineComponent({
    name: 'e-input',
    status: 0, // TODO: remove when component was prepared for current project.

    components: {
      cFormNotification
    },
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

    setup(): ISetup {
      const input = ref();
      const slot = ref();

      return {
        ...useFormStates(),
        input,
        slot,
      };
    },

    data() { // TODO: add interface. Why is no error thrown?
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
      showNotification(): boolean {
        return !!(this.state && this.state !== 'default' && this.notification && this.focus);
      },

      /**
       * Defines state modifier classes.
       *
       * @returns  {Object}   BEM classes
       */
      modifiers(): IModifiers {
        const {
          border,
          noNativeControl,
          notification
        } = this;

        return {
          ...this.stateModifiers,
          notification: notification && this.focus,
          type: this.$attrs.type !== null || 'text',
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

      if (this.uncontrolled && this.input) {
        this.input.value = this.standalone ? this.internalValue.toString() : this.value.toString();
      }
    },
    // beforeUpdate() {},
    updated() {
      setTimeout(this.setSlotSpacings);
    },
    // activated() {},
    // deactivated() {},
    // beforeUnmount() {},
    unmounted() {
      window.removeEventListener('resizeend', this.setSlotSpacings);
    },

    methods: {
      /**
       * Emits input to parent component.
       */
      onInput(event: Event) {
        const target = event.target as HTMLInputElement;

        this.internalValue = target.value;

        /**
         * input event fires on input
         *
         * @event input
         */
        this.$emit('input', target.value);
      },

      /**
       * Emits focus to parent and wrapper component.
       * Update "focus" state.
       */
      onFocus() {
        this.focus = true;

        if (this.selectOnFocus) {
          this.selectValue();
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
       * Update "focus" state.
       */
      onBlur() {
        this.focus = false;

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
        if (this.slot) {
          const slotWidth = this.slot.clientWidth;

          if (this.input) {
            this.input.style.paddingRight = `${slotWidth + 10}px`;
          }
        }
      },

      /**
       * Selects the value of the input field.
       */
      selectValue() {
        if (this.$props.value) {
          // Needed to select a number value on Chrome.
          this.input?.select();

          // Timeout is needed that it works on all browsers (without there are problems on Safari, Edge, iOS)
          if ('ontouchstart' in window) {
            setTimeout(() => {
              const selectionRange = typeof this.$props.value === 'string' ? this.$props.value.length : this.$props.value;

              this.input?.setSelectionRange(0, selectionRange);
            });
          }
        }
      },
    }
    // render() {},
  });
</script>

<style lang="scss">
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
      @include font($font-size--14, 18px);

      border: 1px solid $color-grayscale--500;
      border-radius: $border-radius--500;
      color: $color-secondary--1;
      font-family: $font-family--primary;
      height: $e-input-height;
      position: relative;
      transition: box-shadow $transition-duration-200 ease-in-out;
      width: 100%;
      padding: $spacing--5 $spacing--10;

      // disable iPhone styling
      -webkit-appearance: none;

      // sets proper input color for safari
      -webkit-text-fill-color: initial;
    }

    // remove x on in put field within IE
    &__field::-ms-clear {
      display: none;
      height: 0;
      width: 0;
    }

    // Hide autofill Safari icon
    // noinspection CssInvalidPseudoSelector
    &__field::-webkit-contacts-auto-fill-button {
      visibility: hidden;
      pointer-events: none;
      position: absolute;
      right: 0;
    }

    // placeholder (has to be split in seperate blocks to work on each browser)
    &__field::-webkit-input-placeholder { // WebKit, Blink, Edge
      color: $color-grayscale--400;
      opacity: 1;
    }

    &__field:-moz-placeholder { // Mozilla Firefox 4 to 18
      color: $color-grayscale--400;
      opacity: 1;
    }

    &__field::placeholder { // Most modern browsers support this now
      color: $color-grayscale--400;
      opacity: 1;
    }

    &__field:-ms-input-placeholder { // IE 11
      color: $color-grayscale--400;
      opacity: 1;
    }

    &__fixed-label {
      @include font($font-size--14, 18px);

      color: $color-grayscale--400;
      position: absolute;
      left: $spacing--5;
      top: 50%;
      transform: translateY(-50%);
      display: flex;
    }

    &__icon-splitter {
      border-left: 1px solid;
      margin: 0 $spacing--5;
    }

    &__notification {
      @include z-index(form-notification);

      display: block;
      position: absolute;
      width: 100%;
      top: calc(#{$e-input-height} - 1px);
    }

    &__slot-wrapper {
      position: absolute;
      right: $spacing--5;
      top: 50%;
      transform: translateY(-50%);
      display: flex;
    }

    &__slot {
      @include font($font-size--14);

      display: flex;
      line-height: $e-input-height;
      color: $color-grayscale--400;
    }

    // active
    &:not(&--border-0) &__field:active,
    &--active:not(&--border-0) &__field {
      border: 1px solid $color-grayscale--400;
    }

    // focus
    &__field:focus,
    &--focus &__field {
      outline: none;
    }

    &:not(&--border-0) &__field:focus,
    &--focus:not(&--border-0) &__field {
      border: 1px solid $color-grayscale--400;
    }

    // hover
    &:not(&--border-0) &__field:hover,
    &--hover:not(&--border-0) &__field {
      border: 1px solid $color-grayscale--400;
    }

    // disabled
    &__field:disabled,
    &:not(&--border-0) &__field:disabled,
    &--disabled &__field,
    &--disabled:not(&--border-0) &__field,
    &--disabled &__field:hover,
    &--disabled:not(&--border-0) &__field:hover {
      background-color: $color-grayscale--1000;
      border-color: $color-grayscale--600;
      color: $color-grayscale--300;

      &::placeholder {
        color: $color-grayscale--300;
      }
    }

    &--disabled {
      #{$this}__slot {
        color: $color-grayscale--300;
      }
    }

    /**
    * states
    **/
    &--state-default {
      .e-input__slot-wrapper {
        right: $spacing--5;
      }
    }

    &--state-error:not(.e-input--border-0) &__field {
      border-color: $color-status--danger;
    }

    &--state-error .e-input__icon-splitter {
      border-color: $color-status--danger;
    }

    &--state-error:not(.e-input--border-0) &__field:hover {
      border: 1px solid $color-status--danger;
    }

    &--state-error:not(.e-input--border-0) &__field:focus {
      border: 1px solid $color-status--danger;
    }

    &--state-info {
      .e-input__icon-splitter {
        border-color: $color-grayscale--500;
      }
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
        padding: $spacing--5 $spacing--10;
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
        -webkit-appearance: none;
        margin: 0;
      }
    }

    .e-input__field::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }
</style>
