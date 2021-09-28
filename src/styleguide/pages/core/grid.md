### Available breakpoints
See app/setup/scss/variables/_breakpoints.scss

| Name | Breakpoint |
|-----:|:-----------|
| xxs  | 0px        |
| xs   | 480px      |
| sm   | 768px      |
| md   | 1024px     |
| lg   | 1200px     |
| xl   | 1440px     |

### Media queries
Use the media-mixin for media queries. See app/setup/scss/mixins/_media.scss

```scss
@mixin media($up: null, $down: null, $media: all, $breakpoints: $breakpoints) {}
```

Use media-mixin within selectors, not the other way around

```scss
@use '<path/to>/setup/scss/mixins';

.foo {
  @include mixins.media(xxs, $media: screen) {
    display: block;
  }
  
  @include mixins.media(sm, md, screen) {
    display: inline;
  }
}
```
