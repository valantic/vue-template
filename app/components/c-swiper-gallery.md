#### default options

```vue
<template>
  <div class="demo">
    <div style="max-width: 400px;">
      <c-swiper-gallery :images="images"/>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'swiper',
    data() {
      return {
        images: this.$store.getters['product/product'].images,
      };
    },
  };
</script>
```

#### single picture

```vue
<template>
  <div class="demo">
    <div style="max-width: 400px;">
      <c-swiper-gallery :images="images"/>
    </div>
  </div>

</template>

<script>
  export default {
    name: 'swiper2',
    data() {
      return {
        images: this.$store.getters['product/product'].images.slice(0,1),
      };
    },
  };
</script>
```

#### less than seven pictures

```vue
<template>
  <div class="demo">
    <div style="max-width: 400px;">
      <c-swiper-gallery :images="images"/>
    </div>
  </div>

</template>

<script>
  export default {
    name: 'swiper3',
    data() {
      return {
        images: this.$store.getters['product/product'].images.slice(0,4),
      };
    },
  };
</script>
```

#### custom options

```vue
<template>
  <div class="demo">
    <div style="max-width: 400px;">
      <c-swiper-gallery :images="images" :options="customOptions"/>
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
        images: this.$store.getters['product/product'].images,
      };
    },
  };
</script>
```
