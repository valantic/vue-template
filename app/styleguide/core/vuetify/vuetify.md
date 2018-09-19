### Vuetify
 
Vuetify is a component library with default styling. We currently use it for the c-date-picker component.
See http://vuetifyjs.com/ for details.

Vuetify needs one root element on the page to work. This can either be the `v-app` component or you can add an attribute called `data-app` to one element.

We use the [a-la-carte](https://vuetifyjs.com/en/guides/a-la-carte) method of vuetify to import only components which are needed by our project. Therefore we need some specific loaders in the webpack configuration. (See package.md)

#### Example of an import

If you want to use a component (e.g. date-picker) and some layout features (v-grid) of Vuetify you can import them like this:

```js static
import * as VDatePicker from 'vuetify/es5/components/VDatePicker';
import * as VGrid from 'vuetify/es5/components/VGrid';

export default {
  components: {
    ...VDatePicker,
    ...VGrid,
  },
}
```
