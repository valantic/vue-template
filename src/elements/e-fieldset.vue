<template>
  <fieldset :class="b()">
    <legend
      v-if="legend"
      :class="b('legend')"
    >
      <span :class="b('inner')">{{ legend }}</span>
    </legend>
    <div :class="b('fields')">
      <slot></slot>
    </div>
  </fieldset>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  // type Setup = {};
  // type Data = {};

  /**
   * Component to render a fieldset with or without legend.
   */
  export default defineComponent({
    name: 'e-fieldset',

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
    // setup(): Setup {
    //   return {};
    // },
    // data(): Data {
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
  @use '@/setup/scss/mixins';
  @use '@/setup/scss/variables';

  .e-fieldset {
    &__legend {
      @include mixins.font(variables.$va-font-size--18, 22px, variables.$va-font-weight--regular);
    }

    &__inner {
      display: inline-block;
    }

    &__fields {
      padding: variables.$va-spacing--5 0;
    }
  }
</style>
