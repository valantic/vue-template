<template>
  <l-vas-layout>
    <s-icon-finder />
  </l-vas-layout>
</template>

<script lang="ts">
  import { lVasLayout } from '@valantic/vue-styleguide/layouts';
  import { defineComponent } from 'vue';
  import sIconFinder from '@/styleguide/components/s-icon-finder.vue';

  export default defineComponent({
    name: 'r-icons',
    components: {
      lVasLayout,
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
