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

#### `:disabled`
```
<e-input disabled name="demo" value="Lorem ipsum..."/>
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
  
    <e-input v-model="demo" state="success" name="demo" placeholder="enter text..."/> 
    
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
  
    <e-input v-model="demo" state="info" name="demo" placeholder="enter text..."/> 
    
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

#### notification
```
<template>
  <div>
    <button @click="changeState('info')">Info</button>
    <button @click="changeState('error')">Error</button>
    <button @click="changeState('success')">Success</button>
    <hr/>
      <e-input v-model="demo" :state="state" name="demo" placeholder="enter text..." notification="this is a custom notification message..."/> 
      
      <div v-if="demo" class="spacing--top-15">
        <p>{{demo}}</p>
      </div>
  </div>
</template>

<script>
  export default {
    name: 'example',
    data: () => ({
      demo: '',
      state: 'info'
    }),
    methods: {
        changeState: function (state) {
          this.state = state;
        }
      }
  };
</script>
```
