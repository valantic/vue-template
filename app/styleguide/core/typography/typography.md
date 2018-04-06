### Font family
"https://fonts.google.com/specimen/Source+Sans+Pro"

### SCSS mixins

Font. See app/setup/scss/mixins/_font.scss
```scss
@mixin font($font-size: $font-size--default, $line-height: null, $font-weight: null)
```

Font-size. See app/setup/scss/mixins/_font-size.scss
```scss
@mixin font-size($size-value: $font-size--default)
```

Line-height. See app/setup/scss/mixins/_line-height.scss
```scss
@mixin line-height($line-height: $line-height--default, $font-size: $font-size--default)
```

Please make sure that you use the defined SCSS mixins for font, font-size and line-height.  This way we can make sure that all of the font units are relative (rem/em). Use mixins within styles, not the other way around

```scss
.foo {
  @include media(xxs, $media: screen) {
    display: block;
  }
  
  @include font-size(1em) {
    color: #ff0000;
  }
}
```

### Font sizes

```html
$font-size--10
$font-size--12
$font-size--14
$font-size--16
$font-size--18
```

### Font weights

```html
$font-weight--regular
$font-weight--semi-bold
$font-weight--bold
```
