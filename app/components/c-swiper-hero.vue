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

          <a v-if="picture.href"
             :class="b('link')"
             :href="picture.href">

            <e-picture
              :sizes="sizes"
              :srcset="picture.srcset"
              :fallback="picture.fallback"
              :alt="picture.alt" />

          </a>

          <e-picture
            v-else
            :sizes="sizes"
            :srcset="picture.srcset"
            :fallback="picture.fallback"
            :alt="picture.alt" /> <!-- Todo: Replace as soon as @mathias-obers 'with-root' component is merged. -->
        </div>

      </div>

      <!-- navigation -->
      <div :class="b('pagination swiper-pagination')"></div>

      <!-- buttons-->
      <div :class="b('button-prev swiper-button-prev')"></div>
      <div :class="b('button-next swiper-button-next')"></div>

    </div>

  </div>
</template>

<script>
  import Swiper from 'swiper';
  import { BREAKPOINTS } from '@/setup/globals';
  import mapHeroImages from '@/helpers/map-hero-images';
  import uuid from '@/mixins/uuid';

  const swiperInstances = {};

  /**
   * Touch enabled slider component based on
   * [swiper](http://idangero.us/swiper/).
   */
  export default {
    name: 'c-swiper-hero',
    // components: {},
    mixins: [uuid],

    props: {
      /**
       * Gallery object passed to swiper including image (imageUrl) and url (href).
       *
       * @type {Array.Object} images
       * @property {String} images.imageUrl - The image related source url.
       * @property {String} images.fallback - The image related fallback source url.
       * @property {String} [images.href] - The image related link href.
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
          autoplay: {
            delay: 3000,
          },
          speed: 500,
          loop: true,
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
            dynamicBullets: this.$props.data
              ? this.$props.data.images.length > 7 || false
              : this.images.length > 7 || false,
            dynamicMainBullets: 5,
          },
        },
        // this.images.length > this.dynamicBullets
        swiper: {
          activeIndex: 0,
        },
        hasHover: false,
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
       * Maps image data object and prepares it for e-picture component.
       *
       * @returns  {Object}  image   Image including fallback
       */
      pictures() {
        return mapHeroImages(this.images);
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

    // methods: {},
    // render() {},
  };
</script>

<style lang="scss">
  .c-swiper-hero {
    position: relative;
    height: 100%;

    &__container {
      height: 100%;
      border-radius: 3px;
      overflow: hidden;
    }

    &__slide {
      display: flex;
      align-items: center;

      .e-picture {
        flex: 1 0 100%;
      }
    }

    &__link {
      padding: 0;
      border: none;
      cursor: pointer;
      text-decoration: none;
      width: 100%;
    }

    // dots navigation
    .swiper-container-horizontal {
      & > .swiper-pagination-bullets {
        position: absolute;
        bottom: 0;
        left: $spacing--2;
        text-align: left;

        @include media(sm) {
          bottom: $spacing--5;
          left: 8px;
        }

        &.swiper-pagination-bullets-dynamic {
          bottom: $spacing--5;
          left: 68px;
          overflow: hidden;

          // stylelint-disable-next-line max-nesting-depth
          @include media(sm) {
            bottom: $spacing--10;
            left: 73px;
          }
        }
      }

      // single dot
      .swiper-pagination-bullet {
        background: $color-grayscale--1000;
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
      height: 30px;
      width: 25px;
      margin-top: -$spacing--30;
      padding: $spacing--30;
      opacity: 0;
      visibility: hidden;
      transition: all $transition-duration-200 linear;
      transition-delay: $transition-duration-100;
      outline: none;
    }

    .swiper-button-prev {
      background: transparent url('../assets/icons/i-arrow-full--left.svg') no-repeat $spacing--10 center / 25px 30px;
      left: 0;
    }

    .swiper-button-next {
      background: transparent url('../assets/icons/i-arrow-full--right.svg') no-repeat $spacing--25 center / 25px 30px;
      right: 0;
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
  }
</style>
