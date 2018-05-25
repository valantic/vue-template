<template>
  <div :class="b()">
    <h1>Slider example (c-swiper)</h1>
    <c-swiper :images="images"/>

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
      };
    },
  };
</script>

<style lang="scss">
  .swiper {
    padding: $spacing--30 $spacing--10;

    @include media(xs) {
      max-width: 1000px;
      padding: $spacing--30;
    }
  }
</style>

