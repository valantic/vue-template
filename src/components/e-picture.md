### e-picture

#### Picture element (sources)
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
        0: ['https://via.placeholder.com/180x150/000000 1x', 'https://via.placeholder.com/360x300/000000 2x'],
        sm: ['https://via.placeholder.com/350x150/666666 1x', 'https://via.placeholder.com/700/666666 2x'],
        800: ['https://via.placeholder.com/800x150/aaaaaa 1x', 'https://via.placeholder.com/1600x300/aaaaaa 2x'],
        1440: ['https://via.placeholder.com/1440x150/dddddd 1x', 'https://via.placeholder.com/2880x300/dddddd 2x'],
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
    :srcset="srcset"
    :fallback="fallback"
    alt="Img element with srcset and sizes"/>
</template>

<script>
  export default {
    name: 'example',
    data: () => ({
      fallback: 'https://via.placeholder.com/180x150/0000ff',
      srcset: {
        200: 'https://via.placeholder.com/200x100',
        400: 'https://via.placeholder.com/400x200',
        800: 'https://via.placeholder.com/800x400',
        1400: 'https://via.placeholder.com/1400x700',
      },
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
      inline="true"
      alt="Show as inline element"/>
    <e-picture
      :sources="sources"
      :fallback="fallback"
      inline="true"
      alt="Show as inline element"/>
    <e-picture
      :sources="sources"
      :fallback="fallback"
      :inline="true"
      alt="Show as inline element"/>
  </div>
</template>

<script>
  export default {
    name: 'example',
    data: () => ({
      fallback: 'https://via.placeholder.com/180x150/0000ff',
      sources: {
        0: ['https://via.placeholder.com/200 1x', 'https://via.placeholder.com/400 2x'],
      },
    })
  };
</script>
```

#### Preserve aspect ratio (tinted background for visualisation)
```vue
<template>
  <div>
    <e-picture
      :sizes="sizes"
      :srcset="srcset"
      :fallback="fallback"
      :ratio="800/500"
      style="background: aliceblue;"
      alt="Show as inline element"/>
  </div>
</template>

<script>
  export default {
    name: 'example',
    data: () => ({
      fallback: 'https://via.placeholder.com/180x150/0000ff',
      srcset: {
        100: 'https://via.placeholder.com/100x50',
        400: 'https://via.placeholder.com/400x200',
        500: 'https://via.placeholder.com/500x250',
        600: 'https://via.placeholder.com/600x300',
      },
      sizes: {
        1200: 600,
        sm: 360,
        md: 500,
      },
    })
  };
</script>
```

#### Preserve aspect ratio inline (tinted background for visualisation)
```vue
<template>
  <div>
    <e-picture
      :sizes="sizes"
      :srcset="srcset"
      :fallback="fallback"
      :ratio="800/800"
      :inline="true"
      style="background: aliceblue;"
      alt="Show as inline element"/>
  </div>
</template>

<script>
  export default {
    name: 'example',
    data: () => ({
      fallback: 'https://via.placeholder.com/180x150/0000ff',
      srcset: {
          100: 'https://via.placeholder.com/100x50',
          400: 'https://via.placeholder.com/400x200',
          500: 'https://via.placeholder.com/500x250',
          600: 'https://via.placeholder.com/600x300',
        },
        sizes: {
          1200: 600,
          sm: 360,
          md: 500,
        },
    })
  };
</script>
```
