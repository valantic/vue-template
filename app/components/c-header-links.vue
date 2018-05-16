<template>
  <div :class="b()">
    <div v-if="userLoggedIn" :class="b('item', { active: accountActive })">
      <a :class="b('link')" :href="$t('c-header-links.linkAccount')">
        <e-icon
          :class="b('icon')"
          inline
          icon="i-account"
          width="25px"
          height="25px"
        />
        <span :class="b('label')">{{ username }}</span>
      </a>
    </div>
    <div v-if="userLoggedIn" :class="b('item', { active: wishlistActive })">
      <a :class="b('link')" :href="$t('c-header-links.linkWishlist')">
        <e-icon
          :class="b('icon')"
          inline
          icon="i-wishlist"
          width="25px"
          height="25px"
        />
        <span :class="b('label')">{{ $t('c-header-links.labelWishlist') }}</span>
      </a>
    </div>
    <div v-if="!userLoggedIn" :class="b('item', { active: loginActive })">
      <a :class="b('link')" :href="$t('c-header-links.linkLogin')">
        <e-icon
          :class="b('icon')"
          inline
          icon="i-account"
          width="25px"
          height="25px"
        />
        <span :class="b('label')">{{ $t('c-header-links.labelLogin') }}</span>
      </a>
    </div>
  </div>
</template>

<script>
  import eIcon from '@/components/e-icon';

  export default {
    name: 'c-header-links',
    components: {
      eIcon,
    },
    // mixins: [],

    props: {
      isAccountActive: {
        type: Boolean,
        default: false,
      },
      isWishlistActive: {
        type: Boolean,
        default: false,
      },
      isLoginActive: {
        type: Boolean,
        default: false,
      }
    },
    // data() {},

    computed: {
      userLoggedIn() {
        return true; // TODO: receive user state through the Vuex Store
      },
      accountActive() {
        return this.isAccountActive; // TODO: get user state of Vuex Store, to determine if user is on account page
      },
      wishlistActive() {
        return this.isWishlistActive; // TODO: get user state of Vuex Store, to determine if wishlist is active
      },
      loginActive() {
        return this.isLoginActive; // TODO: get user state of Vuex Store, to determine if login is active
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

    // methods: {},
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
      }
    }

    &__label {
      @include font($font-size--10, 13, $font-weight--semi-bold);

      display: none;
      color: $color-grayscale--1000;

      @include media(xs) {
        display: block;
      }
    }
  }
</style>
