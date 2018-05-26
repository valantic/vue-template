<template>
  <div :class="b()">
    <div ref="gallery" :class="b('container swiper-container gallery-top')">
      <div :class="b('wrapper swiper-wrapper')">
        <div v-for="picture in pictures" :class="b('slide swiper-slide')" :key="picture.id">
          <e-picture
            :sizes="sizes"
            :srcset="picture.srcset"
            :fallback="picture.fallback"
            :alt="picture.alt"/>
        </div>
      </div>
      <div :class="b('button-prev swiper-button-prev')"></div>
      <div :class="b('button-next swiper-button-next')"></div>
    </div>
    <div ref="thumbnails" :class="b('container swiper-container gallery-thumbs')">
      <div :class="b('wrapper swiper-wrapper')">
        <div v-for="picture in pictures" :class="b('slide swiper-slide')" :key="picture.id">
          <e-picture
            :sizes="sizes"
            :srcset="picture.srcset"
            :fallback="picture.fallback"
            :alt="picture.alt"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  import Swiper from 'swiper';
  import { BREAKPOINTS } from '@/setup/globals';
  import 'swiper/dist/css/swiper.css';

  /**
   * Touch enabled slider component with thumbnails based on
   * [swiper](http://idangero.us/swiper/api/).
   */
  export default {
    name: 'c-swiper-modal',
    // components: {},

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
       * Sets the initial slide index
       */
      initialSlide: {
        type: Number,
        default: 0,
      },

      /**
       * Swiper options passed by component
       */
      options: {
        type: Object,
        default: () => {},
      },
    },

    data() {
      return {
        optionsDefault: {
          slidesPerGroup: 1,
          watchOverflow: true,
          keyboard: {
            enabled: true,
          },
          lazy: false,
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
            hideOnClick: true,
          },
        },
        optionsThumbnails: {
          slidesPerGroup: 1,
          watchOverflow: true,
          lazy: false,
          centeredSlides: true,
          slidesPerView: 3,
          slideToClickedSlide: true,
          roundLengths: true,
          spaceBetween: 15,
        },
        swiperGallery: null,
        swiperThumbnails: null,
        sizes: BREAKPOINTS,
        slidesPerBreakpoint: {
          xxs: 3,
          xs: 3,
          sm: 5,
          md: 7,
          lg: 9,
          xl: 9,
        },
        resizeTimerId: null,
      };
    },

    computed: {
      optionsMerged() {
        return {
          ...this.optionsDefault,
          ...this.options,
        };
      },

      pictures() {
        return this.images.map((image) => {
          const srcset = {};

          image.thumbs.map((thumb) => {
            Object.assign(srcset, { [thumb.width]: thumb.absolute_path });
          });

          return {
            fallback: image.external_url_small,
            srcset,
            alt: '',
          };
        });
      },
    },
    // watch: {},

    // beforeCreate() {},
    // created() {},
    // beforeMount() {},
    mounted() {
      new Swiper(this.$refs.gallery, Object.assign({ initialSlide: this.$props.initialSlide }, this.optionsMerged));
      new Swiper(this.$refs.thumbnails, Object.assign({ initialSlide: this.$props.initialSlide }, this.optionsThumbnails));
      this.$refs.gallery.swiper.controller.control = this.$refs.thumbnails.swiper;
      this.$refs.thumbnails.swiper.controller.control = this.$refs.gallery.swiper;

      this.setThumbnailSlidesPerView();
      window.addEventListener('resize', this.setThumbnailSlidesPerView);
    },
    // beforeUpdate() {},
    // updated() {},
    // activated() {},
    // deactivated() {},
    // beforeDestroy() {},
    // destroyed() {},

    methods: {
      setThumbnailSlidesPerView() {
        clearTimeout(this.resizeTimerId);
        this.resizeTimerId = setTimeout(() => {
          this.$refs.thumbnails.swiper.params.slidesPerView = this.getThumbnailSlidesPerView();
          this.$refs.thumbnails.swiper.update();
        }, 250);
      },
      getThumbnailSlidesPerView() {
        const breakpoints = Object.keys(this.slidesPerBreakpoint);

        for (let i = 0; i < breakpoints.length; i += 1) {
          const breakpoint = breakpoints[i];

          if (BREAKPOINTS[breakpoint] >= window.innerWidth) {
            return this.slidesPerBreakpoint[breakpoint];
          }
        }

        return this.slidesPerBreakpoint.xl;
      }
    },
    // render() {},
  };
</script>

<style lang="scss">
  .c-swiper-modal {
    position: relative;

    .swiper-button-prev,
    .swiper-button-next {
      background-size: 25px 30px;
      height: 30px;
      width: 25px;
      margin-top: -#{$spacing--15};
      opacity: 0;
      visibility: hidden;
      transition: all 0.2s linear;
      transition-delay: 0.1s;
      outline: none;
    }

    .swiper-button-prev {
      background-image: url('../assets/icons/i-arrow-full--left.svg');
      left: $spacing--30;
    }

    .swiper-button-next {
      background-image: url('../assets/icons/i-arrow-full--right.svg');
      right: $spacing--30;
    }

    .gallery-top {
      width: 100%;
      border-bottom: 2px solid var(--theme-color-primary-1);
      padding-bottom: $spacing--15;
    }

    .gallery-top .swiper-slide .e-picture,
    .gallery-top .swiper-slide .e-picture img {
      max-height: 570px;
    }

    .gallery-top .swiper-slide .e-picture img {
      margin: 0 auto;
    }

    .gallery-thumbs {
      box-sizing: border-box;
      margin-top: -#{$spacing--15};
    }

    .gallery-thumbs .swiper-slide {
      width: 20%;
      height: 100%;
    }

    .gallery-thumbs .swiper-slide .e-picture {
      margin-top: $spacing--15;
    }

    .gallery-thumbs .swiper-slide .e-picture,
    .gallery-thumbs .swiper-slide .e-picture img {
      max-height: 105px;

      @include media(sm) {
        max-height: 125px;
      }
    }

    .gallery-thumbs .swiper-slide .e-picture img {
      margin: 0 auto;
    }

    .gallery-thumbs .swiper-slide-active::before {
      content: '';
      display: block;
      position: absolute;
      left: 50%;
      margin-left: -11px;
      z-index: 1000;
      border-left: 11px solid transparent;
      border-right: 11px solid transparent;
      border-bottom: 15px solid var(--theme-color-primary-1);
    }

    &:hover {
      .swiper-button-prev:not(.swiper-button-disabled),
      .swiper-button-next:not(.swiper-button-disabled) {
        @include media(xs) {
          opacity: 1;
          transition: all 0.2s linear;
          transition-delay: 0.2s;
          visibility: visible;
        }
      }
    }
  }

</style>
