<template>
  <label :class="b()">
    <span v-if="this.$slots.default" :class="b('label')">
      <!-- @slot renders its content as element label -->
      <slot></slot>
    </span>
    <input v-model="internalValue"
           :class="b('input')"
           type="checkbox">
    <span :class="b('slider')"></span>
  </label>
</template>

<script>

  /**
   * Renders a checkbox as toggle element.
   */
  export default {
    name: 's-toggle',
    status: 0, // TODO: remove when component was prepared for current project.

    // components: {},
    // mixins: [],

    model: {
      /**
       * Changes v-model behavior and use 'checked' instead of 'value' as prop.
       * Avoids conflict with default value attribute.
       */
      prop: 'checked',
      event: 'change',
    },

    props: {
      checked: {
        type: Boolean,
        required: true
      }
    },
    // data() {
    //   return {};
    // },

    computed: {
      /**
       * Sets/gets value of component model and parent model.
       *
       * @returns  {Boolean}   Status of the checkbox
       */
      internalValue: {
        get() {
          return this.checked;
        },
        set(value) {
          /**
           * Emits checkbox value e.g. true/false or value
           *
           * @event change
           * @type {Boolean|Array}
           */
          this.$emit('change', value);
        }
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
    // beforeUnmount() {},
    // unmounted() {},

    methods: {
      /**
       * Event handler for the change event of the toggle element.
       *
       * @param {Event} event - The related DOM event.
       */
      onChange(event) {
        this.internalValue = event.target.checked;
      }
    },
    // render() {},
  };
</script>

<style lang="scss">
  $_s-slider__size: 1.2em;

  .s-toggle {
    $this: &;

    display: flex;
    justify-content: space-between;

    &__slider {
      position: relative;
      cursor: pointer;
      width: 2 * $_s-slider__size;
      height: $_s-slider__size;
      align-self: flex-end;
      border-radius: $_s-slider__size;
      background-color: $color-grayscale--600;
      transition: $transition-duration-300;

      &::before {
        position: absolute;
        content: "";
        height: 0.8 * $_s-slider__size;
        width: 0.8 * $_s-slider__size;
        left: 0.1 * $_s-slider__size;
        top: 0.1 * $_s-slider__size;
        border-radius: 50%;
        background-color: $color-primary--3;
        transition: $transition-duration-300;
      }
    }

    &__input {
      display: none;

      &:checked + #{$this}__slider {
        background-color: $color-primary--1;
      }

      &:checked + #{$this}__slider::before {
        transform: translateX($_s-slider__size);
      }
    }
  }
</style>
