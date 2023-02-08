<template>
  <l-default>
    <e-picture :sizes="sizes"
               srcset="https://images.pexels.com/photos/10313905/pexels-photo-10313905.jpeg"
               fallback="https://images.pexels.com/photos/9074921/pexels-photo-9074921.jpeg"
               width="300"
               height="423"
               alt="Image description"
    />
  </l-default>
</template>

<script>
  import ePicture from '@/elements/e-picture.vue';
  import lDefault from '../../layouts/l-default.vue';

  export default {
    name: 'pictures',
    components: {
      lDefault,
      ePicture
    },
    // mixins: [],

    // props: {},
    data() {
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
    // beforeDestroy() {},
    // destroyed() {},

    // methods: {},
    // render() {},
  };
</script>
