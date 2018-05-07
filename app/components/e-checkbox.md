#### `single checkbox`

Always use **v-model** to bind value to form elements!
```
<template>
<div>

  <e-checkbox v-model="checked" :name="name" :value="value">
    {{ value }}
  </e-checkbox>
  
  <div class="spacing--top-15">
    <pre>checked: {{ checked }}</pre>
  </div>

</div>
</template>

<script>
  export default {
    name: 'example',
    data: () => ({
      name: 'xyz',
      checked: false,
      value: 'single Checkbox'
    })
  };
</script>
```


#### `multiple checkboxes`
Use Array instead of Boolean for multiple checkboxes, which share the same v-model. 

```
<template>
<div>

  <div v-for="item in items">
    <e-checkbox :key="item.id" v-model="checked" :name="item.name" :value="item.value">
      {{ item.value }}
    </e-checkbox>
  </div>
  
  <div class="spacing--top-15">
    <pre>checked: {{ checked }}</pre>
    <pre>items: {{ items }}</pre>
  </div>

</div>
</template>

<script>
  export default {
    name: 'example',
    data: () => ({
      // The list of items we need to do operation on
      items: [
        {id: 1, name:'foo', value: 'Checkbox 1'},
        {id: 2, name:'bar', value: 'Checkbox 2'},
        {id: 3, name:'baz', value: 'Checkbox 3'}
      ],
      
      // The list of IDs of checked items
      checked: []
    })
  };
</script>
```

#### `checked`
```
<template>
<div>

  <e-checkbox checked v-model="checked" :name="name" :value="value">
    {{ value }}
  </e-checkbox>
  
</div>
</template>

<script>
  export default {
    name: 'example',
    data: () => ({
      name: 'checked',
      checked: true,
      value: 'checked'
    })
  };
</script>
```

#### `disabled`
```
<template>
<div>

  <e-checkbox disabled v-model="checked" :name="name" :value="value">
    {{ value }}
  </e-checkbox>
  
</div>
</template>

<script>
  export default {
    name: 'example',
    data: () => ({
      name: 'disabled',
      checked: false,
      value: 'disabled'
    })
  };
</script>
```


#### `:hover`
```
<template>
<div>

  <e-checkbox hover v-model="checked" :name="name" :value="value">
    {{ value }}
  </e-checkbox>

</div>
</template>

<script>
  export default {
    name: 'example',
    data: () => ({
      name: 'hover',
      checked: false,
      value: 'hover'
    })
  };
</script>
```


#### `:focus`
```
<template>
<div>

  <e-checkbox focus v-model="checked" :name="name" :value="value">
    {{ value }}
  </e-checkbox>

</div>
</template>

<script>
  export default {
    name: 'example',
    data: () => ({
      name: 'focus',
      checked: false,
      value: 'focus'
    })
  };
</script>
```

#### state: `info`
```
<template>
<div>

  <e-checkbox state="info" v-model="checked" :name="name" :value="value">
    {{ value }}
  </e-checkbox>

</div>
</template>

<script>
  export default {
    name: 'example',
    data: () => ({
      name: 'info',
      checked: true,
      value: 'info'
    })
  };
</script>
```
