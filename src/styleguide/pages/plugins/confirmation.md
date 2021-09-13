### confirmation

* The `<c-confirmation-modal />` has to be placed somewhere on the page for e.g. in the `<l-default />`
* In the .then() you can handle the confirmation functions
* In the .catch() you can handle the cancel functions

```vue
<template>
  <div>
    <!-- This has to be placed once somewhere on the page for e.g. in the <l-default/> -->
    <portal-target name="confirmation-modal" multiple />
    <c-confirmation-modal />
    
    <!-- Trigger -->
    <e-button @click="onClick">
      Do something
    </e-button>
  </div>
</template>
<script>
export default {
  methods: {
    onClick() {
      this.$confirmation.showConfirmation({
        title: 'Example Title',
        text: 'Are you sure you wan\'t to do this?',
        confirmText: 'Confirm',
        cancelText: 'Cancel',
      }).then(() => {
        alert('<h1>confirmed!</h1>')
      }).catch(() => {
        alert('cancelled!')
      });
    }
  }
}
</script>
```
