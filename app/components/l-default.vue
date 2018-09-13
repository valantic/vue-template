<template>
  <div :class="b({ mobileNavigationIsVisible })" data-app>
    <div ref="content" :class="b('content')" :style="contentStyle">
      <div ref="inner"
           :class="b('inner')"
           :style="{ minHeight: `${mainNavigationHeight}px` }">
        <c-notification-container :state="headerState" />
        <c-notification-container :state="headerState" display-type="add-to-cart" />
        <slot></slot>
      </div>
    </div>
    <portal-target name="modal-container" multiple />
  </div>
</template>

<script>
  import { mapGetters, mapMutations } from 'vuex';
  import cNotificationContainer from '@/components/c-notification-container';

  export default {
    name: 'l-default',
    components: {
      cNotificationContainer,
    },
    // mixins: [],

    props: {
      /**
       * Reduced layout is without search, navigation, account information.
       */
      reduced: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        lastKnownScrollPosition: 0,
        ticking: false,
        headerState: 'full',
        calculateContentHeightTimeout: null,
      };
    },

    computed: {
      ...mapGetters('session', [
        'headerHeight',
      ]),

      ...mapGetters('navigation', [
        'mainNavigationHeight',
        'assortmentNavigationIsVisible',
        'mobileNavigationIsVisible',
      ]),

      contentStyle() {
        return {
          marginTop: `${this.headerHeight}px`,
        };
      },
    },
    // watch: {},

    // beforeCreate() {},
    created() {
      window.addEventListener('resizeend', this.calculateContentHeight);
      window.addEventListener('scroll', this.setHeaderState);
      window.addEventListener('scroll', this.calculateScrollPosition);
    },
    // beforeMount() {},
    mounted() {
      window.setTimeout(() => this.calculateContentHeight());

      this.getNotificationsFromStorage();
    },
    // beforeUpdate() {},
    // updated() {},
    // activated() {},
    // deactivated() {},
    // beforeDestroy() {},
    destroyed() {
      window.removeEventListener('resizeend', this.calculateContentHeight);
      window.removeEventListener('scroll', this.setHeaderState);
      window.removeEventListener('scroll', this.calculateScrollPosition);
    },

    methods: {
      ...mapMutations('notification', [
        'pushNotification',
      ]),

      /**
       * Sets the state of the header.
       */
      setHeaderState() {
        this.lastKnownScrollPosition = window.scrollY ? window.scrollY : window.pageYOffset;

        if (!this.ticking) {
          window.requestAnimationFrame(() => {
            this.headerState = this.lastKnownScrollPosition > 0 ? 'reduced' : 'full';
            this.ticking = false;
          });

          this.ticking = true;
        }
      },

      /**
       * Calculates content height and sets it in the store.
       *
       * @returns {Number}
       */
      calculateContentHeight() {
        if (this.$refs.content) {
          const contentHeight = this.$refs.content.clientHeight;

          this.$store.commit('session/setContentHeight', contentHeight);

          return contentHeight;
        }

        return 0;
      },

      /**
       * Saves the current scroll position to the store.
       */
      calculateScrollPosition() {
        if (!this.mobileNavigationIsVisible) {
          this.$store.commit('session/setScrollPosition', window.pageYOffset);
        }
      },

      /**
       * Gets localStorage messages and pushes them in the notification store to display.
       */
      getNotificationsFromStorage() {
        const messages = window.localStorage.getItem('notifications');
        const messagesParsed = messages && JSON.parse(messages) ? JSON.parse(messages) : [];

        if (messages && Array.isArray(messagesParsed)) {
          messagesParsed.forEach((message) => {
            this.pushNotification({ message });
          });

          // Clears the localStorage notifications.
          window.localStorage.removeItem('notifications');
        }
      },
    },
    // render() {},
  };
</script>

<style lang="scss">
  .l-default {
    $l-default__this: &;

    display: flex;
    flex-direction: column;
    height: 100vh;

    &--mobile-navigation-is-visible {
      background: $color-grayscale--1000;

      @include media(md) {
        background: transparent;
      }
    }

    &__content {
      background: $color-grayscale--600;
      flex: 1 0 auto;
      min-height: 1px; // Fixes a content shifting issue with IE11 if a child element has hover

      #{$l-default__this}--mobile-navigation-is-visible & { // stylelint-disable-line no-descending-specificity
        background: $color-grayscale--1000;

        @include media(md) {
          background: transparent;
        }
      }
    }

    &__inner {
      position: relative;
      background: $color-grayscale--1000;
      box-shadow: 0 4px 10px 1px rgba($color-grayscale--400, 0.3);
      margin: $spacing--20 auto;
      max-width: #{map-get($breakpoints, xl) - 20px};

      @include media(sm) {
        margin: $spacing--20 $spacing--10;
      }

      @include media(xl) {
        margin: $spacing--20 auto;
      }

      #{$l-default__this}--mobile-navigation-is-visible & { // stylelint-disable-line no-descending-specificity
        visibility: hidden;

        @include media(md) {
          visibility: visible;
        }
      }
    }
  }

  .s-layout {
    max-width: initial;
    margin: initial;
  }
</style>
