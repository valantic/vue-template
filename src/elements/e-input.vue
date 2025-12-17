<template>
  <span :class="b(modifiers)">
    <input
      v-model="internalValue"
      ref="input"
      :autocomplete="autocomplete"
      :class="b('field')"
      :name="name"
      :title="title"
      v-bind="$attrs"
      @blur="onBlur"
      @focus="onFocus"
      @keyup.enter="onEnterKeyUp"
      @mouseenter="hover = true"
      @mouseleave="hover = false"
    />

    <span
      v-if="$slots.default || !hasDefaultState"
      ref="slot"
      :class="b('slot-wrapper')"
    >
      <span
        v-if="$slots.default"
        :class="b('slot')"
      >
        <!-- @slot Use this slot for Content next to the input value. For e.g. icons or units. -->
        <slot></slot>
      </span>
      <template v-if="!hasDefaultState && !focus && stateIcon">
        <span :class="b('icon-splitter')"></span>
        <e-icon
          :class="b('state-icon')"
          :icon="stateIcon"
        />
      </template>
    </span>
    <span
      v-if="showNotification"
      :class="b('notification')"
    >
      <c-form-notification :state="state">
        <!-- eslint-disable-next-line vue/no-v-html -->
        <span v-html="notification"></span>
      </c-form-notification>
    </span>
  </span>
</template>

