### Allowed z-index values
* modal
* front
* back

Use the @mixin z-index to define z-index. See app/setup/scss/mixins/_z-index.scss

```scss
@mixin z-index($key)
```

Example

```scss
.foo {
  @include z-index(modal)
}
```
