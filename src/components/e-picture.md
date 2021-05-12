### e-picture

#### Picture element (sources)

Use `(min-width: ??px)` in descending order as key. `srcset` can be String or Array of Strings. `fallback` is used on smallest screens.

```vue
<template>
  <e-picture
    :sources="sources"
    :fallback="fallback"
    alt="Picture element (sources)"/>
</template>

<script>
  export default {
    name: 'example',
    data: () => ({
      fallback: 'https://via.placeholder.com/180x150',
      sources: {
        '(min-width: 1440px)': ['https://via.placeholder.com/1440x150/dddddd 1x', 'https://via.placeholder.com/2880x300/dddddd 2x'],
        '(min-width: 1200px)': ['https://via.placeholder.com/800x150/aaaaaa 1x', 'https://via.placeholder.com/1600x300/aaaaaa 2x'],
        '(min-width: 768px)': ['https://via.placeholder.com/350x150/666666 1x', 'https://via.placeholder.com/700/666666 2x'],
        '(min-width: 480px)': ['https://via.placeholder.com/180x150/000000 1x', 'https://via.placeholder.com/360x300/000000 2x'],
      },
    })
  };
</script>
```

#### Img element with srcset and sizes

*Note: lower resolutions are not loaded, if a higher resolution has already been requested by the browser. Reload page to test smaller screens. When scaling up, the higher resolution should be requested.*

```vue
<template>
  <e-picture
    :sizes="sizes"
    :srcset="image.srcset"
    :fallback="image.fallback"
    alt="Img element with srcset and sizes"/>
</template>

<script>
  import image from '@/styleguide/mock-data/data-object/srcset-image';
  
  export default {
    name: 'example',
    data: () => ({
      image,
      sizes: {
        1440: 1400,
        xs: 200,
        sm: 400,
        md: 800,
      },
    })
  };
</script>
```

#### Show as inline element
```vue
<template>
  <div>
    <e-picture
      :sources="sources"
      :fallback="fallback"
      alt="Show as inline element"
      inline
    />
    <e-picture
      :sources="sources"
      :fallback="fallback"
      alt="Show as inline element"
      inline
    />
    <e-picture
      :sources="sources"
      :fallback="fallback"
      alt="Show as inline element"
      inline
    />
  </div>
</template>

<script>
  export default {
    name: 'example',
    data: () => ({
      fallback: 'https://via.placeholder.com/180x150/0000ff',
      sources: {
        '(min-width: 1440px)': ['https://via.placeholder.com/200 1x', 'https://via.placeholder.com/400 2x'],
      },
    })
  };
</script>
```

#### Preserve aspect ratio
```vue
<template>
  <div>
    <e-picture
      :sizes="sizes"
      :srcset="image.srcset"
      :fallback="image.fallback"
      :ratio="800/500"
      alt="Show as inline element"/>
  </div>
</template>

<script>
  import image from '@/styleguide/mock-data/data-object/srcset-image';

  export default {
    name: 'example',
    data: () => ({
      image,
      sizes: {
        1200: 600,
        sm: 360,
        md: 500,
      },
    })
  };
</script>
```

#### Preserve aspect ratio inline
```vue
<template>
  <div>
    <e-picture
      :sizes="sizes"
      :srcset="image.srcset"
      :fallback="image.fallback"
      :ratio="800/500"
      alt="Show as inline element"
      inline
    />
  </div>
</template>

<script>
  import image from '@/styleguide/mock-data/data-object/srcset-image';

  export default {
    name: 'example',
    data: () => ({
      image,
        sizes: {
          1200: 600,
          sm: 360,
          md: 500,
        },
    })
  };
</script>
```
