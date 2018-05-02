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
      type="text"
      @blur="onBlur"
      @focus="onFocus"
      @input="onInput"
      @mouseenter="hasHover = true"
      @mouseleave="hasHover = false"
    >
  </div>

</template>

<script>
  import formStates from '@/mixins/form-states';

  export default {

    name: 'e-input',
    mixins: [formStates],
    inheritAttrs: false,

    // components: {},

    props: {

      /**
       * Value passed by v-model
       */
      value: {
        default: null,
        type: String,
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
          ...this.stateModifiers
        };
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
        this.$emit('input', { value: event.target.value });
      },

      /**
       * Emits focus to parent and wrapper component
       * Update "hasFocus" state
       */
      onFocus() {
        this.hasFocus = true;

        this.$emit('focus');
        this.$parent.$emit('focus');
      },

      /**
       * Emits blur to parent and wrapper component
       * Update "hasFocus" state
       */
      onBlur() {
        this.hasFocus = false;

        this.$emit('blur');
        this.$parent.$emit('blur');
      }
    }
    // render() {},
  };
</script>

<style lang="scss">
  .e-input {
    @include half-border($color-grayscale--500);

    // input
    &__field {
      border: 1px solid transparent;
      border-radius: $border-radius--default;
      color: $color-grayscale--400;
      font-family: $font-family--primary;
      font-size: $font-size--14;
      height: 30px;
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
      background: $color-grayscale--1000;
      border: none;
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

    &--state-error {
      @include half-border($color-secondary--4);
      // TODO add info message and icon
    }

    &--state-error &__field:hover {
      border: 1px solid $color-secondary--4;
    }

    &--state-error &__field:focus {
      border: 1px solid $color-secondary--4;
    }

    &--state-info {
      // TODO add info message and icon
    }

    &--state-success {
      // TODO add info message and icon
    }
  }
</style>
