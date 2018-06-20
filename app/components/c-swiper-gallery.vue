<template>
  <div :class="b(modifiers)"
       @mouseenter="isHover = true"
       @mouseleave="isHover = false">

    <div ref="container" :class="b('container swiper-container')">

      <div :class="b('wrapper swiper-wrapper')">
        <!-- Slides -->
        <div v-for="picture in pictures"
             :class="b('slide swiper-slide')"
             :key="picture.id">

          <button :class="b('trigger')"
                  :title="$t('c-swiper.zoom')"
                  type="button"
                  @click.prevent="modalOpen = true">

            <e-picture
              :sizes="sizes"
              :srcset="picture.srcset"
              :fallback="picture.fallback"
              :alt="picture.alt"/>

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
        size="600"
        inner-spacing="0"
        @close="modalClose"
      >
        <c-swiper-modal :images="pictures" :initial-slide="swiper.activeIndex" @change="onModalSlideChanged"/>
      </c-modal>
    </div>

    <!-- counter -->
    <div :class="b('counter')">
      <div :class="b('img-counter')">{{ $tc('c-swiper.images', images.length, {count: images.length}) }}</div>
      <div :class="b('video-counter')"></div><!-- TODO: Add logic for videos -->
    </div>

  </div>
</template>

<script>

  import Swiper from 'swiper';
  import { BREAKPOINTS } from '@/setup/globals';
  import cSwiperModal from '@/components/c-swiper-modal';

  // require styles
  import 'swiper/dist/css/swiper.css';

  /**
   * Touch enabled slider component based on
   * [swiper](http://idangero.us/swiper/).
   */
  export default {
    name: 'c-swiper-gallery',
    components: {
      cSwiperModal,
    },
    // mixins: [],

    props: {
      /**
       * Gallery images passed to swiper.
       */
      images: {
        type: Array,
        required: true,
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
            dynamicMainBullets: 5,
          },
        },
        // this.images.length > this.dynamicBullets
        swiper: {
          activeIndex: 0,
        },
        isHover: false,
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
          hover: this.isHover,
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
      this.swiper = new Swiper(this.$refs.container, this.optionsMerged); // init swiper
    },
    // beforeUpdate() {},
    // updated() {},
    // activated() {},
    // deactivated() {},
    // beforeDestroy() {},
    // destroyed() {},

    methods: {
      /**
       * Close modal box.
       */
      modalClose() {
        this.modalOpen = false;
      },
      onModalSlideChanged(index) {
        this.$refs.container.swiper.slideTo(index);
      }
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

        @include media(xs) {
          padding-top: 0;
        }

        &.swiper-pagination-bullets-dynamic {
          bottom: 15px;
          left: 70px;
          overflow: hidden;
        }
      }

      // single dot
      .swiper-pagination-bullet {
        background: $color-grayscale--600;
        margin: 0 3px;
        opacity: 1;
        transform: scale(1);
        outline: none;

        &-active {
          background-color: $color-primary--1;
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
      transition: all 0.2s linear;
      transition-delay: 0.1s;
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

      color: $color-grayscale--400;
      bottom: $spacing--20;
      position: absolute;
      text-align: right;
      width: 100%;

      @include media(xs) {
        bottom: 6px;
      }

      @include media(sm) {
        bottom: $spacing--20;
      }

      @include media(lg) {
        bottom: 6px;
      }
    }

    &__trigger,
    &__trigger:hover,
    &__trigger:visited {
      border: none;
      display: inline-block;
      width: 100%;
      margin: $spacing--30;
      padding: 0;
      text-decoration: none;
      cursor: pointer;

      @include media(xs) {
        margin: $spacing--50;
      }
    }

    &--hover,
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
