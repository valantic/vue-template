<template>
  <l-vas-layout>
    <div
      :class="b()"
      class="wysiwyg"
    >
      <h1>h1.Headline</h1>
      <h2>h2.Headline</h2>
      <h3>h3.Headline</h3>
      <h4>h4.Headline</h4>
      <h5>h5.Headline</h5>
      <h6>h6.Headline</h6>
      <hr />

      <h6>Paragraph & text</h6>
      <p>&lt;sup&gt; The number should be displayed top right<sup>1</sup></p>
      <p>&lt;sub&gt; The number should be displayed bottom right<sub>1</sub></p>
      <p>&lt;a&gt; <a href="#">This is a link</a></p>
      <p>&lt;mark&gt; You can use the mark tag to <mark>highlight</mark> text.</p>
      <p>&lt;del&gt; <del>This line of text is meant to be treated as deleted text.</del></p>
      <p>&lt;s&gt; <s>This line of text is meant to be treated as no longer accurate.</s></p>
      <p>&lt;ins&gt; <ins>This line of text is meant to be treated as an addition to the document.</ins></p>
      <p>&lt;u&gt; <u>This line of text will render as underlined.</u></p>
      <p>&lt;small&gt; <small>This line of text is meant to be treated as fine print.</small></p>
      <p>&lt;strong&gt; <strong>This line rendered as bold text.</strong></p>
      <p>&lt;b&gt; <b>This line rendered as bold text.</b></p>
      <p>&lt;em&gt; <em>This line rendered as italicized text.</em></p>
      <p>&lt;abbr&gt; <abbr title="attribute">Abbreviations</abbr></p>
      <hr />

      <h6>Link</h6>
      <a href="#">A link element</a><br />
      <a
        href="#"
        disabled
        >A link element</a
      >
      <hr />

      <h6>Table</h6>
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
      <hr />

      <h6>Form elements</h6>
      <form>
        <fieldset>
          <legend>Input elements</legend>
          <label>
            Text:
            <input
              type="text"
              placeholder="Placeholder"
            />
          </label>
          <label>
            <input type="checkbox" />
            Checkbox
          </label>
          <label>
            <input type="radio" />
            Radio
          </label>
        </fieldset>
        <select>
          <optgroup label="Group 1">
            <option value="1">Option 1</option>
            <option value="2">Option 2</option>
            <option
              value="3"
              disabled
            >
              Option 3
            </option>
          </optgroup>
          <optgroup label="Group 2">
            <option value="4">Option 4</option>
            <option value="5">Option 5</option>
          </optgroup>
        </select>
        <textarea></textarea>
        <button type="submit">Submit</button>
      </form>

      <hr />

      <h6>Other elements</h6>
      <pre>Some pre-formated content.</pre>
    </div>
  </l-vas-layout>
</template>

<script lang="ts">
  import lVasLayout from '@valantic/vue-styleguide/src/layouts/l-vas-layout.vue';
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'r-wysiwyg',
    components: {
      lVasLayout,
    },

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
