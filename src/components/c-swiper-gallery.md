#### default options

```vue
<template>
  <div class="demo">
    <div style="max-width: 400px;">
      <c-swiper-gallery :images="mockData.dummyImages"/>
    </div>
  </div>
</template>
```

#### including videos

```vue
<template>
  <div class="demo">
    <div style="max-width: 400px;">
      <c-swiper-gallery :images="mockData.dummyImages.slice(0, 1)" :videos="mockData.dummyVideos" />
    </div>
  </div>
</template>
```

#### single picture

```vue
<template>
  <div class="demo">
    <div style="max-width: 400px;">
      <c-swiper-gallery :images="[mockData.dummyImages[0]]"/>
    </div>
  </div>
</template>
```

#### less than seven pictures

```vue
<template>
  <div class="demo">
    <div style="max-width: 400px;">
      <c-swiper-gallery :images="mockData.dummyImages.slice(0, 5)"/>
    </div>
  </div>
</template>
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
