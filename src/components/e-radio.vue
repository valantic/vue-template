<template>
  <span :class="b(modifiers)">
    <label :class="b('label')"
           @mouseenter="hover = true"
           @mouseleave="hover = false">
      <input v-model="internalValue"
             v-bind="$attrs"
             :class="b('field', fieldModifiers)"
             :disabled="disabled"
             :value="value"
             :name="name"
             type="radio"
             @change="onChange"
      >
      <span :class="b('fake-button')"></span>
      <span :class="b('label-name')">
        <slot></slot>
      </span>
    </label>
  </span>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import useFormStates, { IFormStates } from '@/compositions/form-states';
  import { IModifiers } from '@/plugins/vue-bem-cn/src/globals';

  interface ISetup extends IFormStates {}

  /**
   * Renders a radio element. Use a v-for loop to generate a set of radio buttons.
   *
   * The displayed name can either be provided by the property `displayName` or as a slot.
   */
  export default defineComponent({
    name: 'e-radio',
    status: 0, // TODO: remove when component was prepared for current project.

    // components: {},
    inheritAttrs: false,

    props: {
      /**
       * The model value to be used for v-model.
       */
      modelValue: {
        required: true,
        type: [String, Number],
      },

      /**
       * Adds name attribute.
       */
      name: {
        required: true,
        type: String,
      },

      /**
       * Adds value attribute.
       */
      value: {
        type: [String, Number, Boolean],
        required: true,
      },
    },

    setup(): ISetup {
      return {
        ...useFormStates(),
      };
    },

    // data() {
    //   return {};
    // },

    computed: {
      /**
       * Getter/setter for the internal value.
       *
       * @returns {Boolean}
       */
      internalValue: {
        get(): string | number {
          return this.modelValue;
        },
        set(value: string): void {
          /**
           * Fired on select of radio button.
           *
           * @event change
           * @type {String}
           */
          this.$emit('update:modelValue', value);
        }
      },

      /**
       * Returns a configuration Object for modifier classes.
       *
       * @returns {Object}
       */
      modifiers(): IModifiers {
        return {
          ...this.stateModifiers,
          selected: this.internalValue === this.value,
        };
      },

      /**
       * Returns all modifiers for the field class.
       *
       * @returns {Object}
       */
      fieldModifiers(): IModifiers {
        return {
          selected: this.internalValue === this.value,
        };
      },
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
    // beforeUnmount() {},
    // unmounted() {},

    methods: {
      /**
       * Emits input to parent component.
       */
      onChange(event: Event) {
        const radioButton = event.currentTarget as HTMLSelectElement;

        /**
         * Emits change event.
         *
         * @event change
         * @type {String}
         */
        this.$emit('change', radioButton.value);
      },
    },
    // render() {},
  });
</script>

<style lang="scss">
  .e-radio {
    @include font($font-size--14, 18px);

    display: block;
    position: relative;

    &__field {
      opacity: 0;
      position: absolute;
      left: -9999px;
    }

    &__fake-button::after {
      position: relative;
      content: '';
    }

    &__fake-button {
      -webkit-appearance: none;
      background-color: $color-grayscale--1000;
      border: 1px solid $color-grayscale--500;
      border-radius: 10px;
      display: inline-block;
      position: absolute;
      width: 16px;
      height: 16px;
      top: 0;
      left: 0;
      cursor: pointer;
    }

    &__label-name {
      cursor: pointer;
      color: $color-grayscale--400;
    }

    &__label {
      cursor: pointer;
      margin-bottom: 0;
      padding-left: $spacing--25;
    }

    &__field:checked ~ &__fake-button::after {
      background-color: $color-secondary--2;
      border-radius: 25px;
      content: '';
      display: block;
      height: 10px;
      width: 10px;
      left: 2px;
      top: 2px;
    }

    &__field:checked ~ &__fake-button {
      border: 1px solid $color-primary--1;
    }

    &__field:checked ~ &__label-name {
      color: $color-secondary--1;
    }

    /* stylelint-disable no-descending-specificity */

    // hover
    &--hover &__fake-button,
    &__field:hover ~ &__fake-button {
      border: 1px solid $color-primary--1;
    }

    // disabled
    &--disabled &__field ~ &__fake-button,
    &__field:disabled ~ &__fake-button {
      border-color: $color-grayscale--600;
      cursor: default;
    }

    &--disabled &__field:checked ~ &__fake-button::after,
    &__field:disabled:checked ~ &__fake-button::after {
      background-color: $color-grayscale--300;
    }

    &--disabled &__field ~ &__label-name,
    &__field:disabled ~ &__label-name {
      cursor: default;
      color: $color-grayscale--300;
    }

    &--disabled &__label {
      cursor: default;
    }
  }
</style>
