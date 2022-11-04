<template>
  <label>
    <span class="invisible">Language</span>
    <select :class="b()" :value="language" @change="onChange">
      <option v-for="locale in i18nLocales"
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

  interface IData {
    i18nLocales: string[];
  }

  export default defineComponent({
    name: 's-language',
    status: 0, // TODO: remove when component was prepared for current project.

    // props: {},

    data(): IData {
      return {
        i18nLocales: I18N_LOCALES,
      };
    },

    // components: {},
    computed: {
      /**
       * The current language.
       */
      language() {
        return i18n.global.locale;
      },
    },
    methods: {
      /**
       * Event handler for the change event of the language selector.
       */
      onChange(event: Event): void {
        const target = event.target as HTMLSelectElement;

        this.setLocale(target.value);
      },

      /**
       * Sets the locale within the i18n.
       */
      setLocale(value: string) {
        i18nSetLocale(value);
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
  });
</script>

<style lang="scss">
  // .s-language {}
</style>
