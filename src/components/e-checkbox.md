#### `single checkbox`

Always use **v-model** to bind value to form elements!
```vue
<template>
<div>
  <div style="display: block;">
    <e-checkbox v-model="checked" name="xyz" value="xyz">Example</e-checkbox>
  </div>
  
  <div class="spacing--top-15">
    <pre>checked: {{ checked }}</pre>
  </div>

</div>
</template>

<script>
  export default defineComponent({
    data: () => ({
      checked: false,
    })
  });
</script>
```


#### `multiple checkboxes`
Use Array instead of Boolean for multiple checkboxes, which share the same v-model. 

```vue
<template>
<div>

    <e-checkbox 
    v-for="item in items"
    :key="item.id" 
    v-model="checked" 
    :name="item.name" 
    :value="item.value" 
    style="margin-bottom: 10px">{{ item.displayName }}</e-checkbox>
  
  <div class="spacing--top-15">
    <pre>checked: {{ checked }}</pre>
  </div>

</div>
</template>

<script>
  export default defineComponent({
    data: () => ({
      // The list of items we need to do operation on
      items: [
        {id: 1, name:'multiple', value: 'checkbox1', displayName: 'Checkbox 1'},
        {id: 2, name:'multiple', value: 'checkbox2', displayName: 'Checkbox 2'},
        {id: 3, name:'multiple', value: 'checkbox3', displayName: 'Checkbox 3'}
      ],
      
      // The list of IDs of checked items
      checked: ['checkbox2']
    })
  });
</script>
```

#### `checked`
```vue
<template>
<div>

  <e-checkbox checked v-model="checked" name="checked" value="checked">Example</e-checkbox>
  
</div>
</template>

<script>
  export default defineComponent({
    data: () => ({
      checked: true,
    })
  });
</script>
```

#### `disabled`
```vue
<template>
<div>
  <e-checkbox disabled v-model="checked" name="checked" value="checked">Example</e-checkbox>
  <e-checkbox disabled v-model="unchecked" name="unchecked" value="unchecked">Example</e-checkbox>
</div>
</template>

<script>
  export default defineComponent({
    data: () => ({
      checked: true,
      unchecked: false,
    })
  });
</script>
```

#### Multiline

```vue
<template>
<div>
  <e-checkbox checked v-model="checked" name="checked" value="checked">This label<br>runs over<br>multiple lines</e-checkbox>
</div>
</template>

<script>
  export default defineComponent({
    data: () => ({
      checked: true,
    })
  });
</script>
```
