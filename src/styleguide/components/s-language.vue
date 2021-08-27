<template>
  <label>
    <span class="invisible">Language</span>
    <select :class="b()" :value="language" @change="onChange">
      <option v-for="locale in i18nLocales"
              :key="locale"
              :value="locale">
        {{ $t(`s-language.${locale}`) }}
      </option>
    </select>
  </label>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import i18n, { I18N_LOCALES } from '@/setup/i18n';

  export default defineComponent({
    name: 's-language',
    status: 0, // TODO: remove when component was prepared for current project.

    // props: {},

    data() {
      return {
        i18nLocales: I18N_LOCALES,
      };
    },

    // components: {},
    computed: {
      /**
       * The current language.
       *
       * @returns {String}
       */
      language() {
        return this.$i18n.locale;
      },
    },
    methods: {
      /**
       * Event handler for the change event of the language selector.
       *
       * @param {Event} event - The related DOM event.
       */
      onChange(event: Event): void {
        const target = event.target as HTMLSelectElement;

        this.i18nSetLocale(target.value);
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
