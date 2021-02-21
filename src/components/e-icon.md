### Default (img tag)

```vue

<e-icon icon="styleguide-heart" />
```

### Prop: size

The 'size' prop can be used to give a specific size to the icon. The combined or separate values will be used for width/height and the viewBox definition.

#### size="50"
```vue
<e-icon icon="styleguide-heart" size="50" />
```

#### size="160 35"
```vue
<e-icon icon="valantic" size="160 35" />
```

### Limitations

#### ID referenced definitions are not supported

The use of `defs` with id reference is not supported in most browsers. If an icon e.g. applies a background gradient, defined in `defs` by id, it won't be applied (e.g. fill="url(#background)"). the only fix for this issue seems to be to inline the definitions, the whole image or use it as a normal image.

See [this page](https://stackoverflow.com/questions/44235845/svg-use-and-gradients-as-fill) for more details and examples.

```vue
<div>
  <h3>Icons like this can't be used from the sprite file</h3>
  <img src="/assets/icons/play.svg" width="50">
</div>
```

#### CSS mask masks whole element

When you use the CSS mask, to place a colored SVG sprite image, the whole elements content will be masked to the icon. This means, that it's content most likely won't be visible at all.

#### Sprite format

There are different formats, to which a sprite may be created. Unfortunately all of them have some up- and downsides. Some of this formats can also be combined (e.g. `view` and `symbol`).

Format | CSS support | Use support | Stack visible | Notes
--- | --- | --- | --- | ---
Symbol | (X) | X | - | Only works with CSS if also `view` elements are added.
SVG | (X) | X | X | Using `viewBox` on the root element will result in invalid sizes when used in CSS.
view | X | - | X |
def | - | X | - | 

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

##### SVG stack

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
