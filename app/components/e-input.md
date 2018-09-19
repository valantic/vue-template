#### `default`

Always use **v-model** to bind value to form elements!

```
<template>
  <div>
  
    <e-input v-model="demo" name="demo" placeholder="enter text..." title="foo"/> 
    
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

#### static `:disabled`
```
<e-input disabled name="demo" value="Lorem ipsum..."/>
```

#### dynamic `:disabled`
```
<template>
  <div>
    <p>
      disabled: {{ disabled }}
    </p>
    <e-input :disabled="disabled" name="demo" value="Lorem ipsum..."/>
    <br>
    <e-button @click="disabled = !disabled" primary>toggle disabled state</e-button>
  </div>
</template>

<script>
  export default {
    data: () => ({
      disabled: false
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
  
    <e-input focus v-model="demo" name="demo" placeholder="enter text..."/> 
    
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
  
    <e-input v-model="demo" state="error" name="demo" placeholder="enter text..." notification="hello World!"/> 
    
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
  
    <e-input v-model="demo" state="success" name="demo" placeholder="enter text..." notification="hello World!"/> 
    
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
  
    <e-input v-model="demo" state="info" name="demo" placeholder="enter text..." notification="hello World!"/> 
    
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

#### No focus shadow
```
<template>
  <e-input v-model="demo" name="demo" :focusShadow="false" /> 
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

#### No border
```
<template>
  <e-input v-model="demo" name="demo" border="0" /> 
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

#### `slot`

Always use **v-model** to bind value to form elements!

```
<template>
  <div>
  
    <e-input v-model="demo" name="demo" placeholder="enter text..." title="foo">Stk.</e-input> 
    
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
