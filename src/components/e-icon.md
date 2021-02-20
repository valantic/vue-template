### Default (img tag)

```vue

<e-icon icon="styleguide-heart" />
```

### Custom size

```vue

<div>
<e-icon icon="styleguide-heart" size="50" />
</div>
<div>
<e-icon icon="styleguide-heart" width="50" height="50" />
</div>
<div>
<e-icon icon="valantic" width="160" height="35" />
</div>
```

### Limitations

The use of `defs` with id reference is not supported in most browsers. If an icon e.g. applies a background gradient, defined in `defs` by id, it won't be applied (e.g. fill="url(#background)"). the only fix for this issue seems to be to inline the definitions, the whole image or use it as a normal image.

```vue

<div>
  <h3>SVG Sprite</h3>
  <e-icon icon="play" width="50" />
  <h3>Should be</h3>
  <img src="/assets/icons.svg#play" width="50">
</div>
```

### Sprite types

SVG sprites can be created in different ways. The single images inside the SVG sprite can be defined as `stack of svg`, `symbol`, `def` or `view`. Each of this variants has it's advantage/downsides.

| Type        | CSS mask           | Inline |
|:------------- |:------------- |:---|
| view      | x (other sprites may be visible) | - |
| def      | -      | |
| symbol | -      | |
| stack | / (size fails)      | x |
