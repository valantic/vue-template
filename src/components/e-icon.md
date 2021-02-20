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

```vue
<div>
  <h3>Icons like this can't be used from the sprite file</h3>
  <img src="/assets/icons/play.svg" width="50">
</div>
```

#### CSS mask masks whole element

When you use the CSS mask, to place a colored SVG sprite image, the whole elements content will be masked to the icon. This means, that it's content most likely won't be visible at all.
