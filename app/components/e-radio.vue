<template>
  <div :class="b(modifiers)">
    <input :class="b('field')"
           v-bind="$attrs"
           :disabled="disabled"
           :value="value"
           v-model="internalValue"
           :name="name"
           :id="id"
           type="radio"
           @change="onChange"
    >
    <label :class="b('fake-button')" :for="id"></label>
    <label :class="b('label')" :for="id">{{ displayName }}</label>
  </div>
</template>

<script>
  import formStates from '@/mixins/form-states';

  export default {
    name: 'e-radio',
    // components: {},
    mixins: [formStates],
    inheritAttrs: false,

    model: {
      /**
       * Changes v-model behavior and use 'selected' instead of 'value' as prop.
       * Avoids conflict with default value attribute.
       */
      prop: 'selected',
      event: 'change',
    },

    props: {
      /**
       * Id of radio element. Needed to set the label for the element.
       */
      id: {
        required: true,
        type: String,
      },

      /**
       * Value attribute.
       */
      value: {
        required: true,
        type: String,
      },

      /**
       * Display name of the radio element. Value can't be used because of the v-model logic.
       */
      displayName: {
        required: true,
        type: String,
      },

      /**
       * Adds name attribute.
       */
      name: {
        required: true,
        type: String,
      },

      /**
       * Adds selected attribute to be used by v-model.
       */
      selected: {
        default: '',
        type: String,
      }
    },
    // data() {
    //   return {};
    // },

    computed: {
      internalValue: {
        get() {
          return this.selected;
        },
        set(value) {
          /**
           * Emits radio value.
           */
          this.$emit('change', value);
        }
      },

      modifiers() {
        return {
          ...this.stateModifiers,
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
      onChange(event) {
        /**
         * Change event
         *
         * @event change
         * @type {String}
         */
        this.$emit('change', event.target.value);
      },
    },
    // render() {},
  };
</script>

<style lang="scss">
  .e-radio {
    &__field {
      opacity: 0;
      position: absolute;
    }

    &__fake-button::after {
      position: relative;
      content: '';
    }

    &__fake-button {
      -webkit-appearance: none;
      background-color: $color-grayscale--1000;
      border: 1px solid $color-grayscale--400;
      border-radius: 10px;
      display: inline-block;
      position: relative;
      width: 16px;
      height: 16px;
      top: 10px;
      cursor: pointer;
    }

    &__field:checked ~ &__fake-button::after {
      background-color: $color-secondary--2;
      position: relative;
      border-radius: 25px;
      content: '';
      display: block;
      height: 10px;
      width: 10px;
      left: 2px;
      top: 2px;
    }

    &__field:checked ~ &__label {
      color: $color-secondary--2;
    }

    &__label {
      padding-left: $spacing--10;
      cursor: pointer;
      color: $color-grayscale--400;
    }

    // focus
    &__field:focus ~ &__fake-button,
    &--focus &__fake-button {
      border: 1px solid $color-primary--1;
    }

    &__field:focus ~ &__label,
    &--focus &__label {
      color: $color-secondary--2;
    }

    // hover
    &__field:hover ~ &__fake-button,
    &--hover &__fake-button {
      border: 1px solid $color-primary--1;
    }

    // disabled
    &__field:disabled ~ &__fake-button,
    &--disabled &__fake-button {
      border-color: $color-grayscale--500;
      cursor: default;
    }
    &__field:disabled ~ &__label {
      cursor: default;
      color: $color-grayscale--500;
    }

    /*
     * states
     */
    &--state-info {
      pointer-events: none;

      .e-radio__fake-button {
        background-color: $color-grayscale--1000;
        border: 1px solid $color-grayscale--400;

        &::after,
        &:hover {
          background-color: $color-grayscale--1000;
          border-color: $color-grayscale--400;
        }

        &:checked::after {
          background-color: $color-grayscale--400;
        }

        &:checked ~ .e-radio__label {
          color: $color-grayscale--400;
        }
      }
    }
  }
</style>
