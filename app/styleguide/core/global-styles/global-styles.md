### Global style definitions

#### Invisible elements for default users (only visible for screen readers)

For screen readers it's almost impossible to read a `<a href="#">Icon</a>` with a Icon as content. Also a `title` attribute is ignored if the `href` attribute isn't empty. So the best way is to add a hidden `<span>` element inside the anchor with a description what the link will do. 
To hide this span we use a global style class ".invisible".

```html
<a href="#">
  <span class="invisible">Schliessen von Element XY</span>
  <e-icon icon="i-close" />
</a>
```

```scss
.invisible {
  position: absolute;
  overflow: hidden;
  height: 0;
  width: 0;
  top: 0;
}
```