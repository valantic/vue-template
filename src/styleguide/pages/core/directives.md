### v-pimcore

Auto-generates attributes for the Pimcore generator. Note, that the directive will be removed upon build.

#### Supported element types (`v-pimcore:<elementType>`)

- `editable` Marks the related element as editable.
- `areabrick` Creates a Pimcore areabrick.
- `snippet` Creates a Pimcore snippet.
- `disabled` Disables the element in Pimcore live edit.

<br>

#### `v-pimcore:editable="[<editable>, <identifier>[, <restriction>]]"`

Note: this is also the default for this directive. So you may drop the `editable` argument.

**Requires** the definition of `editable` and `identifier` as an array. `restriction` is optional.

- `editable` Defines the type of the editable. See [Pimcore documentation](https://pimcore.com/docs/6.x/Development_Documentation/Documents/Editables/index.html#page_List-of-Editables) for available types.
- `identifier` Sets the Pimcore identifier for the related data field.
- `restriction` Allows to set restrictions for relations. See [Pimcore documentation](https://pimcore.com/docs/6.x/Development_Documentation/Documents/Editables/Relation_(Many-To-One).html#page_Using-Restriction) for available options.

```vue
<template>
  <div v-pimcore="['input', 'title']">
    Inspect me to see the added attributes.
  </div>
</template>
```

```vue
<template>
  <div v-pimcore="['relations', 'title', restriction]">
    Inspect me to see the added attributes. I also have restrictions.
  </div>
</template>

<script>
export default {
  data() {
    return {
      restriction: {
        types: ["object"],
        subtypes: {
            object: ["object"],
        },
        classes: ["Product"]
      }
    }   
  }
}
</script>
```

```vue
<template>
  <div v-pimcore="['input', 'title']">
    Inspect me to see the added attributes. I don't use the argument.
  </div>
</template>
```

<br>

#### `v-pimcore-areabrick="'<name>'"`

**Requires** the definition of an area brick name.

- `name` The name that will be used for the Pimcore area brick. Only `[a-z_]` are allowed.

```vue
<template>
  <div v-pimcore-areabrick="'text_and_image'">
    Inspect me to see the added attributes.
  </div>
</template>
```

<br>

#### `v-pimcore-snippet="'<name>'"`

Marks the related element as snippet content.

- `name` The name that will be used for the Pimcore snippet. Only `[a-z_]` are allowed.

```vue
<template>
  <div v-pimcore-snippet="'footer'">
    Inspect me to see the added attributes.
  </div>
</template>
```
