### e-picture

#### Picture element (sources)
```
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
      fallback: 'http://via.placeholder.com/180x150/0000ff',
      sources: {
        0: ['http://via.placeholder.com/180x150 1x', 'http://via.placeholder.com/360x300 2x'],
        sm: ['http://via.placeholder.com/350x150 1x', 'http://via.placeholder.com/700 2x'],
        800: ['http://via.placeholder.com/800x150 1x', 'http://via.placeholder.com/1600x300 2x'],
        1440: ['http://via.placeholder.com/1440x150 1x', 'http://via.placeholder.com/2880x300 2x'],
      },
    })
  };
</script>
```

#### Img element with srcset and sizes
```
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
      fallback: 'http://via.placeholder.com/180x150/0000ff',
      srcset: {
        200: 'http://via.placeholder.com/200x100',
        400: 'http://via.placeholder.com/400x200',
        800: 'http://via.placeholder.com/800x400',
        1400: 'http://via.placeholder.com/1400x700',
      },
      sizes: {
        1024: 1400,
        xs: 200,
        md: 400,
      },
    })
  };
</script>
```

#### Show as inline element
```
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
      fallback: 'http://via.placeholder.com/180x150/0000ff',
      sources: {
        0: ['http://via.placeholder.com/200 1x', 'http://via.placeholder.com/400 2x'],
      },
    })
  };
</script>
```

#### Preserve ratio
```
<template>
  <div>
    <e-picture
      :sizes="sizes"
      :srcset="srcset"
      :fallback="fallback"
      :ratio="800/800"
      alt="Show as inline element"/>
  </div>
</template>
<script>
  export default {
    name: 'example',
    data: () => ({
      fallback: 'http://via.placeholder.com/180x150/0000ff',
      srcset: {
        200: 'http://via.placeholder.com/100x50',
        400: 'http://via.placeholder.com/200x100',
        800: 'http://via.placeholder.com/300x150',
        1400: 'http://via.placeholder.com/600x300',
      },
      sizes: {
        1024: 600,
        xs: 100,
        md: 300,
      },
    })
  };
</script>
```

#### Preserve ratio inline
```
<template>
  <div>
    <e-picture
      :sizes="sizes"
      :srcset="srcset"
      :fallback="fallback"
      :ratio="800/800"
      :inline="true"
      alt="Show as inline element"/>
  </div>
</template>
<script>
  export default {
    name: 'example',
    data: () => ({
      fallback: 'http://via.placeholder.com/180x150/0000ff',
      srcset: {
        200: 'http://via.placeholder.com/100x50',
        400: 'http://via.placeholder.com/200x100',
        800: 'http://via.placeholder.com/300x150',
        1400: 'http://via.placeholder.com/600x300',
      },
      sizes: {
        1024: 600,
        xs: 100,
        md: 300,
      },
    })
  };
</script>
```
