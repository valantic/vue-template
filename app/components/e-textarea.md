#### `default`

```vue
<template>
  <div>

    <e-textarea name="demo" placeholder="insert text..." v-model="demo" sometest="true"/>
    
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
```

#### `:hover`

```vue
<e-textarea name="demo" hover placeholder="insert text..."/>
```

#### `:active`

```vue
<e-textarea name="demo" active placeholder="insert text..."/>
```

#### `:focus`


```vue
<e-textarea name="demo" focus placeholder="insert text..."/>
```

#### `:error`

```vue
<e-textarea name="demo" placeholder="insert text..." state="error"/>
```

#### `:success`

```vue
<e-textarea name="demo"/>
```

#### `:info`
```vue
<e-textarea name="demo"/>
```

<script>
  export default {};
</script>
```
