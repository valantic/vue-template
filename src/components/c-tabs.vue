<template>
  <div :class="b()">
    <ul :class="b('tab-list')"
        :aria-label="ariaLabel"
        role="tablist"
    >
      <li v-for="tab in tabs"
          :key="tab.id"
          :class="b('tab-item')"
      >
        <button :id="`c-tabs-${uuid}--tab-${tab.id}`"
                :class="b('tab', { [tab.id]: true, active: tab === activeTab })"
                :aria-selected="tab === activeTab"
                :aria-controls="`c-tabs-${uuid}--panel-${tab.id}`"
                role="tab"
                @click="onTabClick(tab)"
        >
          {{ tab.title }}
        </button>
      </li>
    </ul>
    <!-- @slot default - allows to use the component without panels. -->
    <slot>
      <div v-for="tab in tabs"
           :id="`c-tabs-${uuid}--panel-${tab.id}`"
           :key="tab.id"
           :class="b('panel', { [tab.id]: true, visible: tab === activeTab })"
           :aria-labelledby="`c-tabs-${uuid}--tab-${tab.id}`"
           :tabindex="tab === activeTab ? 0 : -1"
           role="tabpanel"
      >
        <!-- @slot [tab.id] - Renders the panel content for the current tab. -->
        <slot :name="`${tab.id}`"></slot>
      </div>
    </slot>
  </div>
</template>

<script lang="ts">
  import { defineComponent, PropType } from 'vue';
  import useUuid, { IUuid } from '@/compositions/uuid';

  interface ISetup extends IUuid {}

  export interface ITab {
    title: string,
    id: string,
    active: boolean
  }

  interface IData {
    activeTab: ITab|null
  }

  /**
   * Renders an A11y compatible tab component.
   *
   * Inspired by
   * - https://www.w3.org/TR/wai-aria-practices/examples/tabs/tabs-1/tabs.html
   * - http://web-accessibility.carnegiemuseums.org/code/tabs/
   */
  export default defineComponent({
    name: 'c-tabs',

    // components: {},

    props: {
      /**
       * Expects a list of tab definitinos.
       */
      tabs: {
        type: Array as PropType<ITab[]>,
        required: true,
      },

      /**
       * Accepts a label that describes the purpose of the set of tabs.
       */
      ariaLabel: {
        type: String,
        default: null,
      },
    },
    emits: [
      'change',
    ],

    setup(): ISetup {
      return {
        ...useUuid(),
      };
    },
    data(): IData {
      return {
        activeTab: this.tabs.find(tab => tab.active) || null,
      };
    },

    // computed: {},
    // watch: {},

    // beforeCreate() {},
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
       * Handles the click event of tabs.
       */
      onTabClick(tab: ITab) {
        this.activeTab = tab;

        this.$emit('change', tab);
      }
    },
    // render() {},
  });
</script>

<style lang="scss">
  @use '../setup/scss/variables';

  .c-tabs {
    &__tab-list {
      display: flex;
      border-bottom: 1px solid variables.$color-grayscale--0;
    }

    &__tab-item {
      border: 1px solid variables.$color-grayscale--0;
      border-bottom: 0;

      &:not(:first-child) {
        border-left: 0;
      }
    }

    &__tab {
      padding: variables.$spacing--5 variables.$spacing--10;

      &--active {
        background: variables.$color-grayscale--0;
        color: variables.$color-grayscale--1000;
      }
    }

    &__panel {
      display: none;
      border: 1px solid variables.$color-grayscale--0;
      border-top: 0;
      padding: variables.$spacing--5 variables.$spacing--10;

      &--visible {
        display: block;
      }
    }
  }
</style>
