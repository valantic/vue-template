The styleguide will automatically create a status label for each component entry. It retrieves the status information from the `status` property on the component. `Not ready` is the default status if no status is defined on the component. This way we can make sure that new projects only use adjusted components.

### Component status example

```javascript
export default defineComponent({
  name: 'c-component',
  status: 1,
  // ...
}
```

### Available status

```vue
<ul style="margin: 0; padding: 0;">
  <li v-for="(value, key) in availableStatus" style="display: flex; padding-bottom: 10px;">
    <span style="margin-right: 20px">{{ key }}</span>
    <s-status :modifier="key">{{ value.text }}</s-status>
  </li>
</ul>
```

Additional status can be defined in `setup/plugins/styleguide.status-label.js`.
