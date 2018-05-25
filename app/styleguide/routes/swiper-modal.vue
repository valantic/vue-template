<template>
  <div :class="b()">
    <h1>Slider example (c-swiper-modal)</h1>
    <c-swiper-modal :images="product.images"/>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import CSwiperModal from '@/components/c-swiper-modal';

  export default {
    name: 'swiper-modal',
    components: {
      CSwiperModal,
    },
    computed: {
      ...mapGetters({
        product: 'product/product',
      })
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

