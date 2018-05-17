<template>
  <select :class="b()" @change="onChange">
    <option v-for="theme in themes"
            :value="theme.id"
            :key="theme.id"
    >
      {{ theme.name }}
    </option>
  </select>
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {
    name: 's-theme-selector',
    // components: {},
    // mixins: [],

    // props: {},
    data() {
      return {
        themes: [
          {
            name: 'Winterhalter - Fenner',
            id: '01'
          },
          {
            name: 'Electro LAN SA',
            id: '02'
          },
          {
            name: 'Fabri',
            id: '03'
          },
          {
            name: 'Dysbox',
            id: '04'
          },
          {
            name: 'Electroplast SA',
            id: '05'
          }
        ]
      };
    },

    computed: {
      ...mapGetters({
        /**
         * Gets the global theme
         *
         * @returns  {String}  theme id
         */
        globalTheme: 'session/getTheme'
      }),
    },

    watch: {
      /**
       * Watches for changes of the «globalTheme» and sets or changes the stylesheet with the
       * custom theme css-variables
       */
      globalTheme: {
        immediate: true,
        handler() {
          const cssId = 'themeStylesheet';
          const theme = this.globalTheme;

          if (!document.getElementById(cssId)) {
            const head = document.getElementsByTagName('head')[0];
            const link = document.createElement('link');

            link.id = cssId;
            link.rel = 'stylesheet';
            link.type = 'text/css';
            link.href = `/static/css/theme-${theme}.css`;
            link.media = 'all';
            head.appendChild(link);
          } else {
            const link = document.getElementById(cssId);

            link.href = `/static/css/theme-${theme}.css`;
          }
        }
      }
    },

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

    methods: {
      onChange(event) {
        this.$store.commit('session/setTheme', event.target.value);
      }
    },
    // render() {},
  };
</script>
