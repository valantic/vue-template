<template>
  <label :class="b()">
    <span
      v-if="$slots.default"
      :class="b('label')"
    >
      <!-- @slot renders its content as element label -->
      <slot></slot>
    </span>
    <input
      v-model="internalValue"
      :class="b('input')"
      type="checkbox"
    />
    <span :class="b('slider')"></span>
  </label>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 's-toggle',

    // components: {},

    props: {
      /**
       * The model value to be used for v-model.
       */
      modelValue: {
        type: Boolean,
        default: false,
      },
    },

    emits: {
      'update:modelValue': (value: unknown): boolean => typeof value !== 'undefined',
    },

    // data() {
    //   return {};
    // },

    computed: {
      /**
       * Sets/gets value of component model and parent model.
       */
      internalValue: {
        get(): boolean {
          return this.modelValue;
        },
        set(value: boolean) {
          /**
           * Emits checkbox value e.g. true/false or value
           */
          this.$emit('update:modelValue', value);
        },
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

    // methods: {},
    // render() {},
  });
</script>

<style lang="scss">
  @use '../../setup/scss/variables';

  $_s-slider__size: 1.2em;

  .s-toggle {
    $this: &;

    display: flex;
    justify-content: space-between;

    &__slider {
      position: relative;
      align-self: flex-end;
      width: 2 * $_s-slider__size;
      height: $_s-slider__size;
      border-radius: $_s-slider__size;
      background-color: variables.$color-grayscale--600;
      cursor: pointer;
      transition: variables.$transition-duration--300;

      &::before {
        position: absolute;
        top: 0.1 * $_s-slider__size;
        left: 0.1 * $_s-slider__size;
        content: '';
        width: 0.8 * $_s-slider__size;
        height: 0.8 * $_s-slider__size;
        border-radius: 50%;
        background-color: variables.$color-primary--3;
        transition: variables.$transition-duration--300;
      }
    }

    &__input {
      display: none;

      &:checked + #{$this}__slider {
        background-color: variables.$color-primary--1;
      }

      &:checked + #{$this}__slider::before {
        transform: translateX($_s-slider__size);
      }
    }
  }
</style>
