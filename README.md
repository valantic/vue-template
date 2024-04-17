# vue-template

This is a custom Vue3 template written in TypeScript which is based on the idea of using BEM, CriticalCSS and a living styleguide while building mainly not a SPA but a set of components used inside a CMS like system.

## Introduction

### About this readme

If you're new on this project, please take your time and read carefully through this documentation and, if needed, through the linked documentations.

Please note, that there is also a `package.md` file which contains additional information about the used NPM packages and available NPM scripts.

### Before starting

This template, in most parts, follows the default Vue conventions. Where this is not the case, you'll find documentation on the customizations in this readme.

Before you start working on this project, you **MUST** read the following documentations:

- [Vue Introduction](https://vuejs.org/guide/introduction.html)
- [Vue Styleguide](https://vuejs.org/style-guide/)
- [Vue component styleguide](https://github.com/pablohpsilva/vuejs-component-style-guide)
- [package.md](package.md)

You **MUST** also be familiar with the following tools:

- [BEM](http://getbem.com/)
- [ES2015+](https://babeljs.io/learn-es2015/) (especially with Classes, Const/Let, Modules, Promises)
- [ESLint](https://eslint.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Git](https://git-scm.com/)
- [GitFlow](https://nvie.com/posts/a-successful-git-branching-model/)
- [Jest](https://facebook.github.io/jest/)
- [NPM](https://docs.npmjs.com/getting-started/what-is-npm)
- [SCSS](https://sass-lang.com/)
- [Stylelint](https://stylelint.io/)
- Your IDE

You **SHOULD** also know the following tools:

- [vite](https://vitejs.dev/)

### Before installing

You **MUST** install the following tools globally, before you can use this template:

- [Node.js & NPM](https://nodejs.org/en/) (See package.json for the required versions. Use a version manager in case you work on different projects (e.g. [n](https://www.npmjs.com/package/n) or [nvm](https://github.com/creationix/nvm/blob/master/README.md))).
- [Vue-Devtools](https://github.com/vuejs/vue-devtools) for your browser.
- [Homebrew](https://brew.sh/) is most likely also needed for 3rd party tools.
- A modern IDE

### Prepare your IDE

Please make sure your IDE is configured to apply [ESLint](https://eslint.org/docs/user-guide/integrations), [Stylelint](https://github.com/stylelint/stylelint/blob/master/docs/user-guide/complementary-tools.md#editor-plugins) and [.editorconfig](https://editorconfig.org/#download) linting/settings.

### Know issues

#### I use Windows and have issues with the line ending style

Windows and Mac use different symbols for line endings in text files (`crlf` and `lf`). This can be an issue with GIT and/or the IDE you are using. This project ONLY uses `lf`. We recommend to set the following global configuration to resolve this issue before cloning the repository:

```
git config --global core.autocrlf input
git config --global core.eol lf
```

NOTE: be aware that this might also effect other projects on your machine.

## Installation

### Cloning the repository

Note: to execute the following tasks, you may need to register an SSH key for your machine on the repository side. Ask your project manager about where you need to define it. On how you create/copy the SSH key you can read more [here](https://help.github.com/articles/connecting-to-github-with-ssh/).

Make a local git clone of this project/template by using the following command:

```
$ git clone <repository-url> <[target-folder]>

# If you want a clean copy (no history) use the following command
$ git clone --depth 1 -b master <repository-url>
```

If you create a new project, based on this template, please make sure to change the path to the origin repository to your project repository, after cloning. **If you cloned an existing project, this step is not needed.**

```
$ git remote set-url origin <project-repository-url>
```

### Installing npm packages

Before executing the following command, please **make sure your Node and NPM version meet the requirements** in package.json's `engines` section. Changing the Node or NPM version later on can cause issues which force you to re-install the project.

```
# Print node version
$ node -v

# Print npm version
$ npm -v
```

Finally it's time to install the project dependencies and start developing!

```
$ npm ci
```

NOTE: always use `npm ci` when setting up the project or updated the code base. Unlike `npm install`, `npm ci` will install only exactly the packages and versions which are defined in the `package-lock.json` file. `npm install` on the other hand will always check for updates, meeting the versioning criteria.

## This project

> TODO: replace this section with project specific information.

### Browser support

| Operating systems/Devices    | Browser                 | Priority | Breakpoints |
| ---------------------------- | ----------------------- | -------- | ----------- |
| Windows 10                   | Chrome (current)        | **high** | all         |
| Windows 10                   | Edge (current)          | **high** | all         |
| Windows 10                   | Firefox (current)       | _medium_ | all         |
| Windows 10                   | IE11                    | low      | >= md       |
| Windows 7                    | IE11                    | low      | >= md       |
| Mac OS X 10.15               | Chrome (current)        | **high** | all         |
| Mac OS X 10.15               | Safari (current)        | **high** | all         |
| Mac OS X 10.15               | Firefox (current)       | _medium_ | all         |
| iPhone X (current iOS)       | Safari (current)        | low      | <= md       |
| iPhone 11 (current iOS)      | Safari (current)        | low      | <= md       |
| Galaxy S20 (current Android) | Chrome Mobile (current) | low      | <= md       |
| iPad Pro 4th (current iOS)   | Safari Mobile (current) | low      | sm, md, lg  |
| iPad 7th (current iOS)       | Safari Mobile (current) | low      | sm, md, lg  |

#### Updating browserslist

Please make sure, that the list above is also represented in the browserslist configuration, which is used to determine the required code parsing for CSS and JS to support older browsers.

To check which browsers are currently targeted, run the following command:

```
npx browserslist
```

Excluding unsupported browsers can have a big impact on the build size. When removing older webkit versions in a test run we were able to reduce the CSS size by almost 25%!

See the [browserslist documentation](https://github.com/browserslist/browserslist#query-composition) on how to define the query.

#### Updating caniuse-lite

The browserslist relies on up to date caniuse-lite information. To update this dependency you can run:

```
npx browserslist@latest --update-db
```

### Running the project

A complete list of available NPM scripts can be found in [package.md](package.md).

Please make sure to always run Node/NPM tasks trough an NPM script. Installing NPM packages globally in calling them directly is bad practice and can cause inconsistency because of version differences (e.g. install `vitejs` as a project dependency and then create an NPM script, which runs this project related `vitejs` instead of a global one).

To start developing you only need to execute the `dev` script from your console:

```
$ npm run dev
```

The app should now run on [http://localhost:8080](http://localhost:8080)

### Integrate vue-template into an other repository

If you need to integrate this repository into an other project (e.g. a backend repository) we recommend to use `git subtree`. This will create a copy of a certain branch and allow updates later on while not changing the other projects git setup. For more information see [Atlassian Blog](https://www.atlassian.com/blog/git/alternatives-to-git-submodule-git-subtree) and [Git subtree](https://git-scm.com/book/de/v1/Git-Tools-Subtree-Merging).

WARNING: Please don't commit anything from inside the parent repository into the vue-template repository!

Note: The following scripts need to be executed in the root folder of the parent git repository.

#### Pull this repository into an other one

Note: the `target-folder` shall not exist and we be crated during pull. `--squash` will flatten the change history.

```
git subtree add --prefix <target-folder> <source> <branch> --squash
```

#### Update the files inside the parent repository

```
git subtree pull --prefix assets/vue https://github.com/valantic/vue-template.git master --squash -m "Merges vue-template @ version x.x.x into project"
```

## Folder structure

```
|- src                  Main folder of the application
.  |- assets            Assets for the application
.  |- components        Components for the application
.  |- directives        Custom Vue directives
.  |- helpers           Helper functions which can be used to handle certain tasks
.  |- mixins            Vue mixins
.  |- plugins           Self maintained plugins
.  |- setup             Configuration and setup of the application
.  |- stores            Pinia stores
.  |- styleguide        Assets, components, mock data and routes for the stylguide
.  |- translations      Translations for the application
|- blueprints           File blueprints
|- (dist)               Build folder
|- (node_modules)       Node modules used by this project
|- static               Static files which will be copied to `dist` during build
|- tests                Jest tests
.  |- unit              Unit tests
.  .  |- specs          Test definitions
```

## BEM

We heavily use the [BEM](http://getbem.com/) methodology to define our style classes and component names. It's mandatory that you understand the concept behind it before starting to develop or fixing existing code.

### Namespace

Please note, that this template/project uses namespaced BEM to distinguish components and styles. The namespace is placed before the custom block name (but is also part of the block). This also is a workaround for the custom HTML element restriction which tells us they must have at least one dash in the name.

#### `c-`

Marks an ordinary **component** which can contain other components and/or elements and can be part of an other component.

#### `e-`

Marks an **element** "component" which itself doesn't contain an other component/element (except for scoped ones) but can be part of an other component.

#### `l-`

Marks a **layout** "component" and therefore the most outer wrapper of the application. It can not be contained within an other component but can contain components and/or elements.

#### `s-`

This are components, which are only used in the styleguide. Make sure to keep them all inside `/app/styleguide/components`.

### Using BEM with Vue

We added the [vue-bem-cn](https://github.com/c01nd01r/vue-bem-cn) plugin for Vue to improve the handling of BEM classes and especially modifiers in Vue components. Just use `:class="b(<customConfiguration>)"` on any template element to add blocks, elements and modifiers. Make sure your component has a `name` property, since it is mandatory for this plugin.

### Guidelines

#### Prefer multiple components over complex components or modifiers

Always keep in mind, that it often makes more sense to create multiple components instead of a really big one with multiple modifiers, complex condition driven templates, deep HTML encapsulation. This also makes it easier to use a component in different locations.

Some components, like banners, teasers, navigations, will most likely have many variants. Instead of creating complex, conditional templates and functionality it's better to create new numbered components that are easier to handle.

```
.banner-1
.banner-2
.banner-3
.navigation-1
.navigation-2
.navigation-3
```

For the case of the navigation it would also be appropriate to kind of categorize them since it can be necessary to build completely different navigation for different screen-sizes. E.g.:

```
.navigation
.service-navigation-1
.service-navigation-2
.service-navigation-3
```

#### Use containers for nesting

When nesting components, always add a wrapper element around the nested component even if you don't need to apply any styles (yet). The wrapper can be used to define size, position and spacings of the nested component.

#### Always add a BEM class to each HTML element (almost)

When working with BEM, it usually makes no sense to create class less HTML elements. Even if you need no class now, its good practice to create a completely named template. Apply styles with element selectors (e.g. .my-component p) is almost always recognized as bad practice.

Still, on some rare occasions, it can be useful to style bare HTML elements, if the component will wrap around user or CMS generated content to be more flexible and you don't want to enforce an endless list of element classes on the author.

#### Components don't style other components

Never style a encapsulated component by it's parent component. This prevents the reuse of the encapsulated component style and creates an unnecessary dependency.

Work with modifiers instead.

#### Don't use grandchild selectors

Complex components have the need to encapsulate elements. In this case it's good practice to keep to one element depth. Moving elements around and reuse selectors in different places (inside the component) becomes easier.

In other words: selectors like `.c-card__header__title` and `.c-card__body__text__link` should not be used. Use `.c-card__header-title` and `.c-card__body-text-link` or `.c-card__link` instead.

#### It's OK to use dozens of classes on an element

At first it seems like a big down side, when starting object oriented css coding, that you have to apply a huge amount of classes to almost every element. But in the end the disadvantage is quite small. The classes also will help you to recognize what is going on and which styles should be applied. So yes, it is OK to sprinkle your code with many classes.

#### Use of pseudo selectors :first-child / :last-child

Pseudo selector classes can be used (mainly :first-child / :last-child). But be careful when using pseudo selector classes (especially the numbered ones :nth-child()) in combination with responsive layouts. Depending on the viewport size they may not behave as intended.

#### Selector Concatenation in less/sass Files with `&`

- Selector concatenation is allowed:
  - to concatenate block and element
  - to add states
- Selector concatenation is not allowed:
  - to nesting more than two layers (exceptionally allowed 3rd layer for state selector)
  - to assemble an element name or modifier name

#### Use of Global State Classes

We don't use global state classes like `.is-active` or `.is-open`, only modifiers. For some specific cases we use global classes like `.invisible` you can see them in the styleguide (core/global-styles) or `setup/scss/_globals.scss`

## SCSS

### Vendor prefixes

Vendor prefixes are automatically applied according to the `browserslist` in `package.json`. You don't need to write them yourself.

### Naming Color Variables

To name a dynamic set of SCSS variables we use a number system with a range from `0` to `1000`. Using specific names often turns out to become hard to extend and handle in the future (e.g. lightGray, lighterGray, lightestGray).

## Vue.js

[Vue.js](https://vuejs.org/) (commonly referred to as Vue; pronounced /vjuː/, like view) is an open-source JavaScript framework for building user interfaces and single page applications.
[Wikipedia](https://en.wikipedia.org/wiki/Vue.js)

### Best practice

For information about best practices read the following guides:

- [Official Vue Style Guide](https://vuejs.org/style-guide/)
- [Vue.js Component Style Guide](https://github.com/pablohpsilva/vuejs-component-style-guide)

#### Additional notes

- This project always uses `kebab-case` for [Single-file component filename casing](https://vuejs.org/style-guide/rules-strongly-recommended.html#single-file-component-filename-casing), [Component name casing in JS/JSX](https://vuejs.org/style-guide/rules-strongly-recommended.html#component-name-casing-in-js-jsx) and [Component name casing in templates ](https://vuejs.org/style-guide/rules-strongly-recommended.html#component-name-casing-in-templates).
- We use the BEM namespace `e-` for (native) [element component names](https://vuejs.org/style-guide/rules-strongly-recommended.html#base-component-names).

### Single file components

We build Vue components as [single file components](https://vuejs.org/guide/scaling-up/sfc.html). All production components are placed within `/src/components` (styleguide only components in `/src/styleguide/components`).

#### Naming

- Naming follows BEM block convention.
- Naming MUST always be singular.

### Vue and TypeScript

To have the types working for Vue SFC, they need to be defined as

```vue
<script lang="ts">
  import { defineComponent } from 'vue';

  export default defineComponent({});
</script>
```

To fully benefit from the power of TypeScript, define the types according to the following examples:

#### Props

For Primitive Types, TypeScript is able to detect the type based on the Vue Prop Type definition:

```ts
myProp: {
  type: String,
  required: true,
},
```

When using arrays or objects without further typings, TypeScript treats a prop as `any[]` or `any`. To have proper
typing, you can define your array / object props like this:

```ts
myArrayProp: {
  type: Array as PropType<string[]>,
  default: () => [],
},
```

When defining a Prop with a validator, it's important to use the arrow function style to prevent random typescript errors:

```ts
color: {
  type: String,
  default: 'yellow',
  validator: (value: string) => [
    'red',
    'yellow',
    'blue',
    'white',
  ].includes(value),
},
```

#### Setup

When Using Code from another File (Composition based) or accessing Component Elements via ref, the code needs to be
defined in the Setup Method. The setup Method needs to have a proper Return Type:

```ts
import { Ref, defineComponent, ref } from 'vue';
import useFormStates, { FormStates } from '@/compositions/form-states';

type Setup = FormStates & {
  input: Ref<HTMLInputElement | null>;
  slot: Ref<HTMLSpanElement | null>;
};

export default defineComponent({
  setup(props): Setup {
    const input = ref();
    const slot = ref();

    return {
      ...useFormStates(toRefs(props).state),
      input,
      slot,
    };
  },
});
```

#### Data

To fully benefit from TypeScript, please define your Data function with a Type like this:

```ts
type Data = {
  myDataProperty: string;
};
export default defineComponent({
  data(): Data {
    return {
      myDataProperty: 'Hello World',
    };
  },
});
```

#### Computed / Methods

To prevent random TypeScript errors in your component, make sure, to always type your computed return types and method
signatures!

#### Misc

- Component general Instance: Use `ComponentPublicInstance` as Type if you don't know the type of the component
- Component specific Instance: Use `Ref<InstanceType<typeof yourComponent>` to access a property of a ref being a component

#### IDE Support

To see Type errors in your editor, make sure to enable TypeScript Language Support in your IDE. For PHP Storm, you
can follow [this Instructions](https://www.jetbrains.com/help/phpstorm/using-tslint-code-quality-tool.html).

#### Vue-2 to Vue-3

With the update to Vue-3 and TypeScript, some basic things have changed. The most notable are listed here:

1. Use `export default defineComponent({ ... })` to define your component
2. Global Vue Component properties need to be defined in the `shims-xxx` files
3. Mixins have been replaced by Composables (Composition API)
4. Ref Access needs to be done via Setup Method
   [read more](https://v3.vuejs.org/guide/composition-api-template-refs.html#template-refs)
5. Event emit does only work to the direct parent, otherwise you need to use an emitting plugin
   [read more](https://v3.vuejs.org/guide/migration/events-api.html#events-api)
6. Emitting events with the same as a native event need to be defined in `emits` property
   [read more](https://v3.vuejs.org/guide/migration/emits-option.html#emits-option)
7. The directive lifecycle hooks have been adjusted
   [read more](https://v3.vuejs.org/guide/migration/custom-directives.html#custom-directives)
8. The way how `v-model` works, has been changed
   [read more](https://v3.vuejs.org/guide/migration/v-model.html#v-model)
9. The way how the `is` attribute works, has changed
   [read more](https://v3.vuejs.org/api/special-attributes.html#is)
10. As the successor of vuex we use Pinia store which supports Vue 3 and is also Type Safe.
    [read more](https://pinia.vuejs.org/)

For more information about the migration, read the [migration page](https://v3.vuejs.org/guide/migration/introduction.html#introduction)

#### Decisions and Issues

During switching to Vue-3 and TypeScript, the following decisions had to be made:

1. Build Chain: For typescript, one can either use `ts-loader` and output browser ready js directly or just use the `ts-loader`
   to compile TypeScript to JavaScript and then continue with e.g. `babel-loader`. Although the latter uses two loaders and
   is potentially slower, we decided to use it, to have browser list support for the end result
2. Code Linting: We use ESLint with some additional rules needed for typescript.
   Our `.eslintrc` extends `@vue/typescript`, which is a vue optimized ESLint config
   [read more](https://www.npmjs.com/package/@vue/eslint-config-typescript)
   The alternative would be to use `plugin:@typescript-eslint/recommended`, which is stricter

The following issues arisen during the switch and are still open:

1. Some dependencies are only available in next / alpha version
2. TypeScript errors are NOT detected as part of the code linting, this is a conscious decision, as there are no good
   tools to do that at the moment, [read more](https://github.com/vuejs/vue-cli/issues/2950)
   - Using native `tsc --noEmit` does not work for TypeScript code in Vue `sfc` files
   - The following 3rd Party tools where tested but where not working well
     - https://github.com/zhanba/vue-tslint => Works only with Vue-2
     - https://github.com/johnsoncodehk/vue-tsc => Does not seem to respect the tsconfig from the project
     - https://github.com/Yuyz0112/vue-type-check => Does not recognize component properties

## Pinia

[Pinia](https://pinia.vuejs.org/) is a state management pattern + library for Vue.js applications. It serves as a centralized store for all the components in an application, with rules ensuring that the state can only be mutated in a predictable fashion.

### Modularity

Pinia is modular by design and let us divide our project into multiple stores.

```
stores
  |- session.ts
  |- notification.ts
  |- breadcrumb.ts
```

**Note: the module name MUST be written in singular.**

### Prefixing

We defined several prefixes you should use on Pinia getters and actions, so they can be better distinguished when used in the components.

#### get\*

Add the `get` prefix to all getters. This way it's clear in the component, that the used value is coming from Pinia.

#### set\*

Add the `set` prefix to all setters. This way it is easier to identify setter actions from Pinia inside components.

#### api\*

Use this prefix for all actions, that trigger an Ajax request. This way it is easier to identify code that triggers a server request from components.

#### data\*

Add this prefix to actions, that handle initial data. See next section.

### Initial data

To inject initial data into the Pinia store, we decided to use the setup method which is available on each Pinia store.

The data is exchanged via a global JS object.

NOTE: make sure that initial data is **SANITIZED** and **DOES NOT** contain closing script tags!

See also `/index.html` as an example.

```
<html>
<body>
  <script>
    window.initialData = {
      breadcrumb: {}
    };
  </script>
  ...
  <script>
    window.initialData.breadcrumb.items = { /* ... */ };
  </script>
  <script src="vue-app.js"></script>
</body>
</html>
```

#### Props

**This approach should only be used sparingly.**

If data is only needed by one specific component and most likely will not be modified during runtime, it's ok to use props to hand over data.

```html
<html>
  <body>
    <c-component title="{{ data.title }}"></c-component>
  </body>
</html>
```

#### Slots

**This approach should only be used sparingly.**

In cases where HTML is pre-rendered by twig, slots can be used to give the HTML output to a component.

```html
<html>
  <body>
    <l-content-25-75>
      <ul slot="sidebar">
        <li>Foo</li>
        <li>Baa</li>
      </ul>

      {% if data.children is empty %}
      <h1>No items</h1>
      {% else %}
      <h1>We found {{ data.amount }} items.</h1>
      {% endif %}
    </l-content-25-75>
  </body>
</html>
```

## Translations

All text which is defined in frontend MUST be placed trough translations. There should NOT be any hard coded inline text in the component templates or JavaScript.

### Plugin

We use the [vue-i18n](https://github.com/kazupon/vue-i18n) plugin to handle translations. This tool also allows us to handle localizations (e.g. number or date formats). The documentation can be found [here](https://kazupon.github.io/vue-i18n/guide/started.html).

We discovered that the provided directive `v-t` accelerates the memory leak issue in IE11 since it creates copies of the translation JSON for each use (as of v8.15.3). For this reason, please use the `{{$t()}}` method.

### Keys

Translations should be marked with a specific translation key. Don't use English text as ab identifier key, since it might interfere with other uses in the application or can simply have different meanings in other languages, that need to be distinguished.

The key should always be namespaced with the components name. E.g. `c-component.specificKey`

```js
// Bad
this.$t('Some translateable text.');

// Good
this.$t('e-button.defaultLabel');
```

### Placeholders

vue-i18n allows the usage of [placeholders](https://kazupon.github.io/vue-i18n/guide/formatting.html#named-formatting). This means you should add dynamic parts with a placeholder to the translation and not concatenate them in the component template or JavaScript.

### Pluralization

Be aware that [vue-i18n](https://github.com/kazupon/vue-i18n) also supports a [pluralization](https://kazupon.github.io/vue-i18n/guide/pluralization.html) syntax. So you should not define multiple translations and then switch them in templates.

### Use outside of component or Vue instance

If you need to use translations outside of a component or Vue instance, where the utilities are injected, you can use the vue-i18n instance which is exported from `setup/i18n.js`.

```javascript
import { i18n } from '@/setup/i18n';

const translation = i18n.global.t('c-add-to-cart.notLoggedInTitle');
```

## Blueprints

In the `/blueprints` folder you'll find templates for several tasks like a new component, test or styleguide entry. Please always base new files on this blueprints and not on an empty or copied existing file.

## Best practice

TBD

## Optimization

We have several possibilities/tools to optimize the size and speed of our application. This section will give you a few hints how to tweak it.

### Functional components

Vue allows us to also create `functional components`, which are basically just stateless functions and meant for a single render. Therefore the rendering itself is much faster while no components instance is cluttering the browser cache.

You can read more about this practice [here](https://vuejs.org/guide/extras/render-function.html#Functional-Components).

### Async components

In large applications, we may need to divide the app into smaller chunks and only load a component from the server when it's needed. To make that possible, Vue has a `defineAsyncComponent` function. Async Components are described [here](https://vuejs.org/guide/components/async).

You can find more about how to use this with Vue components [here](https://vuejs.org/guide/essentials/component-basics.html#Async-Components).

Vite automatically rewrites code-split dynamic import calls with a preload step. Find more infos [here](https://vitejs.dev/guide/features.html#async-chunk-loading-optimization).

### Critical CSS

Delivering critical CSS to the browser trough the HTML head can drastically decrease the time until first render. As long as the HTML file itself is gziped still below 14kb. Therefore we decided to add a manual possibility to define critical CSS styles, which will be extracted in a separate `*.critical.css` file during the build.

You can read more about critical CSS [here](https://css-tricks.com/annotating-critical-css/) and the tool we're using [here](https://github.com/mrnocreativity/postcss-critical-split)

### SVG usage

Check svg files delivered from designers and remove unnecessary attributes like "title" (because title attribute will displayed on hover-state)

### Themes

Theme styles are delivered seperatly in a \*.css file. In this files are the global css-vars defined which can be used in every vue component.

- For the available theme colors check the theme files: `app/setup/scss/themes/theme-**.scss`
- Vue mixin for including theme class-names into component `app/mixins/themes.js`
- The current theme is always available in the store `app/store/modules/session/index.js`
- Developers can always use the SASS color variables `$color-primary--1,...`, the mapping of the SASS variable will handle the usage of a CSS variable, BUT: you have to use the --rgb SASS variable for a rgba() use case
- [Infos css variables](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_variables) (For the IE polyfill we use [this](https://github.com/jhildenbiddle/css-vars-ponyfill))

Usage example:

```scss
.c-class {
  color: $color-primary--1;
  background: linear-gradient(to right, $color-gradient--2-0, $color-gradient--2-1);
  background-color: rgba($color-primary--1--rgb, 0.5);
}
```

## Living styleguide

The living styleguide is defined in two parts: one is documenting all available Vue components of the project, in the second one you can create example pages to test and share the design with the client or developer.

### File system

Please note, that the living styleguide has its on section in `/app/styleguide` where you can find `components`, `routes` and anything else, which is only related to the living styleguide. This makes it more easy to identify and split out unneeded code during the build.

## Vite

### Path alias

Vite is pre-configured to support [CSS @import](https://vitejs.dev/guide/features.html#glob-import-caveats) inlining via postcss-import. Vite aliases are also respected for CSS @import. In addition, all CSS url() references, even if the imported files are in different directories, are always automatically rebased to ensure correctness.

Thanks to this feature, you don't need to define relative paths when importing one JavaScript file into an other. The `@` alias stands for the application root (`/app`). So for example you can just write `import options from '@/setup/options'` in any file to import the `options.js` file from the `setup` folder without caring about relative path resolving.

## Build chain

The build chain uses a combined solution of TypeScript and Rollup and optional Babel:

1. Since Vite ships with TypeScript typing it shows TS errors and compiles the TypeScript to Javascript files
2. Vite uses [Rollup](https://rollupjs.org/) which compiles the Javascript files to the final output based on browserlist

## Node.js and NPM

Please see the separate [package.md](package.md).

## Configuration files

### .babelrc

The configuration file for the Babel compiler. Please note, that the browser version configuration is taken from the `browserslist` section in `package.json`.

### .editorconfig

The `.editorconfig` file in the project root defines project defaults for your IDE like indent and type of line-breaks. Please make sure that your IDE is configured to read this file. Help and plugins can be found [here](https://editorconfig.org/#download).

### .eslintignore

Defines the folders/files which should not be linted by ESLint.

### eslintrc.js

ESLint setup for the current project.

### .gitignore

Tells git which folders/files should not be part of the repository.

### .npmrc

[NPM configuration](https://docs.npmjs.com/files/npmrc). By default `npm` will install new packages with the version info prefix `^`, which means, that minor version updates can be installed automatically. Past projects have shown, that this behaviour can lead to problems, since minor updates are often not backwards compatible. Therefore we replace the prefix with `~` which by default only allows patch updates and therefore gives us less headache during development.

### .postcssrc.js

PostCSS configuration. PostCSS is used for **browser prefixing**, **minification** and **critical CSS** splitting of the style definitions.

### .stylelintrc.js

Stylelint setup for the current project.

### tsconfig.json

TypeScript configuration for the current project.

## Known issues

### Node.js & NPM

#### Stale

If you get a warning about `Using stale package data`, try to clear your npm cache before installing the packages:

```
$ npm cache clean --force
```

#### Installing packages with `git+` or `ssh+` removes other packages

This seems to be a bug in older npm version. Please make sure to at least use npm 5.7.1.

see https://github.com/npm/npm/issues/17379

#### Error when installing mozjpeg #1

If you should get the following error when installing mozjpeg on MacOS

```
Command failed: autoreconf -fiv
```

Try to fix it by installing the following brew packages:

```
$ brew install automake autoconf libtool
```

#### Error when installing mozjpeg #2

If you get the following errors when installing mozjpeg on MacOS

```
./configure: line 13758: syntax error near unexpected token `libpng,'
./configure: line 13758: `PKG_CHECK_MODULES(libpng, libpng, HAVE_LIBPNG=1,'
```

Install or update `pkg-config`:

```
$ brew install pkg-config

# OR

$ brew upgrade pkg-config
```

#### Error when installing mozjpeg #3

If you get the following errors when installing mozjpeg on MacOS

```
configure: error: installation or configuration problem: assembler cannot create object files.
```

Install or update `nasm`:

```
$ brew install nasm

# OR

$ brew upgrade nasm
```

## Vite integration todos

- [ ] Apply new ESLint rules to valantic config.

## Roadmap

- [ ] Add 'dangerous' flag for components that use v-html in Storybook.
- [ ] Add 'development' flag for components in Storybook.
- [ ] Add custom elements option to the "initial data" section.

## License

[MIT](https://opensource.org/licenses/MIT)

Copyright (c) 2017-present, valantic CEC Schweiz AG
