#### default options

```vue
<template>
  <div class="demo">
    <div style="max-width: 400px;">
      <c-swiper-gallery :images="mockData.dummyImages"/>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'swiper',
  };
</script>
```

#### including videos

```vue
<template>
  <div class="demo">
    <div style="max-width: 400px;">
      <c-swiper-gallery :images="mockData.dummyImages" :videos="mockData.dummyVideos" />
    </div>
  </div>
</template>

<script>
  export default {
    name: 'swiper',
  };
</script>
```

#### single picture

```vue
<template>
  <div class="demo">
    <div style="max-width: 400px;">
      <c-swiper-gallery :images="mockData.dummyImages"/>
    </div>
  </div>

</template>

<script>
  export default {
    name: 'swiper2',
  };
</script>
```

#### less than seven pictures

```vue
<template>
  <div class="demo">
    <div style="max-width: 400px;">
      <c-swiper-gallery :images="mockData.dummyImages"/>
    </div>
  </div>

</template>

<script>
  export default {
    name: 'swiper3',
  };
</script>
```

#### custom options

```vue
<template>
  <div class="demo">
    <div style="max-width: 400px;">
      <c-swiper-gallery :images="mockData.dummyImages" :options="customOptions"/>
    </div>
  </div>

</template>

<script>
  export default {
    name: 'swiper4',
    data() {
      return {
        customOptions: {
          slidesPerView: 2,
          speed: 500
        },
      };
    },
  };
</script>
```
