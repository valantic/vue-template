<template>
  <label>
    <span class="invisible">Theme</span>
    <select v-bem @change="onChange">
      <option v-for="theme in themes"
              :key="theme.id"
              :value="theme.id"
              :selected="theme.selected"
      >
        {{ theme.name }}
      </option>
    </select>
  </label>
</template>

<script>
  import { mapGetters } from 'vuex';

  const THEME_PATH = '/assets/css/shop.theme-';

  export default {
    name: 's-theme-selector',
    // components: {},
    // mixins: [],

    // props: {},
    data() {
      return {
        defaultThemes: [
          {
            name: 'Theme 01',
            id: '01'
          },
          {
            name: 'Theme 02',
            id: '02'
          }
        ],
      };
    },

    computed: {
      ...mapGetters('session', [
        'theme',
      ]),

      /**
       * Loops the themes and mark the selected by the global theme.
       *
       * @returns {Array} list of themes
       */
      themes() {
        const list = this.defaultThemes;
        const activeId = this.theme;

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
       * Watches for changes of the «theme» and sets or changes the stylesheet with the
       * custom theme css-variables
       */
      theme: {
        immediate: true,
        handler() {
          const cssId = 'themeStylesheet';
          const { theme } = this;

          if (!document.getElementById(cssId)) {
            this.createStyleElement(theme, cssId);
          } else {
            const link = document.getElementById(cssId);

            link.href = `${THEME_PATH}${theme}.css`;
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
        link.href = `${THEME_PATH}${themeId}.css`;
        link.media = 'all';

        head.appendChild(link);
      }
    },
    // render() {},
  };
</script>
