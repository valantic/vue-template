### Styles

#### Default
```vue
<template>
  <div>
    <c-multiselect
      v-model="checked"
      :items="items"
      title="Title"
      placeholder="Lorem ipsum"
      facetName="foo"
      @change="onMultiselectChange"
    />
    <pre>{{ itemsChecked }}</pre>
  </div>
</template>

<script>
  export default {
    name: 'example',
    data: () => ({
      items: [
        {
          value: 'value1',
          docCount: 2,
        },
        {
          value: 'value2',
          docCount: 2,
        },
        {
          value: 'value3',
          docCount: 3,
        },
        {
          value: 'value4',
          docCount: 2,
        },
      ],
      itemsChecked: [],
      checked: false
    }),
    methods: {
      onMultiselectChange(checked) {
        this.itemsChecked = checked;
      }
    }
  };
</script>
```

#### Disabled
```vue
<template>
  <div>
    <c-multiselect
      :items="items"
      title="Title"
      placeholder="Lorem ipsum"
      disabled
      facetName="foo"
    />
    <pre>{{ itemsChecked }}</pre>
  </div>
</template>

<script>
  export default {
    name: 'example',
    data: () => ({
      items: [
        {
          value: 'value1',
          docCount: 2,
        },
        {
          value: 'value2',
          docCount: 2,
        },
        {
          value: 'value3',
          docCount: 3,
        },
        {
          value: 'value4',
          docCount: 2,
        },
      ],
      itemsChecked: []
    }),
  };
</script>
```

#### Hover
```vue
<template>
  <div>
    <c-multiselect
      :items="items"
      title="Title"
      placeholder="Lorem ipsum"
      hover
      facetName="foo"
      @change="onMultiselectChange"
    />
    <pre>{{ itemsChecked }}</pre>
  </div>
</template>

<script>
  export default {
    name: 'example',
    data: () => ({
      items: [
        {
          value: 'value1',
          docCount: 2,
        },
        {
          value: 'value2',
          docCount: 2,
        },
        {
          value: 'value3',
          docCount: 3,
        },
        {
          value: 'value4',
          docCount: 4,
        },
        {
          value: 'value5',
          docCount: 5,
        },
        {
          value: 'value6',
          docCount: 2,
        },
      ],
      itemsChecked: []
    }),
    methods: {
      onMultiselectChange(checked) {
        this.itemsChecked = checked;
      }
    }
  };
</script>
```

#### Active
```vue
<template>
  <div>
    <c-multiselect
      :items="items"
      title="Title"
      placeholder="Lorem ipsum"
      active
      facetName="foo"
      @change="onMultiselectChange"
    />
    <pre>{{ itemsChecked }}</pre>
  </div>
</template>

<script>
  export default {
    name: 'example',
    data: () => ({
      items: [
        {
          value: 'value1',
          docCount: 2,
        },
        {
          value: 'value2',
          docCount: 2,
        },
        {
          value: 'value3',
          docCount: 3,
        },
        {
          value: 'value4',
          docCount: 2,
        },
        {
          value: 'value5',
          docCount: 3,
        },
        {
          value: 'value6',
          docCount: 2,
        },
        {
          value: 'value7',
          docCount: 3,
        },
        {
          value: 'value8',
          docCount: 2,
        },
      ],
      itemsChecked: []
    }),
    methods: {
      onMultiselectChange(checked) {
        this.itemsChecked = checked;
      }
    }
  };
</script>
```


#### Error
```vue
<template>
  <div>
    <c-multiselect
      :items="items"
      title="Title"
      placeholder="Lorem ipsum"
      state="error"
      facetName="foo"
      @change="onMultiselectChange"
    />
    <pre>{{ itemsChecked }}</pre>
  </div>
</template>

<script>
  export default {
    name: 'example',
    data: () => ({
      items: [
        {
          value: 'value1',
          docCount: 2,
        },
        {
          value: 'value2',
          docCount: 2,
        },
        {
          value: 'value3',
          docCount: 3,
        },
        {
          value: 'value4',
          docCount: 2,
        },
        {
          value: 'value5',
          docCount: 3,
        },
        {
          value: 'value6',
          docCount: 2,
        },
        {
          value: 'value7',
          docCount: 3,
        },
        {
          value: 'value8',
          docCount: 2,
        },
      ],
      itemsChecked: []
    }),
    methods: {
      onMultiselectChange(checked) {
        this.itemsChecked = checked;
      }
    }
  };
</script>
```

#### Success
```vue
<template>
  <div>
    <c-multiselect
      :items="items"
      title="Title"
      placeholder="Lorem ipsum"
      state="success"
      facetName="foo"
      @change="onMultiselectChange"
    />
    <pre>{{ itemsChecked }}</pre>
  </div>
</template>

<script>
  export default {
    name: 'example',
    data: () => ({
      items: [
        {
          value: 'value1',
          docCount: 2,
        },
        {
          value: 'value2',
          docCount: 2,
        },
        {
          value: 'value3',
          docCount: 3,
        },
        {
          value: 'value4',
          docCount: 2,
        },
      ],
      itemsChecked: []
    }),
    methods: {
      onMultiselectChange(checked) {
        this.itemsChecked = checked;
      }
    }
  };
</script>
```
