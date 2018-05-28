<!-- TODO - This component is supposed to be functional -->
<template>
  <div :class="b()">
    <div :class="b('inner')">
      <div :class="b('logo')">Logo</div>
      <div :class="b('icons')">
        <div v-if="userLoggedIn" :class="b('cart')">
          <div :class="b('cart-inner')">
            <c-mini-cart :state="state"/>
          </div>
        </div>
      </div>
      <div :class="b('assortment')">Sortiment</div>
      <div :class="b('search')">Search</div>
    </div>
  </div>
</template>

<script>
  import cMiniCart from '@/components/c-mini-cart';
  import { mapGetters } from 'vuex';

  export default {
    name: 'c-header',
    components: {
      cMiniCart,
    },
    // mixins: [],

    props: {
      /**
       * Sets the display state of the header
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
    },
    // data() {
    //   return {};
    // },

    computed: {
      ...mapGetters('session', [
        'user',
        'userLoggedIn',
      ]),
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
  .c-header {
    @include z-index(header);

    position: fixed;
    width: 100%;
    display: flex;
    border-bottom: 2px solid $color-primary--1;
    box-shadow: 0 4px 4px -4px rgba(0, 0, 0, 0.1);

    &::before {
      content: '';
      flex: 1 1 auto;
      background-color: $color-secondary--1;
      display: block; /* IE 11 */
    }

    &::after {
      content: '';
      flex: 1 1 auto;
      background-color: $color-secondary--2;
      display: block; /* IE 11 */
    }

    &__inner {
      background: linear-gradient(to right, $color-gradient--2-0, $color-gradient--2-1);
      color: $color-primary--3;
      max-width: map-get($grid-breakpoints, xl);
      width: 100%;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
    }

    &__logo {
      flex: 0 1 percentage(5 / 12);

      @include media(sm) {
        flex: 0 1 percentage(3 / 12);
        order: 1;
      }
    }

    &__assortment {
      flex: 0 1 percentage(3 / 12);

      @include media(sm) {
        display: none;
        order: 2;
      }
    }

    &__search {
      flex: 0 1 percentage(9 / 12);

      @include media(sm) {
        flex: 0 1 percentage(6 / 12);
        order: 3;
      }
    }

    &__icons {
      flex: 0 1 percentage(7 / 12);
      text-align: right;

      @include media(sm) {
        flex: 0 1 percentage(3 / 12);
        order: 4;
      }
    }

    &__cart-inner {
      padding-right: $spacing--10;

      @include media(sm) {
        padding-right: $spacing--15;
      }

      @include media(xl) {
        padding-right: $spacing--0;
      }
    }
  }
</style>
