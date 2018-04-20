Renders a `<button>` or `<a>` element with button style.

### Styles

#### Default

```vue
<e-button @click="onClick">Default</e-button>

```

#### Primary

```vue
<e-button primary @click="onClick">Primary</e-button>
```

### Width

#### full

```vue
<e-button width="full" @click="onClick">Full width</e-button>
```

#### auto

```vue
<e-button width="auto" @click="onClick">Auto width</e-button>
```

### ~~Negative~~

Not defined yet.

```vue
<e-button inverted @click="onClick">Inverted</e-button>
```

### Spacing

#### default

```vue
<e-button width="auto" @click="onClick">Spacing (default)</e-button>
```

#### 0

```vue
<e-button spacing="0" width="auto" @click="onClick">Spacing 0</e-button>
```

### Progress

#### Default

```vue
<e-button progress @click="onClick">Progress</e-button>
```

#### Primary

```vue
<e-button progress primary @click="onClick">Progress</e-button>
```

### Native states

#### :hover
```vue
<e-button hover @click="onClick">:hover</e-button>
```

#### :active
```vue
<e-button active @click="onClick">:active</e-button>
```

#### :focus
```vue
<e-button focus @click="onClick">:focus</e-button>
```

#### \[disabled\]
```vue
<e-button disabled @click="onClick">[disabled]</e-button>
```

#### primary:hover
```vue
<e-button hover primary @click="onClick">:hover</e-button>
```

#### primary:active
```vue
<e-button active primary @click="onClick">:active</e-button>
```

#### primary:focus
```vue
<e-button focus primary @click="onClick">:focus</e-button>
```

#### primary\[disabled\]

```vue
<e-button disabled primary @click="onClick">[disabled]</e-button>
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
<e-button @click="onClick">A button<br>with wrapping<br>text</e-button>
```
