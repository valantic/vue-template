#### `single checkbox`

Always use **v-model** to bind value to form elements!
```
<template>
<div>

  <e-checkbox v-model="checked" :value="value">
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
      // The list of IDs of checked items
      checked: false,
      value: 'Single Checkbox'
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
    <e-checkbox :key="item.id" v-model="checked" :value="item.value">
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
        {id: 1,value: 'Checkbox 1'},
        {id: 2,value: 'Checkbox 2'},
        {id: 3,value: 'Checkbox 3'}
      ],
      
      // The list of IDs of checked items
      checked: []
    })
  };
</script>
```


#### `:hover`
```
<template>
  <div>
  
    <e-input v-model="demo" hover name="demo" placeholder="enter text..."/> 
    
    <div v-if="demo" class="spacing--top-15">
      <p>{{demo}}</p>
    </div>
  
  </div>
</template>

<script>
  export default {
    name: 'example',
    data: () => ({
      demo: ''
    })
  };
</script>
```


#### `:focus`
```
<template>
  <div>
  
    <e-input v-model="demo" focus name="demo" placeholder="enter text..."/> 
    
    <div v-if="demo" class="spacing--top-15">
      <p>{{demo}}</p>
    </div>
  
  </div>
</template>

<script>
  export default {
    name: 'example',
    data: () => ({
      demo: ''
    })
  };
</script>
```

#### state: `error`
```
<template>
  <div>
  
    <e-input v-model="demo" state="error" name="demo" placeholder="enter text..."/> 
    
    <div v-if="demo" class="spacing--top-15">
      <p>{{demo}}</p>
    </div>
  
  </div>
</template>

<script>
  export default {
    name: 'example',
    data: () => ({
      demo: ''
    })
  };
</script>
```

#### state: `success`
```
<template>
  <div>
  
    <e-input v-model="demo" state="success" hover name="demo" placeholder="enter text..."/> 
    
    <div v-if="demo" class="spacing--top-15">
      <p>{{demo}}</p>
    </div>
  
  </div>
</template>

<script>
  export default {
    name: 'example',
    data: () => ({
      demo: ''
    })
  };
</script>
```

#### state: `info`
```
<template>
  <div>
  
    <e-input v-model="demo" state="info" hover name="demo" placeholder="enter text..."/> 
    
    <div v-if="demo" class="spacing--top-15">
      <p>{{demo}}</p>
    </div>
  
  </div>
</template>

<script>
  export default {
    name: 'example',
    data: () => ({
      demo: ''
    })
  };
</script>
```
