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
        images: this.$store.getters['product/images'],
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
        images:
        [
          {
             id: 1,
             altText: 'Just an image',
             fallback: '/static/mock/dummy_square_500--v1.jpg',
             srcset: {
               500: '/static/mock/dummy_square_500--v1.jpg',
               800: '/static/mock/dummy_square_800--v1.jpg',
               1200: '/static/mock/dummy_square_1200--v1.jpg',
             },
           }
         ]
        ,
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
        images:
        [
          {
            id: 1,
            altText: 'Just an image',
            fallback: '/static/mock/dummy_square_500--v1.jpg',
            srcset: {
              500: '/static/mock/dummy_square_500--v1.jpg',
              800: '/static/mock/dummy_square_800--v1.jpg',
              1200: '/static/mock/dummy_square_1200--v1.jpg',
            },
          },
          {
            id: 2,
            altText: 'Another image',
            fallback: '/static/mock/dummy_square_500--v2.jpg',
            srcset: {
              500: '/static/mock/dummy_square_500--v2.jpg',
              800: '/static/mock/dummy_square_800--v2.jpg',
              1200: '/static/mock/dummy_square_1200--v2.jpg',
            },
          },
          {
            id: 3,
            altText: 'Just an image',
            fallback: 'http://via.placeholder.com/300x300?text=fallback',
            srcset: {
              500: 'http://via.placeholder.com/500x500',
              800: 'http://via.placeholder.com/800x800',
              1200: 'http://via.placeholder.com/1200x1200',
            },
          },
         ]
        ,
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
        images: this.$store.getters['product/images']
      };
    },
  };
</script>
```
