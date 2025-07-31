<template>
  <l-vas-layout>
    <e-picture
      :sizes="sizes"
      :width="300"
      :height="1500"
      srcset="https://images.pexels.com/photos/10313905/pexels-photo-10313905.jpeg"
      fallback="https://images.pexels.com/photos/9074921/pexels-photo-9074921.jpeg"
      alt="Image description"
    />
  </l-vas-layout>
</template>

<script lang="ts">
  import lVasLayout from '@valantic/vue-styleguide/src/layouts/l-vas-layout.vue';
  import { defineComponent } from 'vue';
  import ePicture, { ImageSizes } from '@/elements/e-picture.vue';

  // type Setup = {}
  type Data = {
    sizes: ImageSizes;
  };

  /**
   * A component that integrates the e-picture for testing its functionality and passing properties.
   */
  export default defineComponent({
    name: 'r-pictures',
    components: {
      lVasLayout,
      ePicture,
    },

    // props: {},
    // emits: {},

    // setup(): Setup {},
    data(): Data {
      return {
        sizes: {
          1440: 1400,
          xs: 200,
          sm: 400,
          md: 800,
        },
      };
    },

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
