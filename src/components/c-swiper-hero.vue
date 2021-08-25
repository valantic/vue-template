<template>
  <div :class="b(modifiers)"
       @mouseenter="hasHover = true"
       @mouseleave="hasHover = false">
    <!-- 'swiper' classes needed for the swiper plugin. -->
    <div ref="container"
         :class="b('container swiper-container')"
         class="swiper-container">
      <div :class="b('wrapper')"
           class="swiper-wrapper">
        <!-- Slides -->
        <div v-for="picture in pictures"
             :key="picture.id"
             :class="b('slide')"
             class="swiper-slide">
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
      <div ref="pagination" :class="b('pagination')"></div>

      <!-- buttons -->
      <div ref="previous" :class="b('button', { previous: true })"></div>
      <div ref="next" :class="b('button', { next: true })"></div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref, Ref } from 'vue';
  import Swiper, { Navigation, Pagination, SwiperOptions } from 'swiper';
  import { BREAKPOINTS } from '@/setup/globals';
  import mapHeroImages from '@/helpers/map-hero-images';
  import { IImage } from '@/types/e-image';
  import uuid from '../mixins/uuid';

  interface ISwiperInstances {
    [key: string]: Swiper;
  }

  interface ISetup {
    container: Ref<HTMLDivElement | null>;
    previous: Ref<HTMLDivElement | null>;
    next: Ref<HTMLDivElement | null>;
    pagination: Ref<HTMLDivElement | null>;
  }

  const swiperInstances: ISwiperInstances = {};

  /**
   * Touch enabled slider component based on
   * [swiper](https://idangero.us/swiper/).
   */
  export default defineComponent({
    name: 'c-swiper-hero',
    status: 0, // TODO: remove when component was prepared for current project.

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
            nextEl: null, // $ref is not available on init
            prevEl: null, // $ref is not available on init
            hideOnClick: true,
          },
          pagination: {
            el: null, // $ref is not available on init
            type: 'bullets',
            clickable: true,

            dynamicBullets: this.images.length > 7 || false,
            dynamicMainBullets: 5,
          },
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
      modifiers(): object {
        return {
          hover: this.hasHover,
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
       * Maps image data object and prepares it for e-picture component.
       *
       * @returns  {Object}  image   Image including fallback
       */
      pictures(): IImage[] {
        const mappedHeroImages = mapHeroImages(this.images as any) || [];

        return [
          ...mappedHeroImages
        ];
      },
    },
    // watch: {},

    // beforeCreate(): void {},
    // created(): void {},
    // beforeMount(): void {},
    mounted(): void {
      Swiper.use([Navigation, Pagination]);

      if (this.container) {
        swiperInstances[this.uuid] = new Swiper(this.container, this.optionsMerged);
      }
    },
    // beforeUpdate(): void {},
    // updated(): void {},
    // activated(): void {},
    // deactivated(): void {},
    beforeUnmount(): void {
      swiperInstances[this.uuid].destroy();
    },
    // unmounted(): void {},

    // methods: {},
    // render(): void {},
  });
</script>

<style lang="scss">
  .c-swiper-hero {
    $this: &;

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
  }
</style>
