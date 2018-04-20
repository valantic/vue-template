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
Available font-size variables

**$font-size--10** <html><span style="font-size:10px;">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</span></html>

**$font-size--12** <html><span style="font-size:12px;">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</span></html>

**$font-size--14** <html><span style="font-size:14px;">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</span></html>

**$font-size--16** <html><span style="font-size:16px;">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</span></html>

**$font-size--18** <html><span style="font-size:18px;">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</span></html>

### Font weights
Available font-weight variables

**$font-weight--regular** <html><span style="font-weight: 400;">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</span></html>

**$font-weight--semi-bold** <html><span style="font-weight: 600;">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</span></html>

**$font-weight--bold** <html><span style="font-weight: 700;">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</span></html>

### Block elements

**H1** <html><h1>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</h1></html>

**H2** <html><h2>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</h2></html>

**H3** <html><h3>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</h3></html>

**H4** <html><h4>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</h4></html>

**H5** <html><h5>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</h5></html>

**H6** <html><h6>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</h6></html>

**p** <html><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</p></html>

### Links
```
<a href="#0">no class</a>
```
```
<a href="#0" class="e-link">with class e-link</a>
```
```
<a href="#0" class="e-link e-link--hover">with hover state</a>
```
