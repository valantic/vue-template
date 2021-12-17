<!-- eslint-disable max-len -->
<template>
  <div :class="b()">
    <c-tabs :tabs="tabs">
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
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import CTabs from '@/components/c-tabs.vue';

  export default defineComponent({
    name: 'r-tabs',
    components: {
      CTabs
    },

    data() {
      return {
        tabs:  [
          { title: 'Tab 1', id: 'tab1', active: false },
          { title: 'Tab 2', id: 'tab2', active: true },
          { title: 'Tab 3', id: 'tab3', active: false },
        ]
      };
    },
  });
</script>

<style lang="scss">
  // @use '../../setup/scss/mixins';
  // @use '../../setup/scss/variables';

  .r-tabs {
    // content
  }
</style>
