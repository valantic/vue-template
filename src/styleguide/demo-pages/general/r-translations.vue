<template>
  <l-vas-layout :class="b()">
    <div :class="b('color-grid')">
      <strong>vue 18n:</strong>
      <a
        href="https://vue-i18n.intlify.dev/"
        target="_blank"
        rel="noopener noreferrer"
      >
        https://vue-i18n.intlify.dev
      </a>
      <table :class="b('table')">
        <thead>
          <tr>
            <th>Description</th>
            <th>Translation</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Inline html usage</td>
            <td>{{ $t('c-date-picker.calendar-range-title') }}</td>
          </tr>
          <tr>
            <td>Computed usage</td>
            <td>{{ getTranslatedString }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </l-vas-layout>
</template>

<script lang="ts">
  import lVasLayout from '@valantic/vue-styleguide/src/layouts/l-vas-layout.vue';

  export default {
    name: 'r-translations',

    components: {
      lVasLayout,
    },
    // mixins: [ ],

    // props: {},
    // data() {
    //   return {
    //   };
    // },

    computed: {
      getTranslatedString(): string {
        return this.$t('c-date-picker.calendar-range-title');
      },
    },
    // watch: {},

    // beforeCreate() {},
    // created() {},
    // beforeMount() {},
    // mounted() { },
    // beforeUpdate() {},
    // updated() {},
    // activated() {},
    // deactivated() {},
    // beforeUnmount() {},
    // unmounted() {},

    // methods: {},
    // render() {},
  };
</script>

<style lang="scss">
  @use '@/setup/scss/variables';

  .r-translations {
    &__table {
      display: table;
      box-sizing: border-box;
      border-collapse: collapse;
      border-spacing: 2px;
      text-indent: 0;

      th,
      td {
        padding: 1rem;
        border: 1px solid variables.$va-color-grayscale--0;
      }

      th {
        background-color: variables.$va-color-grayscale--900;
      }
    }
  }
</style>
