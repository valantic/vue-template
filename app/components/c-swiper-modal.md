### Modal swiper

```vue
<c-swiper-modal :images="[
{
  fallback: '/static/mock/dummy_square_500--v1.jpg',
  srcset: {
    500: '/static/mock/dummy_square_500--v1.jpg',
    800: '/static/mock/dummy_square_800--v1.jpg',
    1200: '/static/mock/dummy_square_1200--v1.jpg'
  },
  alt: ''
},
{
  fallback: '/static/mock/dummy_square_500--v2.jpg',
  srcset: {
    500: '/static/mock/dummy_square_500--v2.jpg',
    800: '/static/mock/dummy_square_800--v2.jpg',
    1200: '/static/mock/dummy_square_1200--v2.jpg'
  },
  alt: ''
},
{
  fallback: 'http://via.placeholder.com/272x159',
  srcset: {
    200: 'http://via.placeholder.com/200x200',
    400: 'http://via.placeholder.com/400x400',
    600: 'http://via.placeholder.com/600x600'
  },
  alt: ''
}]"/>
```
