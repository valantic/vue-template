### Styles

#### Default
```vue
<template>
  <div>
    <c-multiselect :active-value="activeValues"
                   :items="items"
                   title="Title"
                   placeholder="Lorem ipsum"
                   facetName="foo"
                   @update="onMultiselectUpdate"
    />
    <pre>{{ itemsChecked }}</pre>
  </div>
</template>

<script>
  export default defineComponent({
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
      activeValues: ['value1', 'value3'],
    }),
    methods: {
      onMultiselectUpdate(component) {
        this.itemsChecked = component.checkedItems;
      }
    }
  });
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
  export default defineComponent({
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
  });
</script>
```

#### Hover
```vue
<template>
  <div>
    <c-multiselect :items="items"
                     title="Title"
                     placeholder="Lorem ipsum"
                     facetName="foo"
                     hover
                     @update="onMultiselectUpdate"
    />
    <pre>{{ itemsChecked }}</pre>
  </div>
</template>

<script>
  export default defineComponent({
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
       onMultiselectUpdate(component) {
         this.itemsChecked = component.checkedItems;
       }
     }
  });
</script>
```

#### Active
```vue
<template>
  <div>
    <c-multiselect :items="items"
                   title="Title"
                   placeholder="Lorem ipsum"
                   facetName="foo"
                   active
                   @update="onMultiselectUpdate"
    />
    <pre>{{ itemsChecked }}</pre>
  </div>
</template>

<script>
  export default defineComponent({
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
       onMultiselectUpdate(component) {
         this.itemsChecked = component.checkedItems;
       }
     }
  });
</script>
```


#### Error
```vue
<template>
  <div>
    <c-multiselect :items="items"
                     title="Title"
                     placeholder="Lorem ipsum"
                     facetName="foo"
                     state="error"
                     @update="onMultiselectUpdate"
    />
    <pre>{{ itemsChecked }}</pre>
  </div>
</template>

<script>
  export default defineComponent({
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
      onMultiselectUpdate(component) {
        this.itemsChecked = component.checkedItems;
      }
    }
  });
</script>
```

#### Success
```vue
<template>
  <div>
    <c-multiselect :items="items"
                   title="Title"
                   placeholder="Lorem ipsum"
                   facetName="foo"
                   state="success"
                   @update="onMultiselectUpdate"
    />
    <pre>{{ itemsChecked }}</pre>
  </div>
</template>

<script>
  export default defineComponent({
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
      onMultiselectUpdate(component) {
        this.itemsChecked = component.checkedItems;
      }
    }
  });
</script>
```
