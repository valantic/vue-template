<template>
  <div :class="b()">
    <h1>Tooltip</h1>
    <div style=" width: max-content; margin: auto;padding: 10vh 0; text-align: center;">
      <h2 style=" padding-bottom: 30px;font-weight: bold;">
        Disable/Enable Tooltip
      </h2>

      <div :class="b('link')">
        <span v-tooltip:[position].mouseover="'Content for the tooltip'">Hover me to see the tooltip.</span>
      </div>
      <div>
        <label>
          <input v-model="active" type="checkbox"> Enable tooltip
        </label>
      </div>
    </div>

    <div style=" width: max-content; margin: auto;padding: 10vh 0; text-align: center;">
      <h2 style=" padding-bottom: 30px;font-weight: bold;">
        Select Tooltip Position
      </h2>

      <div>
        <c-tooltip :popper-options="popperOptions">
          Hover me to see the tooltip.

          <template #tooltip>
            This is the content for the tooltip
          </template>
        </c-tooltip>
      </div>

      <ul style="display: flex; justify-content: center; margin: 0; padding: 10px 0 30px; list-style: none;">
        <li>
          <e-select v-model="placement"
                    :options="placementOptions"
                    label="tooltip-position"
                    name="tooltip-position"
          />
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { Options, Placement } from '@popperjs/core';
  import eSelect from '@/elements/e-select.vue';
  import cTooltip from '@/plugins/tooltip/c-tooltip.vue';
  import tooltipDirective from '@/plugins/tooltip/directives/directive';

  interface IData {
    active: boolean;
    placementOptions: Record<'label' | 'value', string>[],
    placement: Placement
  }

  export default defineComponent({
    name: 'r-tooltips',
    components: {
      eSelect,
      cTooltip,
    },

    directives: {
      tooltip: tooltipDirective,
    },

    // props: {},
    data(): IData {
      return {
        active: true,
        placementOptions: [
          {
            label: 'top',
            value: 'top',
          },
          {
            label: 'right',
            value: 'right',
          },
          {
            label: 'bottom',
            value: 'bottom',
          },
          {
            label: 'left',
            value: 'left',
          },
        ],

        placement: 'bottom',

      };
    },

    computed: {
      position(): string {
        return this.active ? 'top' : 'hidden';
      },

      popperOptions(): Partial<Options> {
        return {
          placement: this.placement,
        };
      },
    },
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

    // methods: {},
    // render() {},
  });
</script>

<style lang="scss">
  .r-tooltips {
    // Add specific styles.
  }
</style>
