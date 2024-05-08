<template>
  <e-checkbox
    v-model="enabled"
    variant="toggle"
    name="html-validation"
    value
  >
    HTML validation
  </e-checkbox>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import eCheckbox from '@/elements/e-checkbox.vue';

  type Data = {
    /**
     * Determines if the HTML validation styles should be applied.
     */
    enabled: boolean;
  };

  /**
   * Adds a toggle to en-/disable CSS driven HTML validation.
   */
  export default defineComponent({
    name: 's-html-validation',

    components: {
      eCheckbox,
    },
    // mixins: [],

    // props: {},
    data(): Data {
      return {
        enabled: true,
      };
    },

    // computed: {},
    watch: {
      enabled: {
        immediate: true,
        handler(enabled: boolean) {
          document.body.classList.toggle('s-html-validation--enabled', enabled);
        },
      },
    },

    // beforeCreate() {},
    // created() {},
    // beforeMount() {},
    // mounted() {},
    // beforeUpdate() {},
    // updated() {},
    // activated() {},
    // deactivated() {},
    // beforeDestroy() {},
    // destroyed() {},

    // methods: {},
    // render() {},
  });
</script>

<style lang="scss">
  @use '../../setup/scss/variables';

  // stylelint-disable max-line-length

  .s-html-validation--enabled {
    @mixin html-validator-warning($message: '') {
      $red: #ff0000;
      $black: #000000;

      outline: 5px solid $red;

      &::before {
        position: absolute;
        z-index: 1000;
        content: $message;
        max-width: 200px;
        padding: 2px variables.$spacing--5;
        border: 1px solid $red;
        background: lighten($red, 40%);
        color: $black;
        font-size: 0.8rem;
      }
    }

    a {
      button {
        @include html-validator-warning('The element <button> must not appear as a descendant of the <a> element.');
      }
    }

    button {
      &:not([aria-label]):not([aria-labelledby]):empty {
        @include html-validator-warning('Ensure that <button> has meaningful content or is labelled appropriately.');
      }

      h1,
      h2,
      h3,
      h4,
      h5,
      h6,
      label,
      div {
        @include html-validator-warning('Element <div> not allowed as child of element <button>.');
      }
    }

    img {
      &[sizes^=','] {
        @include html-validator-warning(
          'Bad value for attribute "sizes" on element <img>: Starts with empty source size.'
        );
      }
    }

    label {
      button,
      input,
      meter,
      output,
      progress,
      select,
      textarea {
        &[aria-label],
        &:nth-of-type(2),
        & ~ button,
        & ~ input,
        & ~ meter,
        & ~ output,
        & ~ progress,
        & ~ select,
        & ~ textarea,
        & ~ * button,
        & ~ * input,
        & ~ * meter,
        & ~ * output,
        & ~ * progress,
        & ~ * select,
        & ~ * textarea {
          @include html-validator-warning(
            'The <label> element may contain at most one <button>, <input>, <meter>, <output>, <progress>, <select>, or <textarea> descendant and/or no duplicated label values.'
          );
        }
      }

      h1,
      h2,
      h3,
      h4,
      h5,
      h6,
      label,
      div {
        @include html-validator-warning('This element is not allowed as child of element <label> in this context.');
      }
    }

    picture {
      &[width],
      &[height] {
        @include html-validator-warning('Attribute "width" not allowed on element picture at this point.');
      }

      :not(source) ~ img {
        @include html-validator-warning(
          'If element "img" is not used with "source", "width" and "height" should be applied.'
        );
      }
    }

    table {
      > *:not(tr):not(thead):not(tbody):not(tfoot) {
        @include html-validator-warning('This element is not allowed as child of element <table> in this context.');
      }
    }

    tr {
      > *:not(td, th) {
        @include html-validator-warning('This element is not allowed as child of element <tr> in this context.');
      }
    }

    span {
      div {
        @include html-validator-warning('Element <div> not allowed as child of element <span> in this context.');
      }
    }

    ul {
      > *:not(li) {
        @include html-validator-warning('No element except <li> allowed as child of element <ul> in this context.');
      }
    }
  }
</style>
