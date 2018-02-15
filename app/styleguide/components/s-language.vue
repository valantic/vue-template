<template>
  <select :class="b()" :value="language" @change="onChange">
    <option v-for="language in i18nLocales"
            :value="language"
            :key="language"
            v-t="`s-language.${language}`">
    </option>
  </select>
</template>

<script>
  import i18nMixin from '@/mixins/i18n';

  export default {
    name: 's-language',

    mixins: [i18nMixin],

    // props: {},

    // data() {},

    // components: {},
    computed: {
      language() {
        return this.$i18n.locale;
      },
    },
    methods: {
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
