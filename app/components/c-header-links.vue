<template>
  <div :class="b()">
    <div v-for="item in items"
         v-if="item.loggedIn"
         :class="b('item', { active: item.isActive })"
         :key="item.link"
    >
      <a :class="b('link')" :href="$t(item.link)">
        <e-icon
          :class="b('icon')"
          :icon="item.icon"
          inline
          width="30px"
          height="30px"
          @click="onClick"
        />
        <span v-if="item.label" :class="b('label')">{{ $t(item.label) }}</span>
        <span v-else :class="b('label')">{{ username }}</span>
      </a>
    </div>
  </div>
</template>

<script>
  import eIcon from '@/components/e-icon';

  /**
   * Renders three links which contain an icon and a text element each. Should be displayed in the header.
   */
  export default {
    name: 'c-header-links',
    components: {
      eIcon,
    },
    // mixins: [],

    props: {
      /**
       * Defines if the account-link should be active.
       */
      account: {
        type: Boolean,
        default: false,
      },

      /**
       * Defines if the wishlist-link should be active.
       */
      wishlist: {
        type: Boolean,
        default: false,
      },

      /**
       * Defines if the login-link should be active.
       */
      login: {
        type: Boolean,
        default: false,
      }
    },
    data() {
      return {
        items: [
          {
            name: 'account', loggedIn: true, icon: 'i-account', link: 'urls.linkAccount', label: '', isActive: this.account
          },
          {
            name: 'wishlist', loggedIn: true, icon: 'i-wishlist', link: 'urls.linkWishlist', label: 'c-header-links.labelWishlist', isActive: this.wishlist
          },
          {
            name: 'login', loggedIn: false, icon: 'i-account', link: 'urls.linkLogin', label: 'c-header-links.labelLogin', isActive: this.login
          }
        ],
      };
    },

    computed: {
      userLoggedIn() {
        return true; // TODO: receive user state through the Vuex Store
      },
      accountActive() {
        return this.account; // TODO: get user state of Vuex Store, to determine if user is on account page
      },
      wishlistActive() {
        return this.wishlist; // TODO: get user state of Vuex Store, to determine if wishlist is active
      },
      loginActive() {
        return this.login; // TODO: get user state of Vuex Store, to determine if login is active
      },
      username() {
        return 'Max Muster'; // TODO: get user name of Vuex Store
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

    methods: {
      onClick(event) {
        /**
         * Click event
         *
         * @event click
         * @type {object}
         */
        this.$emit('click', event);
      },
    },
    // render() {},
  };
</script>

<style lang="scss">
  .c-header-links {
    display: flex;
    justify-content: flex-end;

    &__icon {
      display: flex;
      justify-content: center;

      path {
        fill: $color-grayscale--1000;
      }
    }

    &__item {
      &--active {
        .e-icon path {
          fill: $color-primary--1;
        }
      }
    }

    &__link {
      width: percentage(1);
      display: flex;
      flex-direction: column;
      align-items: center;
      border-bottom: none;
      padding: $spacing--10 $spacing--10 $spacing--5 $spacing--10;

      @include media(xs) {
        padding: $spacing--10 $spacing--20 $spacing--5 $spacing--20;
      }

      &:hover {
        border-bottom: none;

        .e-icon svg path {
          filter: "progid:DXImageTransform.Microsoft.Dropshadow(OffX=12, OffY=12, Color='#444')";
          filter: url(#dropshadow);
          // -webkit-filter: drop-shadow(12px 12px 7px rgba(0,0,0,0.5));
          // filter: drop-shadow(12px 12px 7px rgba(0,0,0,0.5));
        }

        // .e-icon svg {
        //   -webkit-filter: drop-shadow(12px 12px 7px rgba(0, 0, 0, 0.5));
        //   filter: drop-shadow(12px 12px 7px rgba(0, 0, 0, 0.5));
        // }
      }
    }

    &__label {
      @include font($font-size--10, 13px, $font-weight--semi-bold);

      display: none;
      color: $color-grayscale--1000;

      @include media(xs) {
        display: block;
      }
    }
  }
</style>
