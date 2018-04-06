### Available breakpoints
See app/setup/scss/variables/_bootstrap.scss

| Name | Breakpoint |
|-----:|:-----------|
| xxs  | 0px        |
| xs   | 480px      |
| sm   | 768px      |
| md   | 1024px     |
| lg   | 1200px     |
| xl   | 1440px     |

### Media queries
Use the @mixin media for media queries. See app/setup/scss/mixins/_media.scss

```scss
@mixin media($up: null, $down: null, $media: all, $breakpoints: $grid-breakpoints)
```

Use @mixin media within styles, not the other way around

```scss
.foo {
  @include media(xxs, $media: screen) {
    display: block;
  }
  
  @include media(sm, md, screen) {
    display: inline;
  }
}
```
