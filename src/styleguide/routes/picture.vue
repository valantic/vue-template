<template>
  <l-default>
    <e-picture alt="Altext"
               width="300"
               height="423"
               :sizes="sizes"
               srcset="https://images.pexels.com/photos/10313905/pexels-photo-10313905.jpeg"
               fallback="https://images.pexels.com/photos/9074921/pexels-photo-9074921.jpeg"
    />
  </l-default>
</template>

<script>
  import ePicture from '@/elements/e-picture.vue';
  import LDefault from '../../layouts/l-default.vue';

  export default {
    name: 'pictures',
    components: {
      LDefault,
      ePicture
    },
    // mixins: [],

    // props: {},
    data() {
      return {
        sizes: {
          '(min-width: 1000px)': 1000,
          '(min-width: 800px)': 800,
          '(min-width: 600px)': 600,
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
