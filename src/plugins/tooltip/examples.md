### Component

#### Portal

A portal is used to display the tooltips realted to the component. This was required because the position and display type of the tooltip component might not be compatible with the inline tooltip.

```vue
<template>
  <portal-target name="tooltip" multiple />
</template>
```

#### Example

```vue
<template>
  <div>
    <ul style="display: flex; list-style: none; padding: 0; margin: 0;">
      <li>
        <e-select v-model="placement" :options="placementOptions" label="tooltip-position" name="tooltip-position" />
      </li>
    </ul>
    <div style="padding: 20vh 0; width: max-content; margin: auto;">
      <c-tooltip :popper-options="popperOptions">
        Tooltip toggle

        <template #tooltip>
          This is the content for the tooltip
        </template>
      </c-tooltip>
    </div>
  </div>
</template>

<script>
  import cTooltip from './component';
  
  export default {
    components: {
      cTooltip
    },
    
    data() {
      return {
        placementOptions: [
          { label: 'top', value: 'top' },
          { label: 'right', value: 'right' },
          { label: 'bottom', value: 'bottom' },
          { label: 'left', value: 'left' },
        ],
        
        placement: 'bottom',
      }
    },
    computed: {
      popperOptions() {
        return {
          placement: this.placement,
        }
      }
    }
  };
</script>
```

### Directive

`v-tooltip[:<tooltipPosition>][.<tooltipTrigger>]="<String>"`

```vue
<template>
  <div style="display: grid; gap: 20px;">
    <div>
      <span v-tooltip:[position].mouseover="'Content for the tooltip'">
        Hover me to see the tooltip.
      </span>
    </div>
    <div>
      <label>
        <input type="checkbox" v-model="active"> Enable tooltip
      </label>
    </div>
  </div>
</template>

<script>
  import tooltip from './directive';
  
  export default {
    directives: {
      tooltip,
    },
    data() {
      return {
        active: true,
      }
    },
    computed: {
      position() {
        return this.active ? 'right' : 'hidden';
      }
    }
  }
</script>
```
