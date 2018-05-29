<template>
  <div :class="b()">
    <div v-for="item in items"
         v-if="item.loggedIn === isLoggedInUser"
         :class="b('item', { active: item.isActive })"
         :key="item.link"
    >
      <a :class="b('link', { state })" :href="item.link" :title="getLinkTitle(item)">
        <e-icon
          :icon="item.icon"
          inline
          @click="onClick"
        />
        <span v-if="item.label" :class="b('label', { state })">{{ $t(item.label) }}</span>
        <span v-else-if="userName" :class="b('label', { state })">{{ userName }}</span>
      </a>
    </div>
  </div>
</template>

<script>
  import eIcon from '@/components/e-icon';
  import { mapGetters } from 'vuex';

  const ITEM_NAME_ACCOUNT = 'account';

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
       * Sets the display state of the header-links
       *
       * Valid values: `full, reduced`
       */
      state: {
        type: String,
        default: 'full',
        validator(value) {
          return [
            'full',
            'reduced'
          ].includes(value);
        }
      },

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
    },
    data() {
      return {
        items: [ // TODO: refactor icon set
          {
            name: ITEM_NAME_ACCOUNT,
            loggedIn: true,
            icon: 'i-account',
            link: '/ccount',
            label: '',
            isActive: this.account
          },
          {
            name: 'wishlist',
            loggedIn: true,
            icon: 'i-wishlist',
            link: '/wishlist',
            label: 'c-header-links.labelWishlist',
            isActive: this.wishlist
          },
          {
            name: 'login',
            loggedIn: false,
            icon: 'i-account',
            link: '/login',
            label: 'c-header-links.labelLogin',
            isActive: false
          }
        ],
      };
    },

    computed: {
      ...mapGetters('session', [
        'userName',
        'isLoggedInUser',
      ])
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
      getLinkTitle(item) {
        if (item.name === ITEM_NAME_ACCOUNT) {
          return this.$t('c-header-links.profile');
        }

        return item.label
          ? this.$t(item.label)
          : '';
      },
    },
    // render() {},
  };
</script>

<style lang="scss">
  .c-header-links {
    display: flex;
    justify-content: flex-end;

    .e-icon {
      display: flex;
      justify-content: center;

      path {
        fill: $color-grayscale--1000;
      }
    }

    &__item {
      &--active,
      &:hover {
        .e-icon path {
          fill: $color-primary--1;
        }
      }
    }

    &__link {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      border-bottom: none;
      padding: $spacing--15 $spacing--10 $spacing--5 $spacing--10;

      @include media(xs) {
        padding: $spacing--15 $spacing--10 $spacing--5 $spacing--10;
      }

      &--state-reduced {
        padding: $spacing--10 $spacing--10 $spacing--5 $spacing--10;
      }

      &:hover {
        border-bottom: none;

        .e-icon svg path {
          filter: url(#dropshadow);
        }
      }
    }

    &__label {
      @include font($font-size--10, 13px);

      display: none;
      color: $color-grayscale--1000;
      margin-top: 0;
      padding: 3px 0 6px 0;
      text-align: center;

      @include media(xs) {
        display: block;
      }

      &--state-reduced {
        display: none;
      }
    }
  }

</style>
