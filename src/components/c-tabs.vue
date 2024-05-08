<template>
  <div :class="b()">
    <ul
      :class="b('tab-list')"
      :aria-label="ariaLabel"
      role="tablist"
    >
      <li
        v-for="tab in tabs"
        :key="tab.id"
        :class="b('tab-item')"
        role="tab"
      >
        <a
          :id="`c-tabs-${uuid}--tab-${tab.id}`"
          :class="b('tab', { [tab.id]: true, active: tab.id === activeTab?.id })"
          :aria-selected="tab.id === activeTab?.id"
          :aria-controls="`c-tabs-${uuid}--panel-${tab.id}`"
          :href="tab.link?.href || `#c-tabs-${uuid}--panel-${tab.id}`"
          :target="tab.link?.target || LinkTarget.Self"
          :rel="tab.link?.target === LinkTarget.Blank ? 'noopener noreferrer' : undefined"
          role="tab"
          @click="onTabClick(tab)"
        >
          <!-- @slot ${tab.id}__tab - Allows to overwrite the tab title. -->
          <slot :name="`${tab.id}__tab`">
            {{ tab.title }}
          </slot>
        </a>
      </li>
    </ul>
    <!-- @slot default - Allows to use the component without panels. -->
    <slot>
      <div
        v-for="tab in tabs"
        :id="`c-tabs-${uuid}--panel-${tab.id}`"
        :key="tab.id"
        :class="b('panel', { [tab.id]: true, visible: tab.id === activeTab?.id })"
        :aria-labelledby="`c-tabs-${uuid}--tab-${tab.id}`"
        :tabindex="tab.id === activeTab?.id ? 0 : -1"
        role="tabpanel"
      >
        <!-- @slot ${tab.id} - Renders the panel content for the current tab. -->
        <slot :name="tab.id"></slot>
      </div>
    </slot>
  </div>
</template>

<script lang="ts">
  import { PropType, defineComponent } from 'vue';
  import { LinkTarget } from '@/setup/globals';
  import useUuid, { Uuid } from '@/compositions/uuid';
  import { Link } from '@/types/link';

  type Setup = Uuid;

  export type Tab = {
    /**
     * The text title for the current tab.
     */
    title: string;

    /**
     * A unique id for the current tab.
     */
    id: string;

    /**
     * Determines if the given tab should be initially active.
     */
    active?: boolean;

    /**
     * Allows to track additional information for a tab. e.g. a link.
     */
    link?: Link;
  };

  type Data = {
    LinkTarget: typeof LinkTarget;

    /**
     * Holds the currently active tab defintion.
     */
    activeTab: Tab | null;
  };

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
        type: Array as PropType<Tab[]>,
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
    emits: {
      change(payload: Tab): boolean {
        return typeof payload === 'object';
      },
    },

    setup(): Setup {
      return {
        ...useUuid(),
      };
    },
    data(): Data {
      return {
        LinkTarget,
        activeTab: this.tabs.find((tab) => tab.active) || null,
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
      onTabClick(tab: Tab): void {
        this.activeTab = tab;

        this.$emit('change', tab);
      },
    },
    // render() {},
  });
</script>

<style lang="scss">
  @use '../setup/scss/variables';

  .c-tabs {
    &__tab-list {
      display: flex;
      align-items: stretch;
      border-bottom: 1px solid variables.$color-grayscale--0;
    }

    &__tab-item {
      display: flex;
      align-items: stretch;
      border: 1px solid variables.$color-grayscale--0;
      border-bottom: 0;

      &:not(:first-child) {
        border-left: 0;
      }
    }

    &__tab {
      padding: variables.$spacing--5 variables.$spacing--10;
      cursor: pointer;

      &--active {
        background: variables.$color-grayscale--0;
        color: variables.$color-grayscale--1000;
      }
    }

    &__panel {
      display: none;
      padding: variables.$spacing--5 variables.$spacing--10;
      border: 1px solid variables.$color-grayscale--0;
      border-top: 0;

      &--visible {
        display: block;
      }
    }
  }
</style>
