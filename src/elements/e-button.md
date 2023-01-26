### Styles

#### Default

```vue
<e-button @click="onStyleguideClick">Default</e-button>

```

#### Primary

```vue
<e-button primary @click="onStyleguideClick">Primary</e-button>
```

### Width

#### full

```vue
<e-button width="full" @click="onStyleguideClick">Full width</e-button>
```

#### auto

```vue
<e-button width="auto" @click="onStyleguideClick">Auto width</e-button>
```

### Negative

Not defined yet.

```vue
<e-button negative @click="onStyleguideClick">Negative</e-button>
```

### Spacing

#### 500 (default)

```vue
<e-button width="auto" @click="onStyleguideClick">Spacing (default)</e-button>
```

#### 0

```vue
<e-button spacing="0" width="auto" @click="onStyleguideClick">Spacing 0</e-button>
```

### Progress

#### Default

```vue
<e-button progress @click="onStyleguideClick">Progress</e-button>
```

#### Primary

```vue
<e-button progress primary @click="onStyleguideClick">Progress</e-button>
```

### Native states

#### :hover
```vue
<e-button hover @click="onStyleguideClick">:hover</e-button>
```

#### :active
```vue
<e-button active @click="onStyleguideClick">:active</e-button>
```

#### :focus
```vue
<e-button focus @click="onStyleguideClick">:focus</e-button>
```

#### \[disabled\]
```vue
<e-button disabled @click="onStyleguideClick">[disabled]</e-button>
```

#### primary:hover
```vue
<e-button hover primary @click="onStyleguideClick">:hover</e-button>
```

#### primary:active
```vue
<e-button active primary @click="onStyleguideClick">:active</e-button>
```

#### primary:focus
```vue
<e-button focus primary @click="onStyleguideClick">:focus</e-button>
```

#### primary\[disabled\]

```vue
<e-button disabled primary @click="onStyleguideClick">[disabled]</e-button>
```

### Link

Creates a button like link.

#### Default

```vue
<e-button href="https://www.google.com" target="_blank">Link</e-button>
```

#### Primary

```vue
<e-button primary href="https://www.google.com" target="_blank">Link</e-button>
```

#### Width

```vue
<e-button width="full" href="https://www.google.com" target="_blank">Link</e-button>
```

### Cases

#### Multiline

```vue
<e-button @click="onStyleguideClick">A button<br />with wrapping<br />text</e-button>
```

#### Custom element
This option to overwrite the default "anchor" or "button" tag should get only used for edge cases where 
a button has to be inside another anchor tag or similar.

```vue
<e-button element="span" @click="onStyleguideClick">Custom element button</e-button>
```
