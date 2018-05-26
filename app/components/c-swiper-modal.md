### Modal swiper

```vue
<c-swiper-modal :images="[{
    id_product_image: 1,
    external_url_large: 'http://localhost:8080/static/mock/dummy_square_1200--v1.jpg',
    external_url_small: 'http://localhost:8080/static/mock/dummy_square_500--v1.jpg',
    thumbs: [{
      absolute_path: 'http://localhost:8080/static/mock/dummy_square_500--v1.jpg',
      width: 500,
      height: 500,
    }, {
      absolute_path: 'http://localhost:8080/static/mock/dummy_square_800--v1.jpg',
      width: 800,
      height: 800,
    }, {
      absolute_path: 'http://localhost:8080/static/mock/dummy_square_1200--v1.jpg',
      width: 1200,
      height: 1200,
    }]
  }, {
    id_product_image: 1,
    external_url_large: 'http://via.placeholder.com/600x350',
    external_url_small: 'http://localhost:8080/static/mock/dummy_square_500--v2.jpg',
    thumbs: [{
      absolute_path: 'http://localhost:8080/static/mock/dummy_square_500--v2.jpg',
      width: 500,
      height: 500,
    }, {
      absolute_path: 'http://localhost:8080/static/mock/dummy_square_800--v2.jpg',
      width: 800,
      height: 800,
    }, {
      absolute_path: 'http://localhost:8080/static/mock/dummy_square_1200--v2.jpg',
      width: 1200,
      height: 1200,
    }]
  }, {
    id_product_image: 1,
    external_url_large: 'http://via.placeholder.com/600x350',
    external_url_small: 'http://via.placeholder.com/272x159',
    thumbs: [{
      absolute_path: 'http://via.placeholder.com/200x200',
      width: 200,
      height: 200,
    }, {
      absolute_path: 'http://via.placeholder.com/400x400',
      width: 400,
      height: 400,
    }, {
      absolute_path: 'http://via.placeholder.com/600x600',
      width: 600,
      height: 600,
    }]
  }]"/>
```
