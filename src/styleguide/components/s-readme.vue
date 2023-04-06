<template>
  <div :class="b()">
    <readme />
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  // @ts-ignore Needed because typescript cannot resolve `.md` files.
  import { VueComponent } from '@/../README.md';

  export default defineComponent({
    name: 's-readme',
    status: 1,

    components: {
      readme: VueComponent,
    },

    // props: {},
    // data() {
    //   return {
    //     content: html,
    //   };
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

<!-- eslint-disable -->
<style lang="scss">
  @use '../../setup/scss/mixins';
  @use '../../setup/scss/variables';

  /* stylelint-disable */

  /*
  This document has been created with Marked.app <https://marked2app.com>, Copyright 2013 Brett Terpstra
  Content is property of the document author
  Please leave this notice in place, along with any additional credits below.
  ---------------------------------------------------------------
  Title: GitHub
  Author: Brett Terpstra
  Description: Github README style. Includes theme for Pygmentized code blocks.
  */
  .s-readme {
    color: black;
    background: #fff;

    border-radius: 3px;

    > * {
      &:first-child {
        margin-top: 0 !important;
      }
      &:last-child {
        margin-bottom: 0 !important;
      }
    }
    p {
      margin: 15px 0;
    }

    a {
      &:first-child {
        h1 {
          margin-top: 0;
          padding-top: 0;
        }
        h2 {
          margin-top: 0;
          padding-top: 0;
        }
        h3 {
          margin-top: 0;
          padding-top: 0;
        }
        h4 {
          margin-top: 0;
          padding-top: 0;
        }
        h5 {
          margin-top: 0;
          padding-top: 0;
        }
        h6 {
          margin-top: 0;
          padding-top: 0;
        }
      }
      &.footnote {
        @include mixins.font(14);

        height: 0;
        line-height: 1;
        vertical-align: super;
        position: relative;
      }
    }
    h1 {
      @include mixins.font(38);

      cursor: text;
      position: relative;
      margin: 1em 0 15px;
      padding: 0;
      border-bottom: 1px solid #ddd;

      + p {
        margin-top: 0;
      }
    }
    h2 {
      @include mixins.font(30);

      cursor: text;
      position: relative;
      margin: 1em 0 15px;
      padding: 0;
      border-bottom: 1px solid #eee;

      + p {
        margin-top: 0;
      }
    }
    h3 {
      @include mixins.font(22);

      cursor: text;
      position: relative;
      margin: 1em 0 15px;
      padding: 0;

      + p {
        margin-top: 0;
      }
    }
    h4 {
      @include mixins.font(18);

      cursor: text;
      position: relative;
      margin: 1em 0 15px;
      padding: 0;

      + p {
        margin-top: 0;
      }
    }
    h5 {
      @include mixins.font(16);

      cursor: text;
      position: relative;
      margin: 1em 0 15px;
      padding: 0;

      + p {
        margin-top: 0;
      }
    }

    h6 {
      @include mixins.font(14);

      cursor: text;
      position: relative;
      margin: 1em 0 15px;
      padding: 0;
      color: #777;

      + p {
        margin-top: 0;
      }
    }
    blockquote {
      margin: 15px 0;
      border-left: 4px solid #ddd;
      padding: 0 15px;
      color: #777;
      > {
        :first-child {
          margin-top: 0;
        }
        :last-child {
          margin-bottom: 0;
        }
      }
    }
    table {
      @include mixins.font(14);

      margin: 15px 0;
      border-collapse: collapse;
      border-spacing: 0;
      font: inherit;

      th {
        font-weight: bold;
        border: 1px solid #ccc;
        padding: 6px 13px;
      }
      td {
        border: 1px solid #ccc;
        padding: 6px 13px;
      }
      tr {
        border-top: 1px solid #ccc;
        background-color: #fff;
        &:nth-child(2n) {
          background-color: #f8f8f8;
        }
      }
    }
    pre {
      @include mixins.font(14);

      background-color: #f8f8f8;
      border: 1px solid #ccc;
      line-height: 19px;
      overflow: auto;
      padding: 6px 10px;
      border-radius: 3px;
      margin: 26px 0;

      > code {
        margin: 0;
        padding: 0;
        white-space: pre;
        border: none;
        background: transparent;
      }
      code {
        background-color: transparent;
        border: none;
      }
      tt {
        background-color: transparent;
        border: none;
      }
    }
    ul {
      padding-left: 30px;
      list-style: disc;

      li + li {
        margin-top: variables.$spacing--10;
      }
    }
    ol {
      padding-left: 30px;
      list-style: decimal;

      li + li {
        margin-top: variables.$spacing--10;
      }
    }
    hr {
      background: transparent url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAECAYAAACtBE5DAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBNYWNpbnRvc2giIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OENDRjNBN0E2NTZBMTFFMEI3QjRBODM4NzJDMjlGNDgiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OENDRjNBN0I2NTZBMTFFMEI3QjRBODM4NzJDMjlGNDgiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo4Q0NGM0E3ODY1NkExMUUwQjdCNEE4Mzg3MkMyOUY0OCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo4Q0NGM0E3OTY1NkExMUUwQjdCNEE4Mzg3MkMyOUY0OCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PqqezsUAAAAfSURBVHjaYmRABcYwBiM2QSA4y4hNEKYDQxAEAAIMAHNGAzhkPOlYAAAAAElFTkSuQmCC) repeat-x 0 0;
      border: 0 none;
      color: #ccc;
      height: 4px;
      margin: 15px 0;
      padding: 0;
    }
    #wrapper {
      > h2:first-child {
        margin-top: 0;
        padding-top: 0;
      }
      > h1:first-child {
        margin-top: 0;
        padding-top: 0;
        + h2 {
          margin-top: 0;
          padding-top: 0;
        }
      }
      > h3:first-child {
        margin-top: 0;
        padding-top: 0;
      }
      > h4:first-child {
        margin-top: 0;
        padding-top: 0;
      }
      > h5:first-child {
        margin-top: 0;
        padding-top: 0;
      }
      > h6:first-child {
        margin-top: 0;
        padding-top: 0;
      }
    }
    dl {
      padding: 0;
      dt {
        @include mixins.font(14);

        font-weight: bold;
        font-style: italic;
        padding: 0;
        margin: 15px 0 5px;
        &:first-child {
          padding: 0;
        }
        > {
          :first-child {
            margin-top: 0;
          }
          :last-child {
            margin-bottom: 0;
          }
        }
      }
      dd {
        margin: 0 0 15px;
        padding: 0 15px;
        > {
          :first-child {
            margin-top: 0;
          }
          :last-child {
            margin-bottom: 0;
          }
        }
      }
    }
    img {
      max-width: 100%;
    }
    code {
      margin: 0 2px;
      padding: 0 5px;
      white-space: nowrap;
      border: 1px solid #eaeaea;
      background-color: #f8f8f8;

      border-radius: 3px;
      font-family: Consolas, Liberation Mono, Courier, monospace;
      font-size: 12px;
      color: #333;
    }

    tt {
      @include mixins.font(12);

      margin: 0 2px;
      padding: 0 5px;
      white-space: nowrap;
      border: 1px solid #eaeaea;
      background-color: #f8f8f8;

      border-radius: 3px;
      font-family: Consolas, Liberation Mono, Courier, monospace;
      color: #333;
    }

    .highlight {
      pre {
        @include mixins.font(13);

        background-color: #f8f8f8;
        border: 1px solid #ccc;
        line-height: 19px;
        overflow: auto;
        padding: 6px 10px;

        border-radius: 3px;
      }
      .c {
        color: #998;
        font-style: italic;
      }
      .err {
        color: #a61717;
        background-color: #e3d2d2;
      }
      .k {
        font-weight: bold;
      }
      .o {
        font-weight: bold;
      }
      .cm {
        color: #998;
        font-style: italic;
      }
      .cp {
        color: #999;
        font-weight: bold;
      }
      .c1 {
        color: #998;
        font-style: italic;
      }
      .cs {
        color: #999;
        font-weight: bold;
        font-style: italic;
      }
      .gd {
        color: #000;
        background-color: #fdd;
        .x {
          color: #000;
          background-color: #faa;
        }
      }
      .ge {
        font-style: italic;
      }
      .gr {
        color: #a00;
      }
      .gh {
        color: #999;
      }
      .gi {
        color: #000;
        background-color: #dfd;
        .x {
          color: #000;
          background-color: #afa;
        }
      }
      .go {
        color: #888;
      }
      .gp {
        color: #555;
      }
      .gs {
        font-weight: bold;
      }
      .gu {
        color: #800080;
        font-weight: bold;
      }
      .gt {
        color: #a00;
      }
      .kc {
        font-weight: bold;
      }
      .kd {
        font-weight: bold;
      }
      .kn {
        font-weight: bold;
      }
      .kp {
        font-weight: bold;
      }
      .kr {
        font-weight: bold;
      }
      .kt {
        color: #458;
        font-weight: bold;
      }
      .m {
        color: #099;
      }
      .s {
        color: #d14;
      }
      .na {
        color: #008080;
      }
      .nb {
        color: #0086b3;
      }
      .nc {
        color: #458;
        font-weight: bold;
      }
      .no {
        color: #008080;
      }
      .ni {
        color: #800080;
      }
      .ne {
        color: #900;
        font-weight: bold;
      }
      .nf {
        color: #900;
        font-weight: bold;
      }
      .nn {
        color: #555;
      }
      .nt {
        color: #000080;
      }
      .nv {
        color: #008080;
      }
      .ow {
        font-weight: bold;
      }
      .w {
        color: #bbb;
      }
      .mf {
        color: #099;
      }
      .mh {
        color: #099;
      }
      .mi {
        color: #099;
      }
      .mo {
        color: #099;
      }
      .sb {
        color: #d14;
      }
      .sc {
        color: #d14;
      }
      .sd {
        color: #d14;
      }
      .s2 {
        color: #d14;
      }
      .se {
        color: #d14;
      }
      .sh {
        color: #d14;
      }
      .si {
        color: #d14;
      }
      .sx {
        color: #d14;
      }
      .sr {
        color: #009926;
      }
      .s1 {
        color: #d14;
      }
      .ss {
        color: #990073;
      }
      .bp {
        color: #999;
      }
      .vc {
        color: #008080;
      }
      .vg {
        color: #008080;
      }
      .vi {
        color: #008080;
      }
      .il {
        color: #099;
      }
      .gc {
        color: #999;
        background-color: #eaf2f5;
      }
    }
    sup {
      @include mixins.font(14);

      height: 0;
      line-height: 1;
      vertical-align: super;
      position: relative;
    }
    sub {
      @include mixins.font(14);

      height: 0;
      line-height: 1;
      position: relative;
      vertical-align: sub;
      top: -1px;
    }

    .poetry pre {
      font-family: Georgia, Garamond, serif !important;
      font-style: italic;
      font-size: 110% !important;
      line-height: 1.6em;
      display: block;
      margin-left: 1em;

      code {
        font-family: Georgia, Garamond, serif !important;
        word-break: break-all;
        hyphens: auto;
        white-space: pre-wrap;
      }
    }
    .type-csharp .highlight {
      .k {
        color: #00f;
      }
      .kt {
        color: #00f;
      }
      .nf {
        color: #000;
        font-weight: normal;
      }
      .nc {
        color: #2b91af;
      }
      .nn {
        color: #000;
      }
      .s {
        color: #a31515;
      }
      .sc {
        color: #a31515;
      }
    }
    body.dark #wrapper {
      background: transparent !important;

      box-shadow: none !important;
    }
  }

  @media print {
    .s-readme {
      body {
        background: #fff;
      }
      img {
        page-break-inside: avoid;
      }
      pre {
        page-break-inside: avoid;
        code {
          overflow: visible;
        }
      }
      blockquote {
        page-break-inside: avoid;
      }
      table {
        page-break-inside: avoid;
      }
      figure {
        page-break-inside: avoid;
      }
      #wrapper {
        background: #fff;
        border: none;
      }
    }
  }

  @media screen {
    .s-readme {
      .inverted {
        background: #252a2a;
        #wrapper {
          color: #eee !important;
          border-color: #555;

          box-shadow: none;
          background: #252a2a;
        }
        hr {
          color: #eee !important;
          box-shadow: none;
          border-color: #777;
          border-width: 1px !important;
        }
        p {
          color: #eee !important;
          border-color: #555;

          box-shadow: none;
        }
        td {
          color: #eee !important;
          border-color: #555;

          box-shadow: none;
          background: #333;
        }
        li {
          color: #eee !important;
          border-color: #555;

          box-shadow: none;
        }
        h1 {
          color: #eee !important;
          border-color: #555;

          box-shadow: none;
        }
        h2 {
          color: #eee !important;
          box-shadow: none;
          border-color: #555;
        }
        h3 {
          color: #eee !important;
          border-color: #555;

          box-shadow: none;
        }
        h4 {
          color: #eee !important;
          border-color: #555;

          box-shadow: none;
        }
        h5 {
          color: #eee !important;
          border-color: #555;

          box-shadow: none;
        }
        h6 {
          color: #eee !important;
          border-color: #555;

          box-shadow: none;
        }
        th {
          color: #eee !important;
          border-color: #555;

          box-shadow: none;
          background: #333;
        }
        .math {
          color: #eee !important;
          border-color: #555;

          box-shadow: none;
        }
        caption {
          color: #eee !important;
          border-color: #555;

          box-shadow: none;
        }
        dd {
          color: #eee !important;
          border-color: #555;

          box-shadow: none;
        }
        dt {
          color: #eee !important;
          border-color: #555;

          box-shadow: none;
        }
        blockquote {
          color: #eee !important;
          border-color: #555;

          box-shadow: none;
        }
        pre {
          background: #eee !important;
          color: #111;
        }
        code {
          background: #eee !important;
          color: #111;
        }
        tt {
          background: #eee !important;
          color: #111;
        }
        a::selection {
          background-color: rgba(255, 230, 102, 0.6);
        }
        a {
          color: #acd1d5;
        }
      }
      ::selection {
        background: rgba(157, 193, 200, 0.5);
      }
      h1::selection {
        background-color: rgba(45, 156, 208, 0.3);
      }
      h2::selection {
        background-color: rgba(90, 182, 224, 0.3);
      }
      h3::selection,
      h4::selection,
      h5::selection,
      h6::selection,
      li::selection,
      ol::selection {
        background-color: rgba(133, 201, 232, 0.3);
      }
      code::selection {
        background-color: rgba(0, 0, 0, 0.7);
        color: #eee;
      }
      a::selection {
        background-color: rgba(255, 230, 102, 0.2);
      }
      td::selection {
        background-color: rgba(180, 237, 95, 0.5);
      }
      th::selection {
        background-color: rgba(180, 237, 95, 0.5);
      }
      caption::selection {
        background-color: rgba(180, 237, 95, 0.5);
      }
      body.inverted {
        color: #eee !important;
        border-color: #555;

        box-shadow: none;
      }
      code span::selection {
        background-color: rgba(0, 0, 0, 0.7) !important;
        color: #eee !important;
      }
    }
  }
</style>
