<template>
  <div :class="b()">
    <div :class="b('swiper-container gallery-top')">
      <swiper ref="container" :options="optionsMerged">
        <swiper-slide v-for="picture in pictures" :class="b('slide')" :key="picture.id">
          <e-picture
            :sizes="picture.sizes"
            :srcset="picture.srcset"
            :fallback="picture.fallback"
            :alt="picture.alt"/>
        </swiper-slide>
        <div slot="button-prev" :class="b('button-prev swiper-button-prev')"></div>
        <div slot="button-next" :class="b('button-next swiper-button-next')"></div>
      </swiper>
    </div>
    <div :class="b('swiper-container gallery-thumbs')">
      <swiper ref="thumbnails" :options="optionsThumbnails">
        <swiper-slide v-for="thumbnail in thumbnails" :key="thumbnail.id">
          <e-picture :fallback="thumbnail" alt=""/>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script>

  import { swiper, swiperSlide } from 'vue-awesome-swiper';

  // require styles
  import 'swiper/dist/css/swiper.css';

  /**
   * Touch enabled slider component based on
   * [vue-awesome-slider](https://github.com/surmon-china/vue-awesome-swiper) and
   * [swiper](http://idangero.us/swiper/api/).
   */
  export default {
    name: 'c-swiper-modal',
    components: {
      swiper,
      swiperSlide
    },

    // mixins: [],

    props: {
      /**
       * Gallery images passed to swiper
       */
      images: {
        type: Array,
        required: true,
      },

      /**
       * Swiper options passed by component
       */
      options: {
        type: Object,
        default: () => {
        },
      },
    },

    data() {
      return {
        optionsDefault: {
          keyboard: {
            enabled: true,
          },
          lazy: {
            elementClass: 'lazyload',
            loadPrevNext: true,
          },
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
            hideOnClick: true,
          },
        },
      };
    },

    computed: {
      optionsMerged() {
        return {
          ...this.optionsDefault,
          ...this.options,
        };
      },
      optionsThumbnails() {
        return {
          spaceBetween: 10,
          centeredSlides: true,
          slidesPerView: 'auto',
          touchRatio: 0.2,
          slideToClickedSlide: true,
        };
      },

      pictures() {
        return this.images.map((image) => {
          const sizeKeys = ['xs', 'sm', 'md'];
          let sizes = {};
          let srcset = {};

          image.thumbs.map((thumb, i) => {
            Object.assign(srcset, { [thumb.width]: thumb.absolute_path })
            Object.assign(sizes, { [sizeKeys[i]]: thumb.width });
          });

          return {
            fallback: image.external_url_small,
            srcset,
            sizes,
            alt: '',
          };
        });
      },

      thumbnails() {
        return this.images.map(image => image.thumbs[0].absolute_path);
      }
    },
    // watch: {},

    // beforeCreate() {},
    // created() {},
    // beforeMount() {},
    mounted() {
      this.$refs.container.swiper.controller.control = this.$refs.thumbnails.swiper;
      this.$refs.thumbnails.swiper.controller.control = this.$refs.container.swiper;
    },
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

<style lang="scss">
  .c-swiper-modal {
    .swiper-container {
      width: 100%;
      margin-left: auto;
      margin-right: auto;
    }

    .swiper-slide {
      background-size: cover;
      background-position: center;
    }

    .swiper-button-prev,
    .swiper-button-next {
      background-size: 25px 30px;
      display: none;
      height: 30px;
      width: 25px;
      margin-top: -15px;
      @include media(xs) {
        display: block;
      }
    }

    .swiper-button-prev {
      background-image: url('../assets/icons/i-arrow-full--left.svg');
      left: 0;
    }

    .swiper-button-next {
      background-image: url('../assets/icons/i-arrow-full--right.svg');
      right: 0;
    }

    .gallery-top {
      height: 80%;
      width: 100%;
    }

    .gallery-thumbs {
      height: 20%;
      box-sizing: border-box;
      padding: 10px 0;
    }

    .gallery-thumbs .swiper-slide {
      width: 25%;
      height: 100%;
      opacity: 0.4;
    }

    .gallery-thumbs .swiper-slide-active {
      opacity: 1;
    }
  }

</style>