<script lang="ts">
  import propScale from '@valantic/frontend-utils/src/helpers/prop-scale';
  import { Ref, defineComponent, ref, toRefs } from 'vue';
  import cFormNotification from '@/components/c-form-notification.vue';
  import useFormStates, { FormStates, withProps } from '@/compositions/form-states';
  import eIcon from '@/elements/e-icon.vue';
  import { Modifiers } from '@/plugins/vue-bem-cn/src/globals';

  type Setup = FormStates & {
    input: Ref<HTMLInputElement | null>;
    slot: Ref<HTMLSpanElement | null>;
    slotStart: Ref<HTMLSpanElement | null>;
  };

  // type Data = {};

  /**
   * Input form component
   *
   * **WARNING: uses 'v-html' for the 'notification'. Make sure, that the source for this data is trustworthy.**
   */
  export default defineComponent({
    name: 'e-input',

    components: {
      eIcon,
      cFormNotification,
    },

    inheritAttrs: false,

    props: {
      ...withProps(),

      /**
       * Value passed by v-model
       */
      modelValue: {
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
        type: String,
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
       * Defines the notification content in a state container below the input field
       */
      notification: {
        type: String,
        default: null,
      },

      /**
       * Defines the border Style
       *
       * Available values: [0, 500]
       * Default: 500
       */
      border: propScale(500, [0, 500]),

      /**
       * Option for selecting value text on focus.
       */
      selectOnFocus: {
        type: Boolean,
        default: false,
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
    },

    emits: {
      'update:modelValue': (payload: string | number) => typeof payload === 'string',
      'focus': () => true,
      'blur': () => true,
      'enter': () => true,
    },

    setup(props): Setup {
      const input = ref();
      const slot = ref();
      const slotStart = ref();

      return {
        ...useFormStates(toRefs(props).state),
        input,
        slot,
        slotStart,
      };
    },

    // data(): Data {
    //   return {};
    // },
    computed: {
      /**
       * Returns a flag, if field notifications should be displayed.
       */
      showNotification(): boolean {
        return !!(this.state && this.state !== 'default' && this.notification && this.focus);
      },

      /**
       * Defines state modifier classes.
       */
      modifiers(): Modifiers {
        const { border, noNativeControl, notification } = this;

        return {
          ...this.stateModifiers,
          notification: notification && this.focus,
          type: this.$attrs.type !== null || 'text',
          border,
          noNativeControl,
        };
      },

      /**
       * Handles the internal value of the input field.
       */
      internalValue: {
        get(): string | number {
          return this.modelValue;
        },
        set(value: string | number) {
          this.$emit('update:modelValue', value);
        },
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

        if (this.slotStart) {
          const slotWidth = this.slotStart.clientWidth;

          if (this.input) {
            this.input.style.paddingLeft = `${slotWidth + 15}px`;
          }
        }
      },

      /**
       * Selects the value of the input field.
       */
      selectValue() {
        if (this.modelValue) {
          // Needed to select a number value on Chrome.
          this.input?.select();

          // Timeout is needed that it works on all browsers (without there are problems on Safari, Edge, iOS)
          if ('ontouchstart' in window) {
            setTimeout(() => {
              const selectionRange = typeof this.modelValue === 'string' ? this.modelValue.length : this.modelValue;

              this.input?.setSelectionRange(0, selectionRange);
            });
          }
        }
      },
    },
    // render() {},
  });
</script>

<style lang="scss">
  @use '@/setup/scss/mixins';
  @use '@/setup/scss/variables';
  // stylelint-disable no-descending-specificity
  // TODO: refactor style to get rid of no-descending-specificity

  $e-input-height: 2rem;

  .e-input {
    $this: &;

    position: relative;
    display: block;

    &--border-0 &__field {
      border: 1px solid transparent;
    }

    // input
    &__field {
      @include mixins.font(variables.$va-font-size--14, 18px);

      position: relative;
      width: 100%;
      height: $e-input-height;
      padding: variables.$va-spacing--5 variables.$va-spacing--10;
      border: 1px solid var(--theme-color-grayscale--500);
      border-radius: variables.$va-border-radius--100;
      color: var(--theme-color-secondary--1);
      font-family: variables.$va-font-family--text;

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
    &__field::-webkit-input-placeholder {
      // WebKit, Blink, Edge
      opacity: 1;
      color: var(--theme-color-grayscale--400);
      font-family: variables.$va-font-family--text;
    }

    &__field:-moz-placeholder {
      // Mozilla Firefox 4 to 18
      opacity: 1;
      color: var(--theme-color-grayscale--400);
      font-family: variables.$va-font-family--text;
    }

    &__field::placeholder {
      // Most modern browsers support this now
      opacity: 1;
      color: var(--theme-color-grayscale--400);
      font-family: variables.$va-font-family--text;
    }

    &__fixed-label {
      @include mixins.font(variables.$va-font-size--14, 18px);

      position: absolute;
      top: 50%;
      left: variables.$va-spacing--5;
      display: flex;
      transform: translateY(-50%);
      color: var(--theme-color-grayscale--400);
    }

    &__icon-splitter {
      margin: 0 variables.$va-spacing--5;
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
      right: variables.$va-spacing--5;
      display: flex;
      transform: translateY(-50%);
      pointer-events: none;
    }

    &__slot {
      @include mixins.font(variables.$va-font-size--14);

      display: flex;
      color: var(--theme-color-grayscale--400);
      line-height: $e-input-height;
    }

    // active
    &:not(&--border-0) &__field:active,
    &--active:not(&--border-0) &__field {
      border: 1px solid var(--theme-color-grayscale--400);
    }

    // focus
    &__field:focus,
    &--focus &__field {
      outline: none;
    }

    &:not(&--border-0) &__field:focus,
    &--focus:not(&--border-0) &__field {
      border: 1px solid var(--theme-color-grayscale--400);
    }

    // hover
    &:not(&--border-0) &__field:hover,
    &--hover:not(&--border-0) &__field {
      border: 1px solid var(--theme-color-grayscale--400);
    }

    // disabled
    &__field:disabled,
    &:not(&--border-0) &__field:disabled,
    &--disabled &__field,
    &--disabled:not(&--border-0) &__field,
    &--disabled &__field:hover,
    &--disabled:not(&--border-0) &__field:hover {
      border-color: var(--theme-color-grayscale--600);
      background-color: var(--theme-color-grayscale--1000);
      color: var(--theme-color-grayscale--400);

      &::placeholder {
        color: var(--theme-color-grayscale--400);
      }
    }

    &--disabled {
      #{$this}__slot {
        color: var(--theme-color-grayscale--300);
      }
    }

    /**
      * states
      **/
    &--state-default {
      .e-input__slot-wrapper {
        right: variables.$va-spacing--5;
      }
    }

    &--state-error:not(.e-input--border-0) &__field {
      border-color: var(--theme-color-status--error);
    }

    &--state-error .e-input__icon-splitter {
      border-color: var(--theme-color-status--error);
    }

    &--state-error:not(.e-input--border-0) &__field:hover {
      border: 1px solid var(--theme-color-status--error);
    }

    &--state-error:not(.e-input--border-0) &__field:focus {
      border: 1px solid var(--theme-color-status--error);
    }

    &--state-info {
      .e-input__icon-splitter {
        border-color: var(--theme-color-grayscale--500);
      }
    }

    &--state-error {
      color: var(--theme-color-status--error);
    }

    &--state-success {
      .e-input__icon-splitter {
        display: none;
      }
    }

    /**
     * Notification is visible
     */
    &--notification {
      .e-input__field {
        padding: variables.$va-spacing--5 variables.$va-spacing--10;
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
