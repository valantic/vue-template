To prevent layer conflicts use the @mixin z-index to define z-index.

See `app/setup/scss/mixins/_z-index.scss` for valid variables or to extend

```scss
@mixin z-index($key);
```

#### Example

```scss
@use '<path/to>/setup/scss/mixins';

.foo {
  @include mixins.z-index(modal);
}
```
