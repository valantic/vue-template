### Allowed z-index values
* modal
* front
* back

Use the media-mixin for media queries. See app/setup/scss/mixins/_z-index.scss
```scss
@mixin z-index($key)
```
Don't hardcode z-index values, use z-index mixin
```scss
.foo {
  @include z-index(modal)
}
```
