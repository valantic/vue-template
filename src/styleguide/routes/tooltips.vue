<template>
  <div :class="b()">
    <h1>Tooltip</h1>

    <portal-target name="tooltip" multiple />

    <div style="padding: 10vh 0; width: max-content; margin: auto; text-align: center;">
      <h2 style="font-weight: bold; padding-bottom: 30px;">
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

    <div style="padding: 10vh 0; width: max-content; margin: auto; text-align: center;">
      <h2 style="font-weight: bold; padding-bottom: 30px;">
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

      <ul style="display: flex; list-style: none; padding: 10px 0 30px 0; margin: 0; justify-content: center;">
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

<script>
  import eSelect from '@/elements/e-select.vue';
  import tooltip from '../../plugins/tooltip/directive';
  import cTooltip from '../../plugins/tooltip/component';

  export default {
    name: 'tooltip',
    directives: {
      tooltip,
    },
    components: {
      cTooltip,
      eSelect
    },
    data() {
      return {
        active: true,
        placementOptions: [
          {
            label: 'top',
            value: 'top'
          },
          {
            label: 'right',
            value: 'right'
          },
          {
            label: 'bottom',
            value: 'bottom'
          },
          {
            label: 'left',
            value: 'left'
          },
        ],

        placement: 'bottom',

      };
    },
    computed: {
      position() {
        return this.active ? 'top' : 'hidden';
      },
      popperOptions() {
        return {
          placement: this.placement,
        };
      }
    }
  };
</script>

<style lang="scss">
.tooltip {
  &__link {
    padding: 10px 10px;
  }
}
</style>
