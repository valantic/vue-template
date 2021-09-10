### Default (img tag)

```vue
<e-icon icon="styleguide-heart" alt="Icon of a heart" />
```

### Prop: size

The 'size' prop can be used to give a specific size to the icon. The combined or separate values will be used for width/height and the viewBox definition.

#### size="50"
```vue
<e-icon icon="styleguide-heart" size="50" alt="Icon of a heart" />
```

#### size="160 35"
```vue
<e-icon icon="styleguide-heart" size="160 35" alt="Icon of a heart" />
```

### Using the sprite

#### In HTML

##### As svg use

If you use the `<e-icon>` component, this approach will be applied. IE11 requires a polyfill (svg4everyone) for this to work.

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" width="80" height="80">
  <use xlink:href="sprite.svg#icon"></use>
</svg>
```

Use as

```xml
<e-icon icon="icon" size="50" alt="A random icon" />
```

##### As image

To use as an image you can either define `:inline="false"` on the `e-icon` or use an image as normal, pointing to the icon inside the sprite.

```xml
<e-icon icon="styleguide-heart" :inline="false" alt="Icon of a heart" />
OR
<img src="sprite.svg#styleguide-heart" alt="An icon">
```

#### In CSS

##### As background image

This method does not allow to change the color of the icon. You may need to add an additional slice.

```css
.icon {
  background: url('sprite.svg#icon') center center / cover;
}
```

##### As mask

This method does allow you to change the color of the icon, but this won't work in older browsers, and you need a separate element to apply it, because anything inside the element will be masked.

```css
.icon {
  mask: url('sprite.svg#icon') center center / cover;
  background-color: blue;
}
```

Use as

```scss
.icon {
  @include icon(icon);
}
```


### Limitations

#### ID referenced definitions are not supported

When using the `<use>` solution, the use of `defs` with id reference is not supported in most browsers. If an icon e.g. applies a background gradient, defined in `defs` by id, it won't be applied (e.g. fill="url(#background)"). the only fix for this issue seems to be to inline the definitions, the whole image or use it as a normal image.

See [this page](https://stackoverflow.com/questions/44235845/svg-use-and-gradients-as-fill) for more details and examples.

```vue
<div>
  <h3>Fails as icon</h3>
  <e-icon icon="play" size="80" alt="Play button icon" />
  <h3>Works as image</h3>
  <e-icon icon="play" :inline="false" size="80" alt="Play button icon" />
</div>
```

#### CSS mask masks whole element

When you use the CSS mask, to place a colored SVG sprite image, the whole elements content will be masked to the icon. This means, that it's content most likely won't be visible at all.

#### Sprite format

There are different formats, to which a sprite may be created. Unfortunately all of them have some up- and downsides. Some of these formats can also be combined (e.g. `view` and `symbol`).

Format | CSS support | Use support | Stack visible | Individual size (as src) | Notes
--- | --- | --- | --- | --- | ---
symbol | (X) | X | - | ? | Only works with CSS if also `view` elements are added.
stack | (X) | X | X | - | Using `viewBox` on the root element will result in invalid sizes when used in CSS. The width and height of the stack is determined by the biggest icon.
view | X | - | X | X |
def | - | X | - | ? | 

##### Symbol

Every svg icon becomes a `symbol` in the sprite file. The single slices are visible if displayed in content.

```svg
<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <symbol viewBox="0 0 22 22" id="arrow--down" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M10.9 14.97l7.778-7.778a1 1 0 011.414 1.415l-8.485 8.485a1 1 0 01-1.415 0L1.707 8.607a1 1 0 111.414-1.415l7.778 7.779z"
      fill="currentColor" fill-rule="evenodd"/>
  </symbol>
</svg>
```

##### stack (of SVG)

Creates a sprite containing `svg` definitions.

```svg
<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <style>:root>svg{display:none}:root>svg:target{display:block}</style>
  <svg viewBox="0 0 22 22" id="arrow--down" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M10.9 14.97l7.778-7.778a1 1 0 011.414 1.415l-8.485 8.485a1 1 0 01-1.415 0L1.707 8.607a1 1 0 111.414-1.415l7.778 7.779z"
      fill="currentColor" fill-rule="evenodd"/>
  </svg>
</svg>
```

##### View

Instead of adding the id to each svg slice, additional `view`s are added, which then define "windows" for each slice.

```svg
<?xml version="1.0" encoding="UTF-8"?>
<svg width="160" height="79" viewBox="0 0 160 79" xmlns="http://www.w3.org/2000/svg"
     xmlns:xlink="http://www.w3.org/1999/xlink">
  <view id="arrow--down" viewBox="0 35 22 22"/>
  <svg width="22" height="22" y="35" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M10.9 14.97l7.778-7.778a1 1 0 011.414 1.415l-8.485 8.485a1 1 0 01-1.415 0L1.707 8.607a1 1 0 111.414-1.415l7.778 7.779z"
      fill="currentColor" fill-rule="evenodd"/>
  </svg>
</svg>
```

#### Defs

Wraps the sprite slices in a `def` element. The svg definitions inside `def` won't be visible if the svg is placed inside the element.

````svg
<svg width="0" height="0" style="position:absolute">
  <defs>
    <svg viewBox="0 0 22 22" id="arrow--down" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M10.9 14.97l7.778-7.778a1 1 0 011.414 1.415l-8.485 8.485a1 1 0 01-1.415 0L1.707 8.607a1 1 0 111.414-1.415l7.778 7.779z"
        fill="currentColor" fill-rule="evenodd"/>
    </svg>
  </defs>
</svg>
````

### Loader findings

In general a webpack loader would probably only make sense if some SVG files could be excluded from the sprite (e.g. because incompatible with sprites because using internal reference). The loaders I checked did not support this feature.

#### svg-sprite-loader

Tried to use this webpack loader. Unfortunately, the loader failed to replace urls in CSS.

#### extract-svg-sprite-webpack-plugin

Was unable to get it to work in JS context, because url to file was not available.
