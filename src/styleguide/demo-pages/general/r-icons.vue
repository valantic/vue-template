<template>
  <l-vas-layout>
    <p>
      We use this icons:
      <a href="https://www.flaticon.com/authors/basic-miscellany/lineal?author_id=159">
        https://www.flaticon.com/authors/basic-miscellany
      </a>
    </p>
    <s-icon-finder />
  </l-vas-layout>
</template>

<script lang="ts">
  import lVasLayout from '@valantic/vue-styleguide/src/layouts/l-vas-layout.vue';
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
