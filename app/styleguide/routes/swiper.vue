<template>
  <div :class="b()">
    <h1>Slider example (c-swiper)</h1>

    <c-swiper :images="images" :options="options"/>

  </div>
</template>

<script>
  import CSwiper from '@/components/c-swiper';

  export default {
    name: 'swiper',
    components: {
      CSwiper,
    },
    data() {
      return {
        images: this.$store.getters['product/images'],
        options: {},
      };
    },
  };
</script>

<style lang="scss">
  .swiper {
    max-width: 1200px;
    padding: $spacing--50;
  }
</style>

