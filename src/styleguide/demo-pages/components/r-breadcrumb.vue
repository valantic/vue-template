<template>
  <l-vas-layout>
    <c-breadcrumb />
  </l-vas-layout>
</template>

<script lang="ts">
  import lVasLayout from '@valantic/vue-styleguide/src/layouts/l-vas-layout.vue';
  import { defineComponent } from 'vue';
  import cBreadcrumb from '@/components/c-breadcrumb.vue';

  // type Setup = {};
  // type Data = {};

  export default defineComponent({
    name: 'r-breadcrumb',
    components: {
      cBreadcrumb,
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
