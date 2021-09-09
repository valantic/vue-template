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
<c-notification :notification="mockData.messages.success" />
```

#### Error

```vue
<c-notification :notification="mockData.messages.error" />
```

#### Info

```vue
<c-notification :notification="mockData.messages.info" />
```
