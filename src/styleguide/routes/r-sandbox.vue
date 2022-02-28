<template>
  <div :class="b()">
    <h1>Sandbox</h1>
    <h2>E-Logo</h2>
    <e-logo custom-theme="01" />
    <h2>
      C-Breadbrumb
    </h2>
    <c-breadcrumb />
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import ELogo from '@/components/e-logo.vue';
  import CBreadcrumb from '@/components/c-breadcrumb.vue';

  export default defineComponent({
    name: 'r-sandbox',
    components: {
      CBreadcrumb,
      ELogo,
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
  .r-sandbox {
    // Add specific styles.
  }
</style>
