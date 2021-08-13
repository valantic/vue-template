<template>
  <fieldset :class="b()">
    <legend v-if="legend" :class="b('legend')">
      <span :class="b('inner')">{{ legend }}</span>
    </legend>
    <div :class="b('fields')">
      <slot></slot>
    </div>
  </fieldset>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  /**
   *
   * Component to render a fieldset with or without legend.
   *
   */
  export default defineComponent({
    name: 'e-fieldset',
    status: 0, // TODO: remove when component was prepared for current project.

    // components: {},
    // mixins: [],

    props: {
      /**
       * Defines the legend of the fieldset
       *
       */
      legend: {
        type: String,
        default: null,
      },
    },
    // data() {
    //   return {};
    // },

    // computed: {},
    // watch: {},

    // beforeCreate(): void {},
    // created(): void {},
    // beforeMount(): void {},
    // mounted(): void {},
    // beforeUpdate(): void {},
    // updated(): void {},
    // activated(): void {},
    // deactivated(): void {},
    // beforeUnmount(): void {},
    // unmounted(): void {},

    // methods: {},
    // render(): void {},
  });
</script>

<style lang="scss">
  .e-fieldset {
    &__legend {
      @include font($font-size--18, 22px, $font-weight--regular);
    }

    &__inner {
      display: inline-block;
    }

    &__fields {
      padding: $spacing--5 0;
    }
  }
</style>
