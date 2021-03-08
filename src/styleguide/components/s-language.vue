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

<script>
  import i18n from '@/setup/i18n';
  import i18nMixin from '../../mixins/i18n';

  export default {
    name: 's-language',
    status: 0, // TODO: remove when component was prepared for current project.

    mixins: [i18nMixin],

    // props: {},

    // data() {},

    // components: {},
    computed: {
      /**
       * The current language.
       *
       * @returns {String}
       */
      language() {
        return i18n.global.locale;
      },
    },
    methods: {
      /**
       * Event handler for the change event of the language selector.
       *
       * @param {Event} event - The related DOM event.
       */
      onChange(event) {
        this.i18nSetLocale(event.target.value);
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
  };
</script>

<style lang="scss">
  // .s-language {}
</style>
