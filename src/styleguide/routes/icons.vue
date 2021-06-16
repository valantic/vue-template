<template>
  <l-default>
    <s-icon-finder :class="b('icon-finder')" />
  </l-default>
</template>

<script lang="ts">
  import sIconFinder from '@/styleguide/components/s-icon-finder.vue';

  export default {
    name: 'icons',
    components: {
      sIconFinder
    },
    // mixins: [],

    // props: {},
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
  };
</script>

<style lang="scss">
  .icons {
    &__icon-finder {
      max-width: 90%; // Prevent viewport overflow
    }
  }
</style>
