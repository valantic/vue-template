<template>
  <div :class="b()">
    <div :class="b('filter')">
      <input :class="b('filter-input')"
             v-model="filter"
             placeholder="Search …"
      >
    </div>
    <div :class="b('grid')">
      <div v-for="icon in filteredIcons"
           :class="b('grid-item')"
           :key="icon"
      >
        <div :class="b('icon-wrapper')">
          <e-icon :icon="icon" :key="icon" width="50"/>
        </div>
        <div :class="b('icon-label')">{{ icon }}</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 's-icon-finder',

    // props: {},

    data() {
      const icons = require.context('../../assets/icons/', false, /\.svg/).keys();

      return {
        icons: icons.map(icon => icon.match(/\.\/(.*?)\.svg$/)[1]),
        filter: '',
      };
    },

    // components: {},
    computed: {
      filteredIcons() {
        return this.icons.filter(icon => icon.indexOf(this.filter) > -1);
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
    // beforeDestroy() {},
    // destroyed() {},
  };
</script>

<style lang="scss">
  .s-icon-finder {
    font-family: $font-family--primary;

    &__filter-input {
      display: block;
    }

    &__grid {
      display: flex;
      flex-wrap: wrap;
      margin: 0 -5px;
    }

    &__grid-item {
      overflow: hidden;
      border: 1px solid #000000;
      margin: 5px;
      flex: 0 1 10%;

      &::before {
        display: block;
        content: "";
        float: left;
        width: 0;
        padding-top: 100%;
      }

      .s-icon {
        display: block;
        width: 50%;
        height: 50%;
        margin: auto;
      }

      .s-icon__icon {
        width: 100%;
        height: 100%;
      }
    }

    &__icon-wrapper {
      display: flex;
      justify-content: center;
      align-items: center;
      min-width: 100%;
      height: 80%;
    }

    &__icon-label {
      @include font(10);

      text-align: center;
    }
  }
</style>
