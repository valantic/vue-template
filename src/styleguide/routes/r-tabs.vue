<!-- eslint-disable max-len -->
<template>
  <div :class="b()">
    <c-tabs :tabs="tabs" @change="onChange">
      <template #tab1__tab>
        <e-icon icon="i-styleguide-heart" />
      </template>
      <template #tab1>
        Content of Tab 1
      </template>
      <template #tab2>
        Content of Tab 2
      </template>
      <template #tab3>
        Content of Tab 3
      </template>
    </c-tabs>
    <c-tabs :tabs="tabs" @change="onChange">
      Tab without panels.
    </c-tabs>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import cTabs, { ITab } from '@/components/c-tabs.vue';
  import eIcon from '@/components/e-icon.vue';

  interface IData {

    /**
     * Holds a tab definition.
     */
    tabs: ITab[]
  }

  export default defineComponent({
    name: 'r-tabs',
    components: {
      eIcon,
      cTabs,
    },

    data(): IData {
      return {
        tabs:  [
          { title: 'Tab 1', id: 'tab1' },
          { title: 'Tab 2', id: 'tab2', active: true },
          { title: 'Tab 3', id: 'tab3' },
          { title: 'Link tab', id: 'tab4', meta: { href: '#tab4-link' } },
        ],
      };
    },

    methods: {
      /**
       * Handles the change event of the tab component.
       */
      onChange(tab: ITab) {
        console.log("change", tab); // eslint-disable-line

        if (tab.meta?.href) {
          window.location.assign(tab.meta.href as string);
        }
      },
    },
  });
</script>

<style lang="scss">
  // @use '../../setup/scss/mixins';
  @use '../../setup/scss/variables';

  .r-tabs {
    display: grid;
    gap: variables.$spacing--30;

    .e-tabs {
      margin-bottom: variables.$spacing--50;
    }
  }
</style>
