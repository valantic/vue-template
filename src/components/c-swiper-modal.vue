<template>
  <div :class="b()">
    <!-- 'swiper' classes needed for the swiper plugin. -->
    <div ref="gallery"
         :class="b('container')"
         class="swiper-container gallery-top">
      <div :class="b('wrapper')"
           class="swiper-wrapper">
        <div v-for="image in images"
             :key="image.id"
             :class="b('slide', { video: image.isVideo })"
             class="swiper-slide"
        >
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
            :alt="image.alt" />
        </div>
      </div>
      <div ref="previous" :class="b('button', { previous: true })"></div>
      <div ref="next" :class="b('button', { next: true })"></div>
    </div>
    <div ref="thumbnails"
         :class="b('container')"
         class="swiper-container gallery-thumbs">
      <div :class="b('wrapper')"
           class="swiper-wrapper">
        <div v-for="image in images"
             :key="image.id"
             :class="b('slide')"
             class="swiper-slide">
          <!-- Video -->
          <div v-if="image.isVideo" :class="b('video-preview-wrapper')">
            <img :class="b('video-thumbnail')"
                 :src="image.thumbSrc"
                 alt="">
            <span :class="b('video-thumbnail-overlay')"></span>
          </div>

          <!-- Image -->
          <e-picture
            v-else
            :sizes="sizes"
            :srcset="image.srcset"
            :fallback="image.fallback"
            :alt="image.alt" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref, Ref } from 'vue';
  import Swiper, { Navigation, Controller, SwiperOptions } from 'swiper';
  import { BREAKPOINTS, BreakPointType } from '@/setup/globals';
  import { NavigationOptions } from 'swiper/types/components/navigation';

  interface ISetup {
    gallery: Ref<HTMLDivElement | null>;
    video: Ref<HTMLIFrameElement[] | null>;
    thumbnails: Ref<HTMLDivElement | null>;
    previous: Ref<HTMLDivElement | null>;
    next: Ref<HTMLDivElement | null>;
  }

  interface IData {
    gallerySwiper: Swiper | null;
    thumbsSwiper: Swiper | null;
    optionsDefault: SwiperOptions;
    optionsThumbnails: SwiperOptions;
    sizes: typeof BREAKPOINTS;
    slidesPerBreakpoint: {
      [key: string]: number;
    };
    // eslint-disable-next-line no-undef
    resizeTimerId: NodeJS.Timeout | null;
  }

  /**
   * Touch enabled slider component with thumbnails based on
   * [swiper](https://idangero.us/swiper/api/).
   */
  export default defineComponent({
    name: 'c-swiper-modal',
    status: 0, // TODO: remove when component was prepared for current project.

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
        default: () => ({}),
      },
    },

    setup(): ISetup {
      const gallery = ref(null);
      const video = ref(null);
      const thumbnails = ref(null);
      const previous = ref(null);
      const next = ref(null);

      return {
        gallery,
        video,
        thumbnails,
        previous,
        next,
      };
    },

    data(): IData {
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
            nextEl: null, // $ref is not available on init
            prevEl: null, // $ref is not available on init
            hideOnClick: true,
          },
          on: {
            slideChange: function() {
              this.$emit('change', this.gallery.swiper.activeIndex);
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
      /**
       * Returns an options Object which combines the default and custom options.
       *
       * @returns {Object}
       */
      optionsMerged(): SwiperOptions {
        const navigation = this.optionsDefault.navigation ? this.optionsDefault.navigation : {} as NavigationOptions;

        if (typeof navigation === 'object') {
          navigation.nextEl = this.next;
          navigation.prevEl = this.previous;
        }

        return {
          ...this.optionsDefault,
          navigation,
          ...this.options,
        };
      },
    },
    // watch: {},

    // beforeCreate(): void {},
    // created(): void {},
    // beforeMount(): void {},
    mounted(): void {
      const galleryOptions = { initialSlide: this.initialSlide, ...this.optionsMerged };
      const thumbnailOptions = { initialSlide: this.initialSlide, ...this.optionsThumbnails };

      Swiper.use([Navigation, Controller]);

      if (this.gallery !== null) {
        this.gallerySwiper = new Swiper(this.gallery, galleryOptions);
      }

      if (this.thumbnails !== null) {
        this.thumbsSwiper = new Swiper(this.thumbnails, thumbnailOptions);
      }

      if (this.gallerySwiper && this.thumbsSwiper) {
        this.gallerySwiper.controller.control = this.thumbsSwiper;
        this.thumbsSwiper.controller.control = this.gallerySwiper;
      }

      this.setThumbnailSlidesPerView();
      window.addEventListener('resize', this.setThumbnailSlidesPerView);
    },
    // beforeUpdate(): void {},
    // updated(): void {},
    // activated(): void {},
    // deactivated(): void {},
    beforeUnmount(): void {
      if (this.resizeTimerId) {
        clearTimeout(this.resizeTimerId);
      }
      window.removeEventListener('resize', this.setThumbnailSlidesPerView);

      this.gallerySwiper?.destroy();
      this.thumbsSwiper?.destroy();
    },
    // unmounted(): void {},

    methods: {
      /**
       * Sets the thumbnails for the swiper.
       */
      setThumbnailSlidesPerView() {
        if (this.resizeTimerId) {
          clearTimeout(this.resizeTimerId);
        }

        this.resizeTimerId = setTimeout(() => {
          // eslint-disable-next-line no-extra-parens
          (this.thumbnails as any).swiper.params.slidesPerView = this.getThumbnailSlidesPerView();
          // eslint-disable-next-line no-extra-parens
          (this.thumbnails as any).swiper.update();
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
          const breakpoint = breakpoints[i] as BreakPointType;

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
        const videos = this.video;

        if (videos) {
          videos.forEach((video) => {
            video.contentWindow?.postMessage('{"event":"command","func":"stopVideo","args":""}', '*');
          });
        }
      }
    },
    // render(): void {},
  });
</script>

<style lang="scss">
  .c-swiper-modal {
    $this: &;

    position: relative;

    // arrow navigation
    &__button {
      @include z-index(front);

      display: none;
      position: absolute;
      top: 50%;
      opacity: 0;
      transform: translateY(-50%);
      transition: opacity $transition-duration-200 linear;
      transition-delay: $transition-duration-100;
      outline: none;
      border: 20px solid transparent;
      cursor: pointer;

      @include media(xs) {
        display: block;
      }

      &--previous {
        left: 0;
        border-right-color: $color-grayscale--200;
      }

      &--next {
        right: 0;
        border-left-color: $color-grayscale--200;
      }
    }

    &--hover,
    &:hover {
      #{$this}__button--previous:not(.swiper-button-disabled),
      #{$this}__button--next:not(.swiper-button-disabled) {
        @include media(xs) {
          opacity: 1;
          transition-delay: $transition-duration-200;
        }
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
      margin-top: -$spacing--15;
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
      @include icon(play, 50px, $mask: false);

      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
    }
  }

</style>
