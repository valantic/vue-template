### Global style definitions

#### Invisible elements for default users (only visible for screen readers)

For screen readers it's almost impossible to read a `<a href="#">Icon</a>` with a Icon as content. Also a `title` attribute is ignored if the `href` attribute isn't empty. So the best way is to add a hidden `<span>` element inside the anchor with a description what the link will do. 
To hide this span we use a global style class ".invisible".

```html
<a href="#">
  <span class="invisible">Schliessen von Element XY</span>
  <e-icon icon="close" />
</a>
```

```scss
.invisible {
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  white-space: nowrap;
  width: 1px;
}
```
