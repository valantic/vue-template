<template>

  <div :class="b(modifiers)">
    <input
      :autocomplete="autocomplete"
      :class="b('field')"
      :disabled="disabled"
      :name="name"
      :value="value"
      :title="title"
      v-bind="$attrs"
      @blur="onBlur"
      @focus="onFocus"
      @input="onInput"
      @mouseenter="isHover = true"
      @mouseleave="isHover = false"
    >
    <span v-if="!hasDefaultState && !hasFocus" :class="b('icon-splitter')"></span>
    <div v-if="notification && hasFocus" :class="b('notification')">
      <c-form-notification :state="state" v-html="notification"/>
    </div>
  </div>

</template>

<script>
  import CFormNotification from '@/components/c-form-notification';
  import formStates from '../mixins/form-states';

  /**
   * Input form component
   */
  export default {
    name: 'e-input',
    components: {
      CFormNotification
    },
    mixins: [formStates],
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
      }
    },

    computed: {

      /**
       * Defines state modifier classes
       *
       * @returns  {Object}   BEM classes
       */
      modifiers() {
        return {
          ...this.stateModifiers,
          notification: this.$props.notification && this.hasFocus
        };
      },
      hasDefaultState() {
        return this.state === 'default';
      }
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
       * Emits input to parent component
       *
       * @param   {String}  event   Field input
       */
      onInput(event) {
        /**
         * input event fires on input
         *
         * @event input
         * @type {String}
         */
        this.$emit('input', event.target.value);
      },

      /**
       * Emits focus to parent and wrapper component
       * Update "hasFocus" state
       */
      onFocus() {
        this.hasFocus = true;

        /**
         * focus event fires on focus
         *
         * @event focus
         */
        this.$emit('focus');
        this.$parent.$emit('focus');
      },

      /**
       * Emits blur to parent and wrapper component
       * Update "hasFocus" state
       */
      onBlur() {
        this.hasFocus = false;

        /**
         * blur event fires on blur
         *
         * @event blur
         */
        this.$emit('blur');
        this.$parent.$emit('blur');
      }
    }
    // render() {},
  };
</script>

<style lang="scss">
  $e-input-height: 30px;

  .e-input {
    @include half-border($color-grayscale--500);

    // input
    &__field {
      @include font-size($font-size--14);

      border: 1px solid transparent;
      border-radius: $border-radius--default;
      color: $color-grayscale--400;
      font-family: $font-family--primary;
      height: $e-input-height;
      position: relative;
      transition: box-shadow 0.15s ease-in-out;
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

    // placeholder
    &__field::-webkit-input-placeholder, // WebKit, Blink, Edge
    &__field:-moz-placeholder, // Mozilla Firefox 4 to 18
    &__field:-ms-input-placeholder, // Internet Explorer 10-11
    &__field::placeholder { // Most modern browsers support this now
      color: $color-grayscale--400;
      opacity: 1;
    }

    &__icon-splitter {
      position: absolute;
      right: 30px;
      height: calc(100% - 4px);
      top: 2px;
      border-left: 1px solid;
    }

    &__notification {
      @include z-index(form-notification);

      position: absolute;
      width: 100%;
      top: calc(#{$e-input-height} - 1px);
    }

    // active
    &__field:active,
    &--active &__field {
      border: 1px solid $color-grayscale--500;
    }

    // focus
    &__field:focus,
    &--focus &__field {
      border: 1px solid $color-grayscale--500;
      box-shadow: 0 2px 5px 0 rgba($color-grayscale--400, 0.5);
      color: $color-secondary--1;
      outline: none;
    }

    // hover
    &__field:hover,
    &--hover &__field {
      border: 1px solid $color-grayscale--500;
    }

    // disabled
    &__field:disabled,
    &--disabled &__field,
    &--disabled &__field:hover {
      background-color: $color-grayscale--1000;
      border-color: transparent;
      color: $color-grayscale--600;

      &::placeholder {
        color: $color-grayscale--600;
      }
    }

    &--disabled::before,
    &--disabled::after {
      border-color: $color-grayscale--600;
    }

    /**
    * states
    **/
    /* stylelint-disable no-descending-specificity */
    &--state-error {
      @include half-border($color-status--danger);

      .e-input__field {
        @include form-state-icon('error');
      }

      .e-input__icon-splitter {
        border-color: $color-status--danger;
      }
    }

    &--state-error &__field:hover {
      border: 1px solid $color-status--danger;
    }

    &--state-error &__field:focus {
      border: 1px solid $color-status--danger;
    }

    &--state-info {
      .e-input__field {
        @include form-state-icon('info');
      }

      .e-input__icon-splitter {
        border-color: $color-grayscale--500;
      }
    }

    &--state-success {
      .e-input__field {
        @include form-state-icon('success');
      }

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
  }
</style>
