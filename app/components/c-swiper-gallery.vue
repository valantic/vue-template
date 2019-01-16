<template>
  <div :class="b(modifiers)"
       @mouseenter="hasHover = true"
       @mouseleave="hasHover = false">

    <!-- 'swiper' classes needed for the swiper plugin. -->
    <div ref="container" :class="b('container swiper-container')">

      <div :class="b('wrapper swiper-wrapper')">
        <!-- Slides -->
        <div v-for="picture in pictures"
             :class="b('slide swiper-slide')"
             :key="picture.id">

          <button :class="b('trigger')"
                  type="button"
                  @click.prevent="modalOpen = true">
            <span :class="b('image-wrapper-inner')">
              <div v-if="picture.isVideo" :class="b('video-preview-wrapper')">
                <img :src="picture.thumbSrc" :class="b('video-thumbnail')" alt="">
                <span :class="b('video-thumbnail-overlay')"></span>
              </div>
              <e-picture
                v-else
                :sizes="sizes"
                :srcset="picture.srcset"
                :fallback="picture.fallback"
                :alt="picture.alt" />
            </span>

            <span v-t="'c-swiper.zoom'" class="invisible"></span>

          </button>

        </div>
      </div>

      <!-- navigation -->
      <div :class="b('pagination swiper-pagination')"></div>

      <!-- buttons-->
      <div :class="b('button-prev swiper-button-prev')"></div>
      <div :class="b('button-next swiper-button-next')"></div>

      <!-- modal -->
      <c-modal
        :open="modalOpen"
        :header-component="null"
        size="600"
        inner-spacing="0"
        mobile-transition="fade"
        @close="modalClose">
        <div :class="b('modal-close-icon')" @click="modalOpen = false">
          <e-icon icon="i-close"
                  width="25"
                  height="25"
                  inline />
        </div>
        <c-swiper-modal :images="pictures"
                        :initial-slide="swiper.activeIndex"
                        @change="onModalSlideChanged" />
      </c-modal>
    </div>

    <!-- counter -->
    <div v-if="pictures.length > 1" :class="b('counter')">
      <div :class="b('counter-detail', { image: true })">
        {{ $tc('c-swiper.images', images.length, {count: images.length}) }}
      </div>
      <div v-if="videos && videos.length" :class="b('counter-detail', { video: true })">
        {{ $tc('c-swiper.videos', videos.length, {count: videos.length}) }}
      </div>
    </div>

  </div>
</template>

<script>
  import Swiper from 'swiper';
  import { BREAKPOINTS } from '@/setup/globals';
  import cSwiperModal from '@/components/c-swiper-modal';
  import mapImages from '@/helpers/map-images';
  import uuid from '@/mixins/uuid';

  const swiperInstances = {};

  /**
   * Touch enabled slider component based on
   * [swiper](http://idangero.us/swiper/).
   */
  export default {
    name: 'c-swiper-gallery',
    components: {
      cSwiperModal,
    },
    mixins: [uuid],

    props: {
      /**
       * Gallery images passed to swiper.
       */
      images: {
        type: Array,
        required: true,
      },

      /**
       * A list of youtube video objects.
       */
      videos: {
        type: Array,
        default: null,
      },

      /**
       * Swiper options passed by component (merged with default).
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
          pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
            clickable: true,
            dynamicBullets: this.images.length > 7 || false,
            dynamicMainBullets: 3,
          },
          on: {
            slideChange: function() {
              this.swiper.activeIndex = this.$refs.container.swiper.activeIndex;
            }.bind(this),
          }
        },
        // this.images.length > this.dynamicBullets
        swiper: {
          activeIndex: 0,
        },
        hasHover: false,
        modalOpen: false,
        sizes: BREAKPOINTS, // todo add as prop
      };
    },

    computed: {
      /**
       * Defines state modifier classes.
       *
       * @returns  {Object}   BEM classes
       */
      modifiers() {
        return {
          hover: this.hasHover,
          modalOpen: this.modalOpen,
        };
      },

      /**
       * Merges default with custom component options.
       *
       * @returns  {Object}  optionsMerged    Combination of default and custom options.
       */
      optionsMerged() {
        return {
          ...this.optionsDefault,
          ...this.options,
        };
      },

      /**
       * Gets the mapped videos.
       *
       * @returns {Array} The list of mapped videos.
       */
      mappedVideos() {
        if (this.videos && Array.isArray(this.videos)) {
          return this.videos.map((video, index) => {
            const youtubeId = this.getYoutubeId(video.youtubeUrl);

            return {
              id: `${youtubeId}-${index}`,
              url: video.youtubeUrl,
              youtubeId,
              thumbSrc: `http://img.youtube.com/vi/${youtubeId}/0.jpg`,
              isVideo: true,
            };
          });
        }

        return [];
      },

      /**
       * Maps image data object and prepares it for e-picture component.
       *
       * @returns  {Object}  image   Image including fallback
       */
      pictures() {
        return [
          ...mapImages(this.images),
          ...this.mappedVideos,
        ];
      },
    },
    // watch: {},

    // beforeCreate() {},
    // created() {},
    // beforeMount() {},
    mounted() {
      swiperInstances[this.uuid] = new Swiper(this.$refs.container, this.optionsMerged);
    },
    // beforeUpdate() {},
    // updated() {},
    // activated() {},
    // deactivated() {},
    beforeDestroy() {
      swiperInstances[this.uuid].destroy();
    },
    // destroyed() {},

    methods: {
      /**
       * Close modal box.
       */
      modalClose() {
        this.modalOpen = false;
      },

      /**
       * Change event when the slider in the modal changes.
       *
       * @param {Number} index - The index of the swiper.
       */
      onModalSlideChanged(index) {
        this.$refs.container.swiper.slideTo(index);
      },

      /**
       * Gets the youtube id of a given youtube URL.
       *
       * @param {String} url - The given youtube url.
       *
       * @returns {String}
       */
      getYoutubeId(url) {
        const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);

        if (match && match[2].length === 11) {
          return match[2];
        }

        return '';
      },
    },
    // render() {},
  };
