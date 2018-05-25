<template>
  <select :class="b()" @change="onChange">
    <option v-for="theme in themes"
            :value="theme.id"
            :key="theme.id"
            :selected="theme.selected"
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
        defaultThemes: [
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
        ],
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

      /**
       * Loops the themes and mark the selected by the global theme
       *
       * @returns {Array} list of themes
       */
      themes() {
        const list = this.defaultThemes;
        const activeId = this.globalTheme;

        return list.map((theme) => {
          let selected = false;

          if (theme.id === activeId) {
            selected = true;
          }

          return {
            name: theme.name,
            id: theme.id,
            selected
          };
        });
      }
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
            this.createStyleElement(theme, cssId);
          } else {
            const link = document.getElementById(cssId);

            link.href = `/static/css/theme-${theme}.css`;
          }
        }
      }
    },

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
      },
      createStyleElement(themeId, cssId) {
        const head = document.getElementsByTagName('head')[0];
        const link = document.createElement('link');

        link.id = cssId;
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.href = `/static/css/theme-${themeId}.css`;
        link.media = 'all';

        head.appendChild(link);
      }
    },
    // render() {},
  };
</script>
