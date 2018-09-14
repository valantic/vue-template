<template>
  <l-default>
    <div :class="b()">
      <h1>Hero slider examples</h1>
      <div :class="b('hero-gallery')">
        <h2>Less than seven images (c-swiper-hero)</h2>
        <c-swiper-hero :images="items" :options="{ loop: false }" />
      </div>

      <div :class="b('hero-gallery')">
        <h2>More than seven images (c-swiper-hero)</h2>
        <c-swiper-hero :images="items2" :options="{ speed: 1000 }" />
      </div>

      <div :class="b('product-gallery')">
        <h2>Swiper example (c-swiper-gallery)</h2>
        <c-swiper-gallery :images="productImages" />
      </div>
    </div>
  </l-default>
</template>

<script>
  import cSwiperGallery from '@/components/c-swiper-gallery';
  import cSwiperHero from '@/components/c-swiper-hero';
  import lDefault from '@/components/l-default';
  import dummyImages from '../../styleguide/mock-data/images';

  export default {
    name: 'swiper',
    components: {
      cSwiperGallery,
      cSwiperHero,
      lDefault,
    },
    data() {
      return {
        items: [
          {
            imageUrl: 'http://via.placeholder.com/1600x500',
            href: 'http://www.google.ch',
          },
          {
            imageUrl: 'http://via.placeholder.com/1600x500',
            href: 'http://www.valantic.com',
          },
          {
            imageUrl: 'http://via.placeholder.com/1600x500',
            href: 'http://www.github.com',
          },
        ],
        items2: [
          {
            imageUrl: 'http://via.placeholder.com/1600x500',
            href: 'http://www.google.ch',
          },
          {
            imageUrl: 'http://via.placeholder.com/1600x500',
            href: 'http://www.google.ch',
          },
          {
            imageUrl: 'http://via.placeholder.com/1600x500',
            href: 'http://www.google.ch',
          },
          {
            imageUrl: 'http://via.placeholder.com/1600x500',
            href: 'http://www.google.ch',
          },
          {
            imageUrl: 'http://via.placeholder.com/1600x500',
            href: 'http://www.google.ch',
          },
          {
            imageUrl: 'http://via.placeholder.com/1600x500',
            href: 'http://www.google.ch',
          },
        ],
        productImages: dummyImages,
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

    &__hero-gallery {
      max-width: 845px;
      margin-bottom: $spacing--30;
    }

    &__product-gallery {
      max-width: 400px;
    }
  }
</style>

