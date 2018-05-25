The theme can also be set via urlParam "theme" with the themeId as value.
For the test in IE you have to use the urlParam, the selector will not work on IE Browser.

Example:
```apache
https://....com/product-detail?theme=03
```

```vue
<s-theme-selector/>
```
