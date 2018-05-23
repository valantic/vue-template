<template>
  <div :class="b()">

    <swiper ref="container"
            :class="b('container')"
            :options="optionsMerged">

      <!-- slides -->
      <swiper-slide v-for="img in images"
                    :class="b('slide')"
                    :key="img.name">

        <e-picture :alt="img.alt"
                   :fallback="img.fallback"
                   :sources="img.sources"/>

      </swiper-slide>

      <!-- controls -->
      <div slot="pagination" :class="b('pagination swiper-pagination')"></div>
      <div slot="button-prev" :class="b('button-prev swiper-button-prev')"></div>
      <div slot="button-next" :class="b('button-next swiper-button-next')"></div>

    </swiper>

  </div>

</template>

<script>

  import {swiper, swiperSlide} from 'vue-awesome-swiper';

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
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
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
    mounted() {
      /**
       * initialize current swiper
       */
      // this.swiper.slideTo(1, 1000, false);
      // console.log(this.swiper)
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
  .c-swiper {

    // dots navigation
    .swiper-container-horizontal > .swiper-pagination-bullets-dynamic {
      left: 90px;
      overflow: hidden;
      padding-top: $spacing--30;
      position: relative;

      @include media(xs) {
        left: 110px;
        padding-top: 0;
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

      &:first-child {
        // margin-left: 0;
      }

      &-active {
        background-color: $color-primary--1;
        box-shadow: inset 0 1px 3px 0 rgba($color-grayscale--0, 0.5);
      }

      &-active-prev,
      &-active-prev-prev,
      &-active-next-next {
        visibility: hidden;
      }
    }

    // arrow navigation
    &__button-prev,
    &__button-next {
      display: none;

      @include media(md) {
        display: block;
      }
    }

    // images
    .e-picture__image {
      @include media(xs) {
        padding: $spacing--30;
      }
    }
  }
</style>
