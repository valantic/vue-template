#### `default`

```vue
<template>
  <div>
    <e-textarea name="demo" placeholder="insert text..." v-model="demo" title="demotitle" :rows="5"/>
    
    <div v-if="demo" class="spacing--top-15" style="white-space: pre;">
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

#### `:disabled`

```vue
<e-textarea name="demo" disabled placeholder="insert text..."/>
```

#### `:hover`

```vue
<template>
  <div>
    <e-textarea name="demo" hover placeholder="insert text..." v-model="demo"/>
  
    <div v-if="demo" class="spacing--top-15" style="white-space: pre;">
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

#### `:active`

```vue
<template>
  <div>
    <e-textarea name="demo" active placeholder="insert text..." v-model="demo"/>
  
    <div v-if="demo" class="spacing--top-15" style="white-space: pre;">
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


```vue
<template>
  <div>
    <e-textarea name="demo" focus placeholder="insert text..." v-model="demo"/>
    
    <div v-if="demo" class="spacing--top-15" style="white-space: pre;">
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

#### `:error`

```vue
<template>
  <div>
    <e-textarea name="demo" placeholder="insert text..." v-model="demo" state="error" notification="Choose a username at least 6 characters long!"/>
  
    <div v-if="demo" class="spacing--top-15" style="white-space: pre;">
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

#### `:success`

```vue
<template>
  <div>
    <e-textarea name="demo" placeholder="insert text..." v-model="demo" state="success" notification="Choose a username at least 6 characters long!"/>
    
    <div v-if="demo" class="spacing--top-15" style="white-space: pre;">
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

#### `:info`
```vue
<template>
  <div>
    <e-textarea name="demo" placeholder="insert text..." v-model="demo" state="info" notification="Choose a username at least 6 characters long!"/>
    
    <div v-if="demo" class="spacing--top-15" style="white-space: pre;">
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
