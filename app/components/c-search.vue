<template>
  <div :class="b()">
    <div :class="b('search')">
      <e-input v-model="searchstring"
               :placeholder="$t('c-search.placeholder')"
               :title="$t('c-search.title')"
               :focus-shadow="false"
               autocomplete="off"
               type="search"
               name="searchfield"
               border="0"
      />
    </div>
  </div>
</template>

<script>
  export default {
    name: 'c-search',
    // components: {},
    // mixins: [],

    // props: {},
    data() {
      return {
        searchstring: '',
      };
    },

    // computed: {},
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
  .c-search {
    height: 100%;
    padding: $spacing--10;

    @include media(sm) {
      padding: $spacing--0;
      display: flex;
      align-items: center;
    }

    &__search {
      flex: 1 1 auto;
    }
  }
</style>
