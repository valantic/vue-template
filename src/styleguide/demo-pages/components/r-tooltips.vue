<template>
  <div :class="b()">
    <VTooltip>
      <h1>Tooltip</h1>

      <template #popper> This is the title of this page </template>
    </VTooltip>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  // type Setup = {};

  export default defineComponent({
    name: 'r-tooltips',
    // components: {},
    // directives: {},

    // props: {},
    // setup(): Setup {
    //   return {
    //   };
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
  @use '@/setup/scss/variables';

  .r-tooltips {
    display: flex;
  }
</style>
