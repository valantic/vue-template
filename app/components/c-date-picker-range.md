### String dates
The format needs to be an ISO 8601 string (YYYY-MM-DD).

```vue
<template>
  <div>
    <c-date-picker-range :start="start" 
                         :end="end" 
                         @updateStartDate="start = $event.date" 
                         @updateEndDate="end = $event.date" />
    <br />
    <p>
      Start: <b>{{ start }}</b>
    </p>
    <p>
      End: <b>{{ end }}</b>
    </p>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        start: '2017-12-18',
        end: '2017-12-23',
      };
    },
  };
</script>
```


### No start values

```vue
<c-date-picker-range />
```

### With label

```vue
<c-date-picker-range label-name="Label" label-position="left" />
```
