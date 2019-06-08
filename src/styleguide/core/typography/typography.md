
### SCSS mixins

Font. See app/setup/scss/mixins/_font.scss
```scss
@mixin font($font-size: $font-size--default, $line-height: null, $font-weight: null);
```

Font-size. See app/setup/scss/mixins/_font-size.scss
```scss
@mixin font-size($size-value: $font-size--default);
```

Line-height. See app/setup/scss/mixins/_line-height.scss
```scss
@mixin line-height($line-height: $line-height--default, $font-size: $font-size--default);
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

### Available font-size variables

**$font-size--10**
```
<span style="font-size:10px;">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</span>
```

**$font-size--12**
```
<span style="font-size:12px;">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</span>
```

**$font-size--14**
```
<span style="font-size:14px;">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</span>
```

**$font-size--16**
```
<span style="font-size:16px;">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</span>
```

**$font-size--18**
```
<span style="font-size:18px;">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</span>
```

### Available font-weight variables

**$font-weight--regular**
```
<span style="font-weight: 400;">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</span>
```

**$font-weight--semi-bold**
```
<span style="font-weight: 600;">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</span>
```

**$font-weight--bold**
```
<span style="font-weight: 700;">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</span>
```

### Block elements

**H1**
```
<h1>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</h1>
```

**H2**
```
<h2>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</h2>
```

**H3**
```
<h3>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</h3>
```

**H4**
```
<h4>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</h4>
```

**H5**
```
<h5>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</h5>
```

**H6**
```
<h6>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</h6>
```

**p**
```
<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</p>
```

### Links
```
<a href="#0">no class</a>
```

### Font Families

#### Source Sans Pro

##### Characters
```
<span style="word-wrap: break-word;">ABCČĆDĐEFGHIJKLMNOPQRSŠTUVWXYZŽabcčćdđefghijklmnopqrsštuvwxyzžАБВГҐДЂЕЁЄЖЗЅИІЇЙЈКЛЉМНЊОПРСТЋУЎФХЦЧЏШЩЪЫЬЭЮЯабвгґдђеёєжзѕиіїйјклљмнњопрстћуўфхцчџшщъыьэюяΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩαβγδεζηθικλμνξοπρστυφχψωάΆέΈέΉίϊΐΊόΌύΰϋΎΫὰάὲέὴήὶίὸόὺύὼώΏĂÂÊÔƠƯăâêôơư1234567890‘?’“!”(%)[#]{@}/&\<-+÷×=>®©$€£¥¢:;,.*</span>
```

##### Styles

###### $font-weight--regular

```
<span style="font-weight: 400;">Regular</span>
```

###### $font-weight--semi-bold

```
<span style="font-weight: 600;">Semi-Bold</span>
```

###### $font-weight--bold

```
<span style="font-weight: 700;">Bold</span>
```
