<template>
  <header :class="b()">
    <div :class="b('container')">
      <strong>Styleguide Header</strong>
    </div>
  </header>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  // type Setup = {};
  // type Data = {};

  export default defineComponent({
    name: 'c-header',

    // components: {},

    // props: {},
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

  .c-header {
    display: flex;

    &__container {
      @include mixins.layout();

      padding-top: 1rem;
      padding-bottom: 1rem;
    }
  }
</style>
