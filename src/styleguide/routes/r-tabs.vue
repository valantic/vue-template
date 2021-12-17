<!-- eslint-disable max-len -->
<template>
  <div :class="b()">
    <e-tabs :tabs="tabs" @change="onChange">
      <template #tab1>
        Content of Tab 1
      </template>
      <template #tab2>
        Content of Tab 2
      </template>
      <template #tab3>
        Content of Tab 3
      </template>
    </e-tabs>
    <e-tabs :tabs="tabs" @change="onChange">
      Tab without panels.
    </e-tabs>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import ETabs, { ITab } from '@/components/e-tabs.vue';

  interface IData {
    tabs: ITab[]
  }

  export default defineComponent({
    name: 'r-tabs',
    components: {
      ETabs
    },

    data(): IData {
      return {
        tabs:  [
          { title: 'Tab 1', id: 'tab1', active: false },
          { title: 'Tab 2', id: 'tab2', active: true },
          { title: 'Tab 3', id: 'tab3', active: false },
        ]
      };
    },

    methods: {
      /**
       * Handles the change event of the tab component.
       */
      onChange(tab: ITab) {
        console.log("change", tab); // eslint-disable-line
      }
    }
  });
</script>

<style lang="scss">
  // @use '../../setup/scss/mixins';
  @use '../../setup/scss/variables';

  .r-tabs {
    .e-tabs {
      margin-bottom: variables.$spacing--50;
    }
  }
</style>