</script>

<style lang="scss">
  .c-swiper-gallery {
    position: relative;
    height: 100%;

    &__container {
      height: 100%;
    }

    &__slide {
      display: flex;
      align-items: center;
    }

    // dots navigation
    .swiper-container-horizontal {
      & > .swiper-pagination-bullets {
        padding-top: $spacing--30;
        position: relative;
        text-align: left;
        font-size: 0;
        bottom: $spacing--15;

        @include media(xs) {
          padding-top: 0;
        }

        &.swiper-pagination-bullets-dynamic {
          left: $spacing--40;
          overflow: hidden;
        }
      }

      // single dot
      .swiper-pagination-bullet {
        background: $color-grayscale--600;
        border-radius: 2.5px;
        height: 5px;
        width: 20px;
        margin: 0 3px;
        opacity: 1;
        transform: scale(1);
        outline: none;

        &-active {
          background-color: $color-primary--1;
          box-shadow: inset 0 1px 3px 0 rgba($color-grayscale--0, 0.5);
        }

        &-active-prev,
        &-active-prev-prev {
          visibility: hidden;
        }
      }
    }

    // arrow navigation
    .swiper-button-prev,
    .swiper-button-next {
      background-size: 25px 30px;
      height: 30px;
      width: 25px;
      margin-top: -15px;
      opacity: 0;
      visibility: hidden;
      transition: all $transition-duration-200 linear;
      transition-delay: $transition-duration-100;
      outline: none;
    }

    .swiper-button-prev {
      background-image: url('../assets/icons/i-arrow-full--left.svg');
      left: 0;
    }

    .swiper-button-next {
      background-image: url('../assets/icons/i-arrow-full--right.svg');
      right: 0;
    }

    &__counter {
      @include font(14px, 18px);

      display: flex;
      color: $color-grayscale--400;
      bottom: $spacing--10;
      position: absolute;
      right: 0;

      @include media(sm) {
        bottom: $spacing--5;
      }
    }

    &__counter-detail:nth-child(2) {
      margin-left: $spacing--5;

      &::before {
        content: '|';
      }
    }

    &__trigger,
    &__trigger:hover,
    &__trigger:visited {
      display: flex;
      justify-content: center;
      border: none;
      width: 100%;
      margin: 5%;
      padding: 0;
      text-decoration: none;
      cursor: pointer;
      background: transparent;

      @include media(md) {
        margin: $spacing--50;
      }
    }

    &__image-wrapper-inner {
      width: 100%; // Needed for IE11.

      .e-picture__image {
        margin: auto;
      }
    }

    &__modal-close-icon {
      @include z-index(navigation);

      position: absolute;
      top: $spacing--15;
      right: $spacing--15;
      cursor: pointer;

      path {
        fill: $color-primary--1;
      }
    }

    &--hover,
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

    &__img-counter,
    &__video-counter {
      @include z-index(front);

      position: relative;
    }

    &__video-preview-wrapper {
      position: relative;
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

    &__video-thumbnail {
      max-width: 100%;
      width: 100%;
    }
  }
</style>
