<template>
  <l-default>
    <s-icon-finder :class="b('icon-finder')" />
  </l-default>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import sIconFinder from '@/styleguide/components/s-icon-finder.vue';

  export default defineComponent({
    name: 'r-icons',
    components: {
      sIconFinder,
    },

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
  });
</script>

<style lang="scss">
  .r-icons {
    &__icon-finder {
      max-width: 90%; // Prevent viewport overflow
    }
  }
</style>
