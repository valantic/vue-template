<template>
  <div :class="b(modifiers)"
       @mouseenter="hasHover = true"
       @mouseleave="hasHover = false">
    <!-- 'swiper' classes needed for the swiper plugin. -->
    <div ref="container" :class="b('container swiper')">
      <div :class="b('wrapper')"
           class="swiper-wrapper">
        <!-- Slides -->
        <div v-for="(slide, index) in slides"
             :key="slide.id"
             :class="b('slide')"
             class="swiper-slide">
          <e-picture v-if="slide[imageProperty]"
                     :sizes="sizes"
                     :srcset="slide[imageProperty].srcset"
                     :fallback="slide[imageProperty].fallback"
                     :alt="slide[imageProperty].alt"
                     :ratio="ratio"
                     :loading="index > 0 && index < slides.length - 1 ? 'lazy' : 'auto'"
          />
          <!-- Lazy loading for images is not possible with the loop option for the first and last image. -->
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
  import {
    defineComponent,
    ref,
    Ref
  } from 'vue';
  import Swiper, { Navigation, Pagination, SwiperOptions } from 'swiper';
  import { NavigationOptions, PaginationOptions } from 'swiper/types';
  import { IModifiers } from '@/plugins/vue-bem-cn/src/globals';
  import useUuid, { IUuid } from '@/compositions/uuid';

  interface ISwiperInstances {
    [key: string]: Swiper;
  }

  interface ISetup extends IUuid {
    container: Ref<HTMLDivElement | null>;
    previous: Ref<HTMLDivElement | null>;
    next: Ref<HTMLDivElement | null>;
    pagination: Ref<HTMLDivElement | null>;
  }

  interface IData {
    optionsDefault: SwiperOptions;
    hasHover: boolean;
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

    props: {
      /**
       * The list of slides.
       */
      slides: {
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

      /**
       * Defines the sizes of the images.
       */
      sizes: {
        type: Object,
        default: () => ({
          xxs: 480,
          xs: 768,
          sm: 1024,
          md: 1200,
          lg: 1440,
          xl: 2560,
        }),
      },

      /**
       * Defines the ratio of the images.
       */
      ratio: {
        type: Number,
        default: 24 / 11
      },

      /**
       * Defines the property inside a slide which contains the image.
       */
      imageProperty: {
        type: String,
        default: 'image',
      },
    },

    setup(): ISetup {
      const container = ref();
      const previous = ref();
      const next = ref();
      const pagination = ref();

      const { increaseUuid } = useUuid();

      increaseUuid();

      return {
        ...useUuid(),
        container,
        previous,
        next,
        pagination,
      };
    },

    data(): IData {
      return {
        optionsDefault: {
          modules: [Navigation, Pagination],
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
      };
    },

    computed: {
      /**
       * Defines state modifier classes.
       */
      modifiers(): IModifiers {
        return {
          hover: this.hasHover,
        };
      },

      /**
       * Merges default with custom component options.
       */
      optionsMerged(): SwiperOptions {
        return {
          ...this.optionsDefault,
          navigation: {
            ...this.optionsDefault.navigation as NavigationOptions,
            nextEl: this.next,
            prevEl: this.previous,
          },
          // @ts-ignore
          pagination: {
            ...this.optionsDefault.pagination as PaginationOptions,
            el: this.pagination,
          },
          ...this.options,
        };
      },
    },
    // watch: {},

    // beforeCreate() {},
    // created() {},
    // beforeMount() {},
    mounted() {
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
    // unmounted() {},

    // methods: {},
    // render() {},
  });
</script>

<style lang="scss">
  @use '../setup/scss/mixins';
  @use '../setup/scss/variables';

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
        @include mixins.z-index(front);

        position: relative;
        bottom: variables.$spacing--15;
        width: 100% !important; /* stylelint-disable-line declaration-no-important */
        margin: auto;
        padding-top: variables.$spacing--20;
        white-space: nowrap;
        text-align: center;
        font-size: 0;

        @include mixins.media(xs) {
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
        background: variables.$color-grayscale--600;
        border-radius: 2.5px;
        transform: scale(1);
        outline: none;
        cursor: pointer;
        transition: width variables.$transition-duration-200 linear;

        &-active {
          background-color: variables.$color-primary--1;
          box-shadow: inset 0 1px 3px 0 rgba(variables.$color-grayscale--0, 0.5);
        }
      }

      .swiper-pagination-bullets-dynamic .swiper-pagination-bullet {
        display: none;

        &[class*='swiper-pagination-bullet-active'] {
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
      @include mixins.z-index(front);

      display: none;
      position: absolute;
      top: 50%;
      opacity: 0;
      transform: translateY(-50%);
      transition: opacity variables.$transition-duration-200 linear;
      transition-delay: variables.$transition-duration-100;
      outline: none;
      border: 20px solid transparent;
      cursor: pointer;

      @include mixins.media(xs) {
        display: block;
      }

      &--previous {
        left: 0;
        border-right-color: variables.$color-grayscale--200;
      }

      &--next {
        right: 0;
        border-left-color: variables.$color-grayscale--200;
      }
    }

    &--hover,
    &:hover {
      #{$this}__button--previous:not(.swiper-button-disabled),
      #{$this}__button--next:not(.swiper-button-disabled) {
        @include mixins.media(xs) {
          opacity: 1;
          transition-delay: variables.$transition-duration-200;
        }
      }
    }
  }
</style>
