
```vue
<c-component/>
```

```vue
<template>
  <div>
    <e-label name="Horizontal radio component" />
    <c-radio name="gender-horizontal"
             v-model="selectedValue"
             :dataSet="dataSet"
             horizontal
    />
    <br>
    <e-label name="Vertical radio component"/>
    <c-radio name="gender-vertical" 
             v-model="selectedValue" 
             :dataSet="dataSet" 
    />
    <br>
    <e-label name="Selected value"/>
    <p>
      {{ selectedValue }}
    </p>
  </div>
</template>

<script>
  export default {
    name: 'radio-example',
    data: () => ({
      dataSet: [
        {
          id: 'radio-male',
          value: 'radio-male',
          displayName: 'Male',
        },
        {
          id: 'radio-female',
          value: 'radio-female',
          displayName: 'Female',
        },
      ],
      selectedValue: 'radio-female',
    }),
  };
</script>
```
