<template>
  <l-vas-layout>
    <div :class="b('section')">
      <e-loading-indicator />
    </div>
  </l-vas-layout>
</template>

<script lang="ts">
  import lVasLayout from '@valantic/vue-styleguide/src/layouts/l-vas-layout.vue';
  import { defineComponent } from 'vue';
  import eLoadingIndicator from '@/elements/e-loading-indicator.vue';

  // type Setup = {};
  // type Data = {};

  export default defineComponent({
    name: 'r-loading-indicator',
    components: {
      eLoadingIndicator,
      lVasLayout,
    },

    // props: {},
    // emits: {},

    // setup(): Setup {},
    // data(): Data {
    //   return {
    //   };
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
  .r-loading-indicator {
    &__section {
      margin-bottom: 8rem;
    }
  }
</style>
