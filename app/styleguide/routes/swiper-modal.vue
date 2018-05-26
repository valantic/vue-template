<template>
  <div :class="b()">
    <h1>Slider example (c-swiper-modal)</h1>
    <e-button @click="modalState = true">Open swiper</e-button>
    <c-modal
      :open="modalState"
      size="600"
      inner-spacing="0"
      @close="close"
    >
      <c-swiper-modal :images="product.images" :initialSlide="10"/>
    </c-modal>
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
    data() {
      return {
        modalState: false
      };
    },
    computed: {
      ...mapGetters({
        product: 'product/product',
      })
    },
    mounted() {
      this.modalState = true;
    },
    methods: {
      close() {
        this.modalState = false;
      }
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

