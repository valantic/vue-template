<template>
  <div :class="b()">
    <a
      v-if="$attrs.href"
      :class="b('link')"
      :title="logo.title"
      v-bind="$attrs"
      tabindex="-1"
    >
      <!-- TODO: Check if e-icon is the best way to render the logo -->
      <e-icon
        :icon="logo.icon"
        :alt="logo.alt"
      />
    </a>
    <e-icon
      v-else
      :icon="logo.icon"
      :alt="logo.alt"
    />
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import useTheme, { Theme } from '@/compositions/themes';
  import eIcon from '@/elements/e-icon.vue';

  type Logo = {
    icon: Icon;
    alt: string;
    title: string;
  };

  /**
   * e-logo renders the company logo depending on the current theme (from the store)
   *
   * Native link attributes can be used
   */
  export default defineComponent({
    name: 'e-logo',

    components: {
      eIcon,
    },

    inheritAttrs: false,

    // props: {},
    // data() {
    //   return {};
    // },

    setup(): Theme {
      return {
        ...useTheme(),
      };
    },

    computed: {
      /**
       * Gets the correct logo depending on the theme value from the store.
       */
      logo(): Logo {
        const title = this.$t('e-logo.linkTitle');
        let alt = '';
        let icon: Icon;

        switch (this.theme) {
          case '01':
            icon = 'i-styleguide-heart';
            alt = 'example logo default';
            break;

          case '02':
            icon = 'i-styleguide-heart';
            alt = 'example logo 02';
            break;

          default:
            icon = 'i-styleguide-heart';
            alt = 'example logo default';
        }

        return {
          icon,
          alt,
          title,
        };
      },
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
    // beforeUnmount() {},
    // unmounted() {},

    // methods: {},
    // render() {},
  });
</script>

<style lang="scss">
  .e-logo {
    &__link,
    &__link:hover,
    &__link:focus {
      display: inline-block;
      width: 100%;
      padding: 0;
      border-bottom: 0;
      text-decoration: none;
    }
  }
</style>
