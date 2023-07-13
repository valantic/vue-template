<template>
  <l-default>
    <div :class="b()" class="wysiwyg">
      <h1>WYSIWYG</h1>
      <h2>Text elements</h2>
      <h3>Level 3 title</h3>
      <h4>Level 4 title</h4>
      <h5>Level 5 title</h5>
      <h6>Level 6 title</h6>
      <p>
        Paragraph Lorem <strong>ipsum dolor</strong> sit amet, <i>consectetur adipisicing</i> elit.
        Beatae consequatur dignissimos<sup>1</sup> harum<sub>2</sub> maiores non, numquam optio placeat quisquam sint sit?
      </p>
      <a href="#">A link element</a>

      <hr>

      <h2>Table</h2>
      <table>
        <thead>
          <tr>
            <th>Column 1 header</th>
            <th>Column 2 header</th>
            <th>Column 3 header</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>Row Header</th>
            <td>Content 1</td>
            <td>Content 2</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <th>Footer Header</th>
            <td>Column 1 footer</td>
            <td>Column 2 footer</td>
          </tr>
        </tfoot>
      </table>

      <hr>

      <h2>Form elements</h2>
      <form>
        <fieldset>
          <legend>Input elements</legend>
          <label>
            Text:
            <input type="text" placeholder="Placeholder">
          </label>
          <label>
            <input type="checkbox">
            Checkbox
          </label>
          <label>
            <input type="radio">
            Radio
          </label>
        </fieldset>
        <select>
          <optgroup label="Group 1">
            <option value="1">
              Option 1
            </option>
            <option value="2">
              Option 2
            </option>
            <option value="3" disabled>
              Option 3
            </option>
          </optgroup>
          <optgroup label="Group 2">
            <option value="4">
              Option 4
            </option>
            <option value="5">
              Option 5
            </option>
          </optgroup>
        </select>
        <textarea></textarea>
        <button type="submit">
          Submit
        </button>
      </form>

      <hr>

      <h2>Other elements</h2>
      <pre>Some pre-formated content.</pre>

    </div>
  </l-default>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'r-wysiwyg',

    // components: {},

    // props: {},
    // data() {
    //   return {};
    // },

    // computed: {},
    // watch: {},

    // beforeCreate() {},
    // created() {},
    // beforeMount() {},
    // mounted() {},
    // beforeUpdate() {},
    // updated() {},
    // activated() {},
    // deactivated() {},
    // beforeUnmount() {},
    // unmounted() {},

    // methods: {},
    // render() {},
  });
</script>

<style lang="scss">
  .r-wysiwyg {
    // Add specific styles.
  }
</style>
