#### `default`

Always use **v-model** to bind value to form elements!

```vue
<template>
  <div>
  
    <e-input v-model="demo" name="demo" placeholder="enter text..." title="foo"/> 
    
    <div v-if="demo" class="spacing--top-15">
      <p>{{demo}}</p>
    </div>
  
  </div>
</template>

<script>
  export default defineComponent({
    name: 'example',
    data: () => ({
      demo: ''
    })
  });
</script>
```

#### static `:disabled`
```vue
  <e-input name="demo" value="Lorem ipsum" disabled />
```

#### dynamic `:disabled`
```vue
<template>
  <div>
    <p>
      disabled: {{ disabled }}
    </p>
    <e-input :disabled="disabled" name="demo" v-model="value"/>
    <br />
    <e-button @click="disabled = !disabled" primary>toggle disabled state</e-button>
  </div>
</template>

<script>
  export default defineComponent({
    data: () => ({
      disabled: false,
      value: 'Lorem ipsum...'
    })
  });
</script>
```


#### `:hover`
```vue
<template>
  <div>
  
    <e-input v-model="demo" hover name="demo" placeholder="enter text..."/> 
    
    <div v-if="demo" class="spacing--top-15">
      <p>{{demo}}</p>
    </div>
  
  </div>
</template>

<script>
  export default defineComponent({
    name: 'example',
    data: () => ({
      demo: ''
    })
  });
</script>
```


#### `:focus`
```vue
<template>
  <div>
  
    <e-input focus v-model="demo" name="demo" placeholder="enter text..."/> 
    
    <div v-if="demo" class="spacing--top-15">
      <p>{{demo}}</p>
    </div>
  
  </div>
</template>

<script>
  export default defineComponent({
    name: 'example',
    data: () => ({
      demo: ''
    })
  });
</script>
```

#### state: `error`
```vue
<template>
  <div>
  
    <e-input v-model="demo" state="error" name="demo" placeholder="enter text..." notification="hello World!"/> 
    
    <div v-if="demo" class="spacing--top-15">
      <p>{{demo}}</p>
    </div>
  
  </div>
</template>

<script>
  export default defineComponent({
    name: 'example',
    data: () => ({
      demo: ''
    })
  });
</script>
```

#### state: `success`
```vue
<template>
  <div>
  
    <e-input v-model="demo" state="success" name="demo" placeholder="enter text..." notification="hello World!"/> 
    
    <div v-if="demo" class="spacing--top-15">
      <p>{{demo}}</p>
    </div>
  
  </div>
</template>

<script>
  export default defineComponent({
    name: 'example',
    data: () => ({
      demo: ''
    })
  });
</script>
```

#### state: `info`
```vue
<template>
  <div>
  
    <e-input v-model="demo" state="info" name="demo" placeholder="enter text..." notification="hello World!"/> 
    
    <div v-if="demo" class="spacing--top-15">
      <p>{{demo}}</p>
    </div>
  
  </div>
</template>

<script>
  export default defineComponent({
    name: 'example',
    data: () => ({
      demo: ''
    })
  });
</script>
```

#### No border
```vue
<template>
  <e-input v-model="demo" name="demo" border="0" /> 
</template>

<script>
  export default defineComponent({
    name: 'example',
    data: () => ({
      demo: ''
    })
  });
</script>
```

#### `slot`

Always use **v-model** to bind value to form elements!

```vue
<template>
  <div>
  
    <e-input v-model="demo" name="demo" placeholder="enter text..." title="foo">Stk.</e-input> 
    
    <div v-if="demo" class="spacing--top-15">
      <p>{{demo}}</p>
    </div>
  
  </div>
</template>

<script>
  export default defineComponent({
    name: 'example',
    data: () => ({
      demo: ''
    })
  });
</script>
```
