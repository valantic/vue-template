<template>
  <div :class="b()">
    <VTooltip>
      <h1 :class="b('headline')">Tooltip</h1>

      <template #popper> This is the title of this page </template>
    </VTooltip>

    <button
      v-tooltip="{ content: 'Tooltip content here', disabled: false }"
      type="button"
    >
      A button
    </button>
  </div>
</template>

<script lang="ts">
  import VTooltip from 'floating-vue';
  import { defineComponent } from 'vue';

  // type Setup = {};
  // type Data = {};

  export default defineComponent({
    name: 'r-tooltips',
    components: {
      vTooltip: VTooltip,
    },
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
    &__headline {
      display: inline;
    }
  }
</style>
