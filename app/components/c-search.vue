<template>
  <div :class="b()">
    <e-input v-model="searchstring"
             :placeholder="$t('c-search.placeholder')"
             :value="value"
             :autocomplete="autocomplete"
             state="search"
             name="searchfield"
             title="search"
    />
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
    height: percentage(1);
    padding: $spacing--10;

    @include media(sm) {
      padding: $spacing--0;
      display: flex;
      align-items: center;

      .e-input {
        width: percentage(1);
      }
    }

    .e-input::before {
      border: none;
    }

    .e-input::after {
      border: none;
    }
  }
</style>
