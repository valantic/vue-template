<template>
  <div :class="b()">
    <!-- 'swiper' classes needed for the swiper plugin. -->
    <div ref="gallery" :class="b('container swiper-container gallery-top')">
      <div :class="b('wrapper swiper-wrapper')">
        <div v-for="image in images"
             :class="b('slide swiper-slide', { video: image.isVideo })"
             :key="image.id">
          <!-- Video -->
          <div v-if="image.isVideo" :class="b('video-wrapper')">
            <div :class="b('iframe-wrapper')">
              <iframe ref="video"
                      :class="b('video-iframe')"
                      :src="`https://www.youtube.com/embed/${image.youtubeId}?enablejsapi=1&version=3&playerapiid=ytplayer`"
                      width="560"
                      height="315"
                      frameborder="0"
                      allowfullscreen></iframe>
            </div>
          </div>

          <!-- Image -->
          <e-picture
            v-else
            :sizes="sizes"
            :srcset="image.srcset"
            :fallback="image.fallback"
            :alt="image.alt"/>
        </div>
      </div>
      <div :class="b('button-prev swiper-button-prev')"></div>
      <div :class="b('button-next swiper-button-next')"></div>
    </div>
    <div ref="thumbnails" :class="b('container swiper-container gallery-thumbs')">
      <div :class="b('wrapper swiper-wrapper')">
        <div v-for="image in images" :class="b('slide swiper-slide')" :key="image.id">
          <!-- Video -->
          <div v-if="image.isVideo" :class="b('video-preview-wrapper')">
            <img :src="image.thumbSrc" :class="b('video-thumbnail')" alt="">
            <span :class="b('video-thumbnail-overlay')"></span>
          </div>

          <!-- Image -->
          <e-picture
            v-else
            :sizes="sizes"
            :srcset="image.srcset"
            :fallback="image.fallback"
            :alt="image.alt"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  import Swiper from 'swiper';
  import { BREAKPOINTS } from '@/setup/globals';

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
        default: () => {
        },
      },
    },

    data() {
      return {
        gallerySwiper: null,
        thumbsSwiper: null,
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
          on: {
            slideChange: function() {
              this.$emit('change', this.$refs.gallery.swiper.activeIndex);
              this.stopAllVideos();
            }.bind(this),
          }
        },
        optionsThumbnails: {
          slidesPerGroup: 1,
          watchOverflow: true,
          lazy: false,
          centeredSlides: true,
          slidesPerView: 3,
          slideToClickedSlide: true,
          roundLengths: true,
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
    },
    // watch: {},

    // beforeCreate() {},
    // created() {},
    // beforeMount() {},
    mounted() {
      const galleryOptions = Object.assign({ initialSlide: this.$props.initialSlide }, this.optionsMerged);
      const thumbnailOptions = Object.assign({ initialSlide: this.$props.initialSlide }, this.optionsThumbnails);

      this.gallerySwiper = new Swiper(this.$refs.gallery, galleryOptions);
      this.thumbsSwiper = new Swiper(this.$refs.thumbnails, thumbnailOptions);

      this.gallerySwiper.controller.control = this.thumbsSwiper;
      this.thumbsSwiper.controller.control = this.gallerySwiper;

      this.setThumbnailSlidesPerView();
      window.addEventListener('resize', this.setThumbnailSlidesPerView);
    },
    // beforeUpdate() {},
    // updated() {},
    // activated() {},
    // deactivated() {},
    beforeDestroy() {
      clearTimeout(this.resizeTimerId);
      window.removeEventListener('resize', this.setThumbnailSlidesPerView);

      this.gallerySwiper.destroy();
      this.thumbsSwiper.destroy();
    },
    // destroyed() {},

    methods: {
      /**
       * Sets the thumbnails for the swiper.
       */
      setThumbnailSlidesPerView() {
        clearTimeout(this.resizeTimerId);
        this.resizeTimerId = setTimeout(() => {
          this.$refs.thumbnails.swiper.params.slidesPerView = this.getThumbnailSlidesPerView();
          this.$refs.thumbnails.swiper.update();
        }, 250);
      },

      /**
       * Gets the number of thumbnails for the current viewport.
       *
       * @returns {Number}
       */
      getThumbnailSlidesPerView() {
        const breakpoints = Object.keys(this.slidesPerBreakpoint);

        for (let i = 0; i < breakpoints.length; i += 1) {
          const breakpoint = breakpoints[i];

          if (BREAKPOINTS[breakpoint] >= window.innerWidth) {
            return this.slidesPerBreakpoint[breakpoint];
          }
        }

        return this.slidesPerBreakpoint.xl;
      },

      /**
       * Stops all videos in the modal.
       */
      stopAllVideos() {
        const videos = this.$refs.video;

        if (videos) {
          videos.forEach((video) => {
            video.contentWindow.postMessage('{"event":"command","func":"stopVideo","args":""}', '*');
          });
        }
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
      transition: all $transition-duration-100 linear;
      outline: none;
    }

    .swiper-button-prev {
      background-image: url('../assets/icons/i-arrow-full--left.svg');
      left: $spacing--30;

      &:hover {
        background-image: url('../assets/icons/i-arrow-full--left--active.svg');
      }
    }

    .swiper-button-next {
      background-image: url('../assets/icons/i-arrow-full--right.svg');
      right: $spacing--30;

      &:hover {
        background-image: url('../assets/icons/i-arrow-full--right--active.svg');
      }
    }

    .gallery-top {
      width: 100%;
      border-bottom: 2px solid $color-primary--1;
    }

    .gallery-top .swiper-slide {
      padding: $spacing--10 $spacing--30 $spacing--60 $spacing--30;
    }

    .gallery-top .swiper-slide .e-picture,
    .gallery-top .swiper-slide .e-picture img {
      max-height: 350px;

      @include media(sm) {
        max-height: 450px;
      }
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
      padding: 0 $spacing--10;
    }

    .gallery-thumbs .swiper-slide .e-picture {
      margin-top: $spacing--30;
      margin-bottom: $spacing--15;
    }

    .gallery-thumbs .swiper-slide .e-picture,
    .gallery-thumbs .swiper-slide .e-picture img {
      max-height: 75px;

      @include media(sm) {
        max-height: 85px;
      }
    }

    .gallery-thumbs .swiper-slide .e-picture img {
      margin: 0 auto;
    }

    .gallery-thumbs .swiper-slide-active::before {
      @include z-index(modal);

      content: '';
      display: block;
      position: absolute;
      left: 50%;
      margin-left: -11px;
      border-left: 11px solid transparent;
      border-right: 11px solid transparent;
      border-bottom: 15px solid $color-primary--1;
    }

    &:hover {
      .swiper-button-prev:not(.swiper-button-disabled),
      .swiper-button-next:not(.swiper-button-disabled) {
        @include media(xs) {
          opacity: 1;
          transition: all $transition-duration-200 linear;
          transition-delay: $transition-duration-200;
          visibility: visible;
        }
      }
    }

    .swiper-slide--video {
      display: flex;
      justify-content: center;
    }

    &__video-wrapper {
      padding-top: $spacing--50;
      flex: 1 0 100%;
      max-width: 700px;

      @include media(sm) {
        padding: $spacing--50;
      }
    }

    &__iframe-wrapper {
      position: relative;
      padding-bottom: 56.25%; /* 16:9 */
      padding-top: 25px;
      padding-left: 50px;
      padding-right: 50px;
      height: 0;
    }

    &__video-iframe {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }

    &__video-preview-wrapper {
      position: relative;
      margin-top: $spacing--30;
      margin-bottom: $spacing--15;
      max-height: 85px;
      height: 85px;
      max-width: 128px;
    }

    &__video-thumbnail {
      width: 100%;
      max-height: 100%;
    }

    &__video-thumbnail-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-image: url('../assets/icons/i-play.svg');
      background-size: 50px 50px;
      background-position: center center;
      background-repeat: no-repeat;
    }
  }

</style>
