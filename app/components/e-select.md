### Default

```vue
<template>
  <div>
    <e-select v-model="demo" :options-list="optionsList" name="demo-select"/>
    <div v-if="demo" class="spacing--top-15">
      <p>{{ demo }}</p>
    </div>
  </div>
</template>

<script>
  export default {
    data: () => ({
      demo: 'option-3',
      optionsList: [
        {
          value: 'option-1',
          label: 'Dies ist eine etwas längere option',
        },
        {
          value: 'option-2',
          label: 'Option 2',
        },
        {
          value: 'option-3',
          label: 'Option 3',
        },
      ]
    })
  };
</script>
```

#### `:disabled`
```vue
<template>
  <e-select v-model="demo" disabled :options-list="optionsList" name="demo-select"/>
</template>

<script>
  export default {
    data: () => ({
      demo: 'option-1',
      optionsList: [
        {
          value: 'option-1',
          label: 'Option 1',
        }
      ]
    })
  };
</script>
```

#### `:hover`

```vue
<template>
  <div>
    <e-select hover v-model="demo" :options-list="optionsList" name="demo-select"/>
    <div v-if="demo" class="spacing--top-15">
      <p>{{ demo }}</p>
    </div>
  </div>
</template>

<script>
  export default {
    data: () => ({
      demo: 'option-3',
      optionsList: [
        {
          value: 'option-1',
          label: 'Dies ist eine etwas längere option',
        },
        {
          value: 'option-2',
          label: 'Option 2',
        },
        {
          value: 'option-3',
          label: 'Option 3',
        },
      ]
    })
  };
</script>
```

#### `:focus`

```vue
<template>
  <div>
    <e-select focus v-model="demo" :options-list="optionsList" name="demo-select"/>
    <div v-if="demo" class="spacing--top-15">
      <p>{{ demo }}</p>
    </div>
  </div>
</template>

<script>
  export default {
    data: () => ({
      demo: 'option-3',
      optionsList: [
        {
          value: 'option-1',
          label: 'Dies ist eine etwas längere option',
        },
        {
          value: 'option-2',
          label: 'Option 2',
        },
        {
          value: 'option-3',
          label: 'Option 3',
        },
      ]
    })
  };
</script>
```

#### state: `error`

```vue
<template>
  <div>
    <e-select state="error" v-model="demo" :options-list="optionsList" name="demo-select"/>
    <div v-if="demo" class="spacing--top-15">
      <p>{{ demo }}</p>
    </div>
  </div>
</template>

<script>
  export default {
    data: () => ({
      demo: 'option-3',
      optionsList: [
        {
          value: 'option-1',
          label: 'Dies ist eine etwas längere option',
        },
        {
          value: 'option-2',
          label: 'Option 2',
        },
        {
          value: 'option-3',
          label: 'Option 3',
        },
      ]
    })
  };
</script>
```

#### state: `success`

```vue
<template>
  <div>
    <e-select state="success" v-model="demo" :options-list="optionsList" name="demo-select"/>
    <div v-if="demo" class="spacing--top-15">
      <p>{{ demo }}</p>
    </div>
  </div>
</template>

<script>
  export default {
    data: () => ({
      demo: 'option-3',
      optionsList: [
        {
          value: 'option-1',
          label: 'Dies ist eine etwas längere option',
        },
        {
          value: 'option-2',
          label: 'Option 2',
        },
        {
          value: 'option-3',
          label: 'Option 3',
        },
      ]
    })
  };
</script>
```
