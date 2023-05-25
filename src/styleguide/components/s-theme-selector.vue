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

<script lang="ts">
  import { defineComponent } from 'vue';
  import buildConfig from '@/../vite.builds.json';
  import sessionStore, { TSessionStore } from '@/stores/session';

  interface ITheme {
    name: string;
    id: string;
    selected?: boolean;
  }

  interface IData {
    availableThemes: string[];
  }

  interface ISetup {
    sessionStore: TSessionStore
  }

  export default defineComponent({
    name: 's-theme-selector',
    status: 0, // TODO: remove when component was prepared for current project.

    // components: {},

    // props: {},

    setup(): ISetup {
      return {
        sessionStore: sessionStore(),
      };
    },
    data(): IData {
      return {
        availableThemes: buildConfig.themeFiles,
      };
    },

    computed: {
      /**
       * Returns the currently active theme.
       */
      getTheme(): string {
        return this.sessionStore.getTheme;
      },

      /**
       * Loops the themes and mark the selected by the global theme.
       */
      themes(): ITheme[] {
        const themes = this.availableThemes;
        const activeTheme = this.getTheme;

        return themes.map(theme => ({
          name: theme,
          id: theme,
          selected: theme === activeTheme,
        }));
      },
    },

    watch: {
      /**
       * Watches for changes of the «theme» and sets or changes the stylesheet with the
       * custom theme css-variables
       */
      getTheme: {
        immediate: true,
        handler() {
          const cssId = 'themeStylesheet';
          const link = document.getElementById(cssId) as HTMLLinkElement;
          const theme = this.getTheme;

          if (!link) {
            this.createStyleElement(theme, cssId);
          } else {
            link.href = `/${buildConfig.themeSource}${theme}.scss`;
          }
        },
      },
    },

    // created() {},
    // beforeMount() {},
    // mounted() {},
    // beforeUpdate() {},
    // updated() {},
    // activated() {},
    // deactivated() {},
    // beforeUnmount() {},
    // unmounted() {},

    methods: {
      /**
       * Event handler for the change event of the theme selector.
       */
      onChange(event: Event) {
        const element = event.target as HTMLSelectElement;

        this.sessionStore.setTheme(element.value);
      },

      /**
       * Creates a new style link element.
       */
      createStyleElement(theme: string, cssId: string) {
        const head = document.getElementsByTagName('head')[0];
        const link = document.createElement('link');

        link.id = cssId;
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.href = `/${buildConfig.themeSource}${theme}.scss`;
        link.media = 'all';

        head.appendChild(link);
      },
    },
    // render() {},
  });
</script>
