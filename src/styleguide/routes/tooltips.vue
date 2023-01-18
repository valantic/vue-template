<template>
  <div :class="b()">
    <h1>Sandbox</h1>

    <portal-target name="tooltip" multiple />

    <div style="padding: 10vh 0; width: max-content; margin: auto;">
      <div :class="b('link')">
        <span v-tooltip:[position].mouseover="'Content for the tooltip'">Hover me to see the tooltip.</span>
      </div>
      <div>
        <label>
          <input v-model="active" type="checkbox"> Enable tooltip
        </label>
      </div>
    </div>

    <div style="padding: 10vh 0; width: max-content; margin: auto;">
      <ul style="display: flex; list-style: none; padding: 0 0 30px 0; margin: 0;">
        <li>
          <e-select v-model="placement"
                    :options="placementOptions"
                    label="tooltip-position"
                    name="tooltip-position"
          />
        </li>
      </ul>
      <div>
        <c-tooltip :popper-options="popperOptions">
          Tooltip toggle

          <template #tooltip>
            This is the content for the tooltip
          </template>
        </c-tooltip>
      </div>

    </div>
  </div>
</template>

<script>
  import tooltip from '../../plugins/tooltip/directive';
  import cTooltip from '../../plugins/tooltip/component';

  export default {
    name: 'tooltip',
    directives: {
      tooltip,
    },
    components: {
      cTooltip
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
