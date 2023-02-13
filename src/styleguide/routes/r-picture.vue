<template>
  <l-default>
    <e-picture :sizes="sizes"
               :width="300"
               :height="1500"
               srcset="https://images.pexels.com/photos/10313905/pexels-photo-10313905.jpeg"
               fallback="https://images.pexels.com/photos/9074921/pexels-photo-9074921.jpeg"
               alt="Image description"
    />
  </l-default>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import ePicture, { IImageSizes } from '@/elements/e-picture.vue';

  // interface ISetup {}
  interface IData {
    sizes: IImageSizes;
  }

  /**
   * A component that integrates the e-picture for testing its functionality and passing properties.
   */
  export default defineComponent({
    name: 'r-pictures',
    components: {
      ePicture,
    },

    // props: {},
    // emits: {},

    // setup(): ISetup {},
    data(): IData {
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
