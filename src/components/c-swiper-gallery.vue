<template>
  <div :class="b(modifiers)"
       @mouseenter="hasHover = true"
       @mouseleave="hasHover = false">
    <!-- 'swiper' classes needed for the swiper plugin. -->
    <div ref="container"
         :class="b('container')"
         class="swiper-container">
      <div :class="b('wrapper')"
           class="swiper-wrapper">
        <!-- Slides -->
        <div v-for="picture in pictures"
             :key="picture.id"
             :class="b('slide')"
             class="swiper-slide">
          <button :class="b('trigger')"
                  type="button"
                  @click.prevent="modalOpen = true">
            <span :class="b('image-wrapper-inner')">
              <div v-if="picture.isVideo" :class="b('video-preview-wrapper')">
                <img :class="b('video-thumbnail')"
                     :src="picture.thumbSrc"
                     alt="">
                <span :class="b('video-thumbnail-overlay')"></span>
              </div>
              <e-picture
                v-else
                :sizes="sizes"
                :srcset="picture.srcset"
                :fallback="picture.fallback"
                :alt="picture.alt" />
            </span>

            <span class="invisible">
              {{ $t('c-swiper.zoom') }}
            </span>
          </button>
        </div>
      </div>

      <!-- buttons -->
      <div ref="previous" :class="b('button', { previous: true })"></div>
      <div ref="next" :class="b('button', { next: true })"></div>

      <!-- navigation -->
      <div ref="pagination" :class="b('pagination')"></div>

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
      <div v-if="videos && videos.length > 1" :class="b('counter-detail', { video: true })">
        {{ $tc('c-swiper.videos', videos.length, {count: videos.length}) }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, Ref, ref } from 'vue';
  import Swiper, { Navigation, Pagination, SwiperOptions } from 'swiper';
  import { BREAKPOINTS } from '@/setup/globals';
  import cSwiperModal from '@/components/c-swiper-modal.vue';
  import mapImages from '@/helpers/map-images';
  import uuid from '@/mixins/uuid';
  import cModal from '@/components/c-modal.vue';
  import { IVideo } from '@/types/c-swiper-gallery';
  import { IImage } from '@/types/e-image';
  import { IModifiers } from '@/plugins/vue-bem-cn/src/globals';

  interface ISwiperInstances {
    [key: string]: Swiper;
  }

  interface ISetup {
    previous: Ref<HTMLDivElement | null>;
    next: Ref<HTMLDivElement | null>;
    pagination: Ref<HTMLDivElement | null>;
    container: Ref<HTMLDivElement | null>;
  }

  const swiperInstances: ISwiperInstances = {};

  /**
   * Touch enabled slider component based on [swiper](https://idangero.us/swiper/).
   */
  export default defineComponent({
    name: 'c-swiper-gallery',
    status: 0, // TODO: remove when component was prepared for current project.

    components: {
      cModal,
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
        default: () => ({}),
      },

    },

    setup(): ISetup {
      const container = ref(null);
      const previous = ref(null);
      const next = ref(null);
      const pagination = ref(null);

      return {
        container,
        previous,
        next,
        pagination,
      };
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
            nextEl: null, // $ref is not available on init
            prevEl: null, // $ref is not available on init
            hideOnClick: true,
          },
          pagination: {
            el: null, // $ref is not available on init
            type: 'bullets',
            clickable: true,
            dynamicBullets: this.images.length > 7 || false,
            dynamicMainBullets: 3,
          },
          on: {
            slideChange: function() {
              // @ts-ignore
              this.swiper.activeIndex = this.container.swiper.activeIndex;
            }.bind(this),
          },
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
      modifiers(): IModifiers {
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
      optionsMerged(): SwiperOptions {
        return {
          ...this.optionsDefault,
          navigation: {
            ...this.optionsDefault.navigation,
            nextEl: this.next,
            prevEl: this.previous,
          },
          // @ts-ignore
          pagination: {
            ...this.optionsDefault.pagination,
            el: this.pagination,
          },
          ...this.options,
        };
      },

      /**
       * Gets the mapped videos.
       *
       * @returns {Array} The list of mapped videos.
       */
      mappedVideos(): IVideo[] {
        if (Array.isArray(this.videos)) {
          return this.videos.map((video, index) => {
            const youtubeId = this.getYoutubeId(video.youtubeUrl);

            return {
              id: `${youtubeId}-${index}`,
              url: video.youtubeUrl,
              youtubeId,
              thumbSrc: `https://img.youtube.com/vi/${youtubeId}/0.jpg`,
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
      pictures(): (IImage | IVideo)[] {
        const mappedImages = mapImages(this.images as any) || [];

        return [
          ...mappedImages,
          ...this.mappedVideos,
        ];
      },
    },
    // watch: {},

    // beforeCreate() {},
    // created() {},
    // beforeMount() {},
    mounted(): void {
      Swiper.use([Navigation, Pagination]);

      if (this.container) {
        swiperInstances[this.uuid] = new Swiper(this.container, this.optionsMerged);
      }
    },
    // beforeUpdate() {},
    // updated() {},
    // activated() {},
    // deactivated() {},
    beforeUnmount() {
      swiperInstances[this.uuid].destroy();
    },
    // unmounted(): void {},

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
      onModalSlideChanged(index: number) {
        if (this.container) {
          // @ts-ignore
          this.container.swiper.slideTo(index);
        }
      },

      /**
       * Gets the youtube id of a given youtube URL.
       *
       * @param {String} url - The given youtube url.
       *
       * @returns {String}
       */
      getYoutubeId(url: string) {
        const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);

        if (match?.[2]?.length === 11) {
          return match[2];
        }

        return '';
      },
    },
    // render(): void {},
  });
</script>

<style lang="scss">
  .c-swiper-gallery {
    $this: &;

    position: relative;
    height: 100%;

    &__container {
      height: 100%;
    }

    &__slide {
      display: flex;
      align-items: center;
    }

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

    // dots navigation
    .swiper-container-horizontal {
      .swiper-pagination-bullets {
        @include z-index(front);

        position: relative;
        bottom: $spacing--15;
        width: 100% !important; /* stylelint-disable-line declaration-no-important */
        margin: auto;
        padding-top: $spacing--20;
        white-space: nowrap;
        text-align: center;
        font-size: 0;

        @include media(xs) {
          padding-top: 0;
        }

        &.swiper-pagination-lock {
          display: none;
        }
      }

      // single dot
      .swiper-pagination-bullet {
        display: inline-block;
        opacity: 1;
        height: 5px;
        width: 20px;
        margin: 0 3px;
        background: $color-grayscale--600;
        border-radius: 2.5px;
        transform: scale(1);
        outline: none;
        cursor: pointer;
        transition: width $transition-duration-200 linear;

        &-active {
          background-color: $color-primary--1;
          box-shadow: inset 0 1px 3px 0 rgba($color-grayscale--0, 0.5);
        }
      }

      .swiper-pagination-bullets-dynamic .swiper-pagination-bullet {
        display: none;

        &[class*="swiper-pagination-bullet-active"] {
          display: inline-block;
        }

        &-active-prev,
        &-active-prev-prev,
        &-active-next,
        &-active-next-next {
          width: 10px;
        }
      }
    }
  }
</style>
