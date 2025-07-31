<template>
  <l-vas-layout :class="b()">
    <div :class="b('grid')">
      <div :class="b('left')">
        <div :class="b('font-highlight')">Aa</div>
        <div :class="b('font-name')">Arial</div>
        <div :class="b('font-special-chars')">
          ABCČĆDĐEFGHIJKLMNOPQRSŠTUVWXYZŽabcčćdđefghijklmnopqrsštuvwxyzžАБВГҐ
          ДЂЕЁЄЖЗЅИІЇЙЈКЛЉМНЊОПРСТЋУЎФХЦЧЏШЩЪЫЬЭЮЯабвгґдђеёєжзѕиіїйјклљмнњопр
          стћуўфхцчџшщъыьэюяĂÂÊÔƠƯăâêôơư1234567890‘?’“!”(%)[#]{@}/&\-+÷×=>®©$€£¥¢:;,.*
        </div>
        <div :class="b('font-special-chars')">0123456789</div>
      </div>
      <div :class="b('right')">
        <div :class="b('section')">
          <h1>h1.Headline</h1>
        </div>
        <div :class="b('section')">
          <h2>h2.Headline</h2>
        </div>
        <div :class="b('section')">
          <h3>h3.Headline</h3>
        </div>
        <div :class="b('section')">
          <h4>h4.Headline</h4>
        </div>
        <div :class="b('section')">
          <h5>h5.Headline</h5>
        </div>
        <div :class="b('section')">
          <h6>h6.Headline</h6>
        </div>
        <div :class="b('section')">
          <strong>&lt;p&gt; Paragraph</strong>
          <p>{{ dummyText }}</p>
        </div>
        <div :class="b('section')">
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
        </div>

        <strong>&lt;ul class="list-unordered"&gt; Unordered list</strong>
        <div :class="b('section')">
          <ul class="list-unordered">
            <li
              v-for="entry in listEntries"
              :key="entry"
            >
              {{ line }}
            </li>
          </ul>
        </div>

        <strong>&lt;ol class="list-ordered"&gt; Unordered list</strong>
        <div :class="b('section')">
          <ol class="list-ordered">
            <li
              v-for="entry in listEntries"
              :key="entry"
            >
              {{ line }}
            </li>
          </ol>
        </div>

        <strong>&lt;ul&gt; list no style</strong>
        <div :class="b('section')">
          <ul>
            <li
              v-for="entry in listEntries"
              :key="entry"
            >
              {{ line }}
            </li>
          </ul>
        </div>

        <strong>&lt;ul class="list-inline"&gt; list inline</strong>
        <div :class="b('section')">
          <ul class="list-inline">
            <li
              v-for="entry in listEntries"
              :key="entry"
            >
              {{ line }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </l-vas-layout>
</template>

<script lang="ts">
  import { faker } from '@faker-js/faker';
  import lVasLayout from '@valantic/vue-styleguide/src/layouts/l-vas-layout.vue';
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'r-typography',
    components: {
      lVasLayout,
    },

    // props: {},
    data() {
      return {
        dummyText: faker.lorem.words(45),
        listEntries: Array(5)
          .fill(1)
          .map((entry) => entry + 1),
        line: faker.lorem.words(20),
      };
    },

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
  @use '@/setup/scss/mixins';

  .r-typography {
    &__grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 8rem;
      order: revert;
      margin-top: 4rem;

      @include mixins.media(sm) {
        grid-template-columns: 25% 1fr;
        order: unset;
      }
    }

    &__left {
      display: flex;
      gap: 20px;
      flex-direction: column;
    }

    &__font-highlight {
      font-size: 13rem;
      font-weight: 700;
      line-height: 1;
    }

    &__font-name {
      font-size: 3rem;
      line-height: 1;
    }

    &__font-special-chars {
      font-size: 1rem;
      line-height: 1.4;
      word-break: break-word;
    }

    &__section {
      margin-bottom: 2rem;
      background-color: #fbfbfb;
    }
  }
</style>
