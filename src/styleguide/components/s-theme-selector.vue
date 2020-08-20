<template>
  <label>
    <span class="invisible">Theme</span>
    <select :class="b()" @change="onChange">
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

  const THEME_PATH = '/assets/css/app.theme-';

  export default {
    name: 's-theme-selector',
    status: 0, // TODO: remove when component was prepared for current project.

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
        'getTheme',
      ]),

      /**
       * Loops the themes and mark the selected by the global theme.
       *
       * @returns {Array} list of themes
       */
      themes() {
        const list = this.defaultThemes;
        const activeId = this.getTheme;

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
          const link = document.getElementById(cssId);
          const { theme } = this;

          if (!link) {
            this.createStyleElement(theme, cssId);
          } else {
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
      /**
       * Event handler for the change event of the theme selector.
       *
       * @param {Event} event - The related DOM event.
       */
      onChange(event) {
        this.$store.commit('session/setTheme', event.target.value);
      },

      /**
       * Creates a new style link element.
       *
       * @param {String} themeId - The name of the desired theme.
       * @param {String} cssId - The unique ID for the link element.
       */
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
