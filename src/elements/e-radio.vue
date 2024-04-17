<template>
  <label
    :class="b(modifiers)"
    @mouseenter="hover = true"
    @mouseleave="hover = false"
  >
    <input
      v-model="internalValue"
      v-bind="$attrs"
      :class="b('field', fieldModifiers)"
      :value="value"
      :name="name"
      type="radio"
      @change="onChange"
    />
    <span :class="b('label')">
      <slot></slot>
    </span>
  </label>
</template>

<script lang="ts">
  import { defineComponent, toRefs } from 'vue';
  import useFormStates, { FormStates, withProps } from '@/compositions/form-states';
  import { Modifiers } from '@/plugins/vue-bem-cn/src/globals';

  /**
   * Renders a radio element. Use a v-for loop to generate a set of radio buttons.
   *
   * The displayed name can either be provided by the property `displayName` or as a slot.
   */
  export default defineComponent({
    name: 'e-radio',

    // components: {},
    inheritAttrs: false,

    props: {
      ...withProps(),

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

    emits: {
      'update:modelValue': (value: string | number): boolean => ['string', 'number'].includes(typeof value),
      'change': (value: string | number): boolean => ['string', 'number'].includes(typeof value),
    },

    setup(props): FormStates {
      return {
        ...useFormStates(toRefs(props).state),
      };
    },

    // data() {
    //   return {};
    // },

    computed: {
      /**
       * Getter/setter for the internal value.
       */
      internalValue: {
        get(): string | number {
          return this.modelValue;
        },
        set(value: string): void {
          /**
           * Fired on select of radio button.
           */
          this.$emit('update:modelValue', value);
        },
      },

      /**
       * Returns a configuration Object for modifier classes.
       */
      modifiers(): Modifiers {
        return {
          ...this.stateModifiers,
          selected: this.internalValue === this.value,
        };
      },

      /**
       * Returns all modifiers for the field class.
       */
      fieldModifiers(): Modifiers {
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
         */
        this.$emit('change', radioButton.value);
      },
    },
    // render() {},
  });
</script>

<style lang="scss">
  @use '../setup/scss/mixins';
  @use '../setup/scss/variables';

  .e-radio {
    $this: &;
    $label-size: 16px;

    @include mixins.font(variables.$font-size--16, 20px);

    position: relative;
    display: block;
    cursor: pointer;

    &__field {
      position: absolute;
      left: -200vw;
      -webkit-appearance: none;
    }

    &__label {
      display: block;
      margin: 0;
      padding-left: variables.$spacing--25;

      &:hover {
        color: variables.$color-grayscale--0;

        &::before {
          border-color: variables.$color-grayscale--0;
        }
      }

      &::before,
      &::after {
        position: absolute;
        top: 3px;
        left: 0;
        content: '';
        width: $label-size;
        height: $label-size;
        border-radius: 50%;
      }

      &::before {
        border: 1px solid variables.$color-grayscale--400;
      }

      &::after {
        opacity: 0;
        border: 1px solid transparent;
        background: variables.$color-grayscale--0;
        transform: scale(0);
        transition: transform 0.1s ease-in-out;
      }
    }

    &__field:checked + &__label {
      color: variables.$color-grayscale--0;

      &::after {
        opacity: 1;
        transform: scale(0.6);
      }
    }

    &__field:disabled + &__label {
      cursor: not-allowed;
      color: variables.$color-grayscale--400;

      &::before {
        border-color: variables.$color-grayscale--500;
      }
    }

    &__field:checked:disabled + &__label {
      cursor: not-allowed;

      &::after {
        background: variables.$color-grayscale--500;
      }
    }
  }
</style>
