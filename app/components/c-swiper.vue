<template>
  <div :class="b()">

    <swiper ref="container"
            :class="b('container')"
            :options="optionsMerged">

      <!-- slides -->
      <swiper-slide v-for="img in images"
                    :class="b('slide')"
                    :key="img.id">

        <e-picture
          :sizes="img.sizes"
          :srcset="img.srcset"
          :fallback="img.fallback"
          :alt="img.altText"/>

      </swiper-slide>

      <!-- @slot Bullets pagination -->
      <div slot="pagination" :class="b('pagination swiper-pagination')"></div>

      <!-- @slot Previous button element -->
      <div slot="button-prev" :class="b('button-prev swiper-button-prev')"></div>

      <!-- @slot Next button element -->
      <div slot="button-next" :class="b('button-next swiper-button-next')"></div>
    </swiper>

    <!-- counter -->
    <div :class="b('counter')">
      <div :class="b('img-counter')">{{ $tc('c-swiper.images', images.length, {count: images.length}) }}</div>
      <div :class="b('video-counter')"></div>
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
    name: 'c-swiper',
    components: {
      swiper,
      swiperSlide
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
          lazy: {
            elementClass: 'lazyload',
            loadPrevNext: true,
          },
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
            hideOnClick: true,
          },
          pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
            clickable: true,
            dynamicBullets: true,
            dynamicMainBullets: 6,
          },
        },
      };
    },

    computed: {
      /**
       * Merges default with custom component options
       *
       * @returns  {object}  optionsMerged    Combination of default and custom options.
       */
      optionsMerged() {
        return {
          ...this.optionsDefault,
          ...this.options,
        };
      },

      /**
       * Gets current swiper reference
       *
       * @returns  {object}  swiper   Swiper component instance
       */
      swiper() {
        return this.$refs.container.swiper;
      }
    },
    // watch: {},

    // beforeCreate() {},
    // created() {},
    // beforeMount() {},
    // mounted() {},
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
  .c-swiper {
    position: relative;

    // dots navigation
    .swiper-container-horizontal > .swiper-pagination-bullets.swiper-pagination-bullets-dynamic {
      bottom: 16px;
      left: 75px;
      overflow: hidden;
      padding-top: $spacing--30;
      position: relative;
      text-align: left;

      @include media(xs) {
        padding-top: 0;
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

        &-active {
          background-color: var(--theme-color-primary-1);
          box-shadow: inset 0 1px 3px 0 rgba($color-grayscale--0, 0.5);
        }

        &-active-prev,
        &-active-prev-prev,
        &-active-next-next {
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
    }

    .swiper-button-prev {
      background-image: url('../assets/icons/i-arrow-full--left.svg');
      left: 0;
    }

    .swiper-button-next {
      background-image: url('../assets/icons/i-arrow-full--right.svg');
      right: 0;
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

    &__counter {
      @include font(14px, 18px);

      color: $color-grayscale--400;
      bottom: $spacing--10;
      position: absolute;
      text-align: right;
      width: 100%;
    }

    .e-picture {
      padding: $spacing--30;

      @include media(xs) {
        padding: $spacing--50;
      }
    }
  }
</style>
