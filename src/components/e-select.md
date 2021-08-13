### States

#### State: default

```vue
<template>
  <div>
    <e-select v-model="demo" :options="optionsList" name="demo-select"/>
    <div v-if="demo" class="spacing--top-15">
      <p>{{ demo }}</p>
    </div>
  </div>
</template>

<script>
  export default defineComponent({
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
  });
</script>
```

#### State: `:disabled`
```vue
<template>
  <e-select v-model="demo" disabled :options="optionsList" name="demo-select"/>
</template>

<script>
  export default defineComponent({
    data: () => ({
      demo: 'option-1',
      optionsList: [
        {
          value: 'option-1',
          label: 'Option 1',
        }
      ]
    })
  });
</script>
```

#### State: `:hover`

```vue
<template>
  <div>
    <e-select hover v-model="demo" :options="optionsList" name="demo-select"/>
    <div v-if="demo" class="spacing--top-15">
      <p>{{ demo }}</p>
    </div>
  </div>
</template>

<script>
  export default defineComponent({
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
  });
</script>
```

#### State: `:focus`

```vue
<template>
  <div>
    <e-select focus v-model="demo" :options="optionsList" name="demo-select"/>
    <div v-if="demo" class="spacing--top-15">
      <p>{{ demo }}</p>
    </div>
  </div>
</template>

<script>
  export default defineComponent({
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
  });
</script>
```

#### State: `error`

```vue
<template>
  <div>
    <e-select state="error" v-model="demo" :options="optionsList" name="demo-select"/>
    <div v-if="demo" class="spacing--top-15">
      <p>{{ demo }}</p>
    </div>
  </div>
</template>

<script>
  export default defineComponent({
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
  });
</script>
```

#### State: `success`

```vue
<template>
  <div>
    <e-select state="success" v-model="demo" :options="optionsList" name="demo-select"/>
    <div v-if="demo" class="spacing--top-15">
      <p>{{ demo }}</p>
    </div>
  </div>
</template>

<script>
  export default defineComponent({
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
  });
</script>
```

### Customized value and label fields

```vue
<template>
  <div>
    <e-select
      v-model="demo"
      :options="optionsList"
      value-field="code"
      label-field="text"
      name="demo-select"/>
    <div v-if="demo" class="spacing--top-15">
      <p>{{ demo }}</p>
    </div>
  </div>
</template>

<script>
  export default defineComponent({
    data: () => ({
      demo: 'option-3',
      optionsList: [
        {
          code: 'option-1',
          text: 'Dies ist eine etwas längere option',
        },
        {
          code: 'option-2',
          text: 'Option 2',
        },
        {
          code: 'option-3',
          text: 'Option 3',
        },
      ]
    })
  });
</script>
```

### Progress

```vue
<template>
  <div>
    <e-select v-model="demo" :options="optionsList" name="demo-select" progress />
    <div v-if="demo" class="spacing--top-15">
      <p>{{ demo }}</p>
    </div>
  </div>
</template>

<script>
  export default defineComponent({
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
  });
</script>
```
