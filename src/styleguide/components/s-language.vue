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
  import i18nMixin from '../../mixins/i18n';

  export default {
    name: 's-language',
    status: 0,

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
        return this.$i18n.locale;
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
    // beforeDestroy() {},
    // destroyed() {},
  };
</script>

<style lang="scss">
  // .s-language {}
</style>
