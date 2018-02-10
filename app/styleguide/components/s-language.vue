<template>
  <select :class="b()" :value="language" @change="onChange">
    <option v-for="language in languages"
            :value="language"
            :key="language"
            v-t="`s-language.${language}`">
    </option>
  </select>
</template>

<script>
  import Vue from 'vue';

  export default {
    name: 's-language',

    // props: {},

    // data() {},

    // components: {},
    computed: {
      language() {
        return this.$i18n.locale;
      },
      languages() {
        return Vue.supportedLanguages();
      },
    },
    methods: {
      onChange(event) {
        Vue.setLocale(event.target.value);
      },
    },
    // watch: {},

    // beforeCreate() {},
    // created() {},
    // beforeMount() {},
    // mounted() {},
    // beforeUpdate() {},
    // updated() {},
    // activated() {}.
    // deactivated() {},
    // beforeDestroy() {},
    // destroyed() {},
  };
</script>

<style lang="scss">
  // .s-language {}
</style>
