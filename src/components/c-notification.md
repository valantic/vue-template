### Message schema

See Confluence page for "Messages" for more details.

````json
{
  "type": "String",
  "message": "String",
  "expire": "Boolean", 
  "selector": "String",
  "redirectUrl": "String"
}
````

### Status types

#### Success

```vue
<c-notification :notification="mockData.notification.success" />
```

#### Error

```vue
<c-notification :notification="mockData.notification.error" />
```

#### Info

```vue
<c-notification :notification="mockData.notification.info" />
```
