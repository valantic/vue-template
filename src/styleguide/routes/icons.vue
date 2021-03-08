<template>
  <l-default>
    <s-icon-finder :class="b('icon-finder')" />
  </l-default>
</template>

<script>
  import sIconFinder from '@/styleguide/components/s-icon-finder';

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
  };
</script>

<style lang="scss">
  .icons {
    &__icon-finder {
      max-width: 90%; // Prevent viewport overflow
    }
  }
</style>
