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
  @use '../setup/scss/mixins';
  @use '../setup/scss/variables';

  .e-fieldset {
    &__legend {
      @include mixins.font(variables.$font-size--18, 22px, variables.$font-weight--regular);
    }

    &__inner {
      display: inline-block;
    }

    &__fields {
      padding: variables.$spacing--5 0;
    }
  }
</style>
