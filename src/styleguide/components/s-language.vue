<template>
  <label>
    <span class="invisible">Language</span>
    <select
      v-model="language"
      :class="b()"
    >
      <option
        v-for="locale in i18nLocales"
        :key="locale"
        :value="locale"
      >
        {{ $t(`s-language.${locale}`) }}
      </option>
    </select>
  </label>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import i18n, { I18N_LOCALES, i18nSetLocale } from '@/setup/i18n';

  type Data = {
    i18nLocales: string[];
  };

  export default defineComponent({
    name: 's-language',

    // props: {},

    data(): Data {
      return {
        i18nLocales: I18N_LOCALES,
      };
    },

    // components: {},
    computed: {
      /**
       * The current language.
       */
      language: {
        get() {
          // @ts-ignore -- 'locale' is a reactive, not a string. @see https://github.com/intlify/vue-i18n-next/issues/785
          return i18n.global.locale?.value;
        },
        set(value: string) {
          i18nSetLocale(value);
        },
      },
    },
    // methods: {},
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
  });
</script>

<style lang="scss">
  // .s-language {}
</style>
