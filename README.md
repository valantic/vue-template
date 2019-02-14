# vue-template

This is a custom Vue template which is based on the idea of using BEM, CriticalCSS and a living styleguide while building mainly not a SPA but a set of components used inside a CMS like system.

## Introduction

### About this readme

If you're new on this project, please take your time and read carefully through this documentation and, if needed, through the linked documentations.

Please note, that there is also a `package.md` file which contains additional information about the used NPM packages and available NPM scripts. 

### Before starting

This template, in most parts, follows the default Vue conventions. Where this is not the case, you'll find documentation on the customizations in this readme.

Before you start working on this project, you **MUST** read the following documentations:

* [Vue Introduction](https://vuejs.org/v2/guide/)
* [Vue Styleguide](https://vuejs.org/v2/style-guide/)
* [Vue component styleguide](https://github.com/pablohpsilva/vuejs-component-style-guide)
* [package.md](package.md)

You **MUST** also be familiar with the following tools:

* [BEM](http://getbem.com/)
* [ES2015+](https://babeljs.io/learn-es2015/) (especially with Classes, Const/Let, Modules, Promises)
* [ESLint](https://eslint.org/)
* [Git](https://git-scm.com/)
* [GitFlow](http://nvie.com/posts/a-successful-git-branching-model/)
* [Jest](https://facebook.github.io/jest/)
* [NPM](https://docs.npmjs.com/getting-started/what-is-npm)
* [SCSS](https://sass-lang.com/)
* [Stylelint](https://stylelint.io/)
* Your IDE

You **SHOULD** also know the following tools:

* [webpack](https://webpack.js.org/)

### Before installing

You **MUST** install the following tools globally, before you can use this template:

* [Node.js & NPM](https://nodejs.org/en/) (See package.json for the required versions. Use a version manager in case you work on different projects (e.g. [n](https://www.npmjs.com/package/n) or [nvm](https://github.com/creationix/nvm/blob/master/README.md))).
* [Vue-Devtools](https://github.com/vuejs/vue-devtools) for your browser.
* [Homebrew](http://brew.sh/) is most likely also needed for 3rd party tools.
* A modern IDE

### Prepare your IDE

Please make sure your IDE is configured to apply [ESLint](https://eslint.org/docs/user-guide/integrations), [Stylelint](https://github.com/stylelint/stylelint/blob/master/docs/user-guide/complementary-tools.md#editor-plugins) and [.editorconfig](http://editorconfig.org/#download) linting/settings.

## Installation

### Cloning the repository

Note: to execute the following tasks, you may need to register an SSH key for your machine on the repository side. Ask your project manager about where you need to define it. On how you create/copy the SSH key you can read more [here](https://help.github.com/articles/connecting-to-github-with-ssh/). 

Make a local git clone of this project/template by using the following command:

```
$ git clone <repository-url> <[target-folder]>

# If you wan't a clean copy (no history) use the following command
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
$ npm install
```

## This project

> TODO: replace this section with project specific information.

### Browser support

| Operating systems/Devices | Browser | Priority | Breakpoints |
| --- | --- | --- | --- |
| Windows 7 | IE11 | **high** | all |
| Windows 8 | IE11 | **high** | all |
| Windows 10 | IE11 | **high** | all |
| Windows 10 | Edge (newest) | **high** | all |
| Windows 10 | Chrome (newest) | _medium_ | all |
| Windows 10 | Firefox (newest) | _medium_ | all |
| Mac OS X 10.13 | Safari (newest) | _medium_ | all |
| Mac OS X 10.13 | Chrome (newest) | low | all |
| Mac OS X 10.13 | Firefox (newest) | low | all |
| Phone 8 (iOS 11) | Safari (newest) | low | xxs, xs, sm (md) |
| Phone 8 Plus (iOS 11) | Safari (newest) | low | xxs, xs, sm (md) |
| Phone X (iOS 11) | Safari (newest) | low | xxs, xs, sm (md) |
| Galaxy S8 (Android 7) | Chrome Mobile (newest) | low | xxs, xs, sm (md) |
| iPad Pro (iOS 11) | Safari Mobile (newest) | low | sm, md, lg |
| iPad 5th (iOS 11) | Safari Mobile (newest) | low | sm, md, lg |

### Running the project

A complete list of available NPM scripts can be found in [package.md](package.md).

Please make sure to always run Node/NPM tasks trough an NPM script. Installing NPM packages globally in calling them directly is bad practice and can cause inconsistency because of version differences (e.g. install `webpack` as a project dependency and then create an NPM script, which runs this project related `webpack` instead of a global one).

To start developing you only need to execute the `dev` script from your console:

```
$ npm run dev
```

The app should now run on [http://localhost:8080](http://localhost:8080)

#### Styleguidist

If you prefer to develop inside the component styleguide run the following script instead or in a new tab:

```
$ npm run dev:styleguide
```

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
|- app                  Main folder of the application
.  |- assets            Assets for the application
.  |- components        Components for the application
.  |- directives        Custom Vue directives
.  |- helpers           Helper functions which can be used to handle certain tasks
.  |- mixins            Vue mixins
.  |- services          Single instance services like event bus or viewport state handler
.  |- setup             Configuration and setup of the application
.  |- store             Vuex store and modules
.  |- styleguide        Assets, components, mock data and routes for the stylguide 
.  |- translations      Translations for the application
|- blueprints           File blueprints
|- (dist)               Build folder
|- (node_modules)       Node modules used by this project
|- static               Static files which will be copied to `dist` during build
|- stats                webpack profile and monitor files
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

We added the [vue-bem](https://github.com/verstaerker/vue-bem) plugin for Vue to improve the handling of BEM classes and especially modifiers in Vue components. Just use `v-bem:<element>.<staticModifiers>="<dynamicModifiers>"` on any template element to add blocks, elements and modifiers.

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

* Selector concatenation is allowed:
  * to concatenate block and element
  * to add states
* Selector concatenation is not allowed:
  * to nesting more than two layers (exceptionally allowed 3rd layer for state selector)
  * to assemble an element name or modifier name

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

* [Official Vue Style Guide](https://vuejs.org/v2/style-guide/)
* [Vue.js Component Style Guide](https://github.com/pablohpsilva/vuejs-component-style-guide)

#### Additional notes

* This project uses always `kebab-case` for [Single-file component filename casing](https://vuejs.org/v2/style-guide/#Single-file-component-filename-casing-strongly-recommended), [Component name casing in JS/JSX](https://vuejs.org/v2/style-guide/#Component-name-casing-in-JS-JSX-strongly-recommended) and [Component name casing in templates ](https://vuejs.org/v2/style-guide/#Component-name-casing-in-templates-strongly-recommended).
* We use BEM namespace `e-` for [base component names](Bhttps://vuejs.org/v2/style-guide/#Base-component-names-strongly-recommended).

### Single file components

We build Vue components as [single file components](https://vuejs.org/v2/guide/single-file-components.html). All production components are placed within `/app/components` (styleguide only components in `/app/styleguide/components`).

#### Naming

* Naming follows BEM block convention.
* Naming MUST always be singular.

## Vuex

[Vuex](https://vuex.vuejs.org/en/) is a state management pattern + library for Vue.js applications. It serves as a centralized store for all the components in an application, with rules ensuring that the state can only be mutated in a predictable fashion.

Vuex allows us to divide our store into modules and make it more scalable. In this case each module (index.js) contains its own state, mutations, actions and getters. For this project the following setup will be used:

### Modularity 
```
store
  |- index.js
  |- cart
  | |- index.js
  |- navigation
  | |- index.js
  |- session
  | |- index.js
````

The main ```app/store/index.js``` file contains all modules, which are imported.

**Note: the module name MUST be written in singular.**


```
import Vue from 'vue';
import Vuex from 'vuex';
 
// modules
import cart from './modules/cart';
import navigation from './modules/navigation';;
import session from './modules/session';
 
Vue.use(Vuex);
 
export default new Vuex.Store({
  /**
   * state, actions & getters
   * must be defined within modules
   * */
  modules: {
    cart,
    navigation,
    session,
  },
});
```

### Namespacing
By default, actions, mutations and getters inside modules are still registered under the global namespace. To make sure all modules are more self-contained and reusable, we make use of the 'namespace' option, which automatically adds a prefix for the specific module.

```
// store/modules/cart/index.js

export default {
  namespaced: true,
  state: {},
  getters: {}, // e.g. -> getters['cart/product']
  mutations: {},
  actions: {},
};
```

As the application grows it's possible to even split the module again e.g. into a structure like this:

```
store
  |- index.js
  |- cart
  | |- index.js
  | |- getters.js
  | |- mutations.js
  | |- actions.js
  |- navigation
  | |- index.js
  | |- getters.js
  | |- mutations.js
  | |- actions.js
  |- session
  | |- index.js
  | |- getters.js
  | |- mutations.js
  | |- actions.js
```

### Initial data

To inject initial data into the Vuex store, we decided to prepare mutation, which handle an initial payload.

```javascript
// main.js

window.vm = new Vue();
```

```
<html>
<body>
  <script src="vue-app.js"></script>
  <script>
    var commit = window.vm.$store.commit;
    var payload = {/* data */};
     
    commit('<storeModule>/<propertySetter>', payload);
</script>
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

All text which is defined in frontend MUST be placed trough translations. There should not be any hard coded inline text in the component templates or JavaScript.

### Plugin

We use the [vue-i18n](https://github.com/kazupon/vue-i18n) plugin to handle translations. This tool also allows us to handle localizations (e.g. number or date formats). The documentation can be found [here](https://kazupon.github.io/vue-i18n/guide/started.html).

Use as directive:
```html
<span v-t="'c-example.title'"></span>
```

Use as directive inside a transition:
```html
<transition name="fade">
  <span v-if="toggle" v-t.preserve="'c-example.title'"></span>
</transition>
```

### Placeholders

vue-i18n allows the usage of [placeholders](https://kazupon.github.io/vue-i18n/guide/formatting.html#named-formatting). This means you should add dynamic parts with a placeholder to the translation and not concatenate them in the component template or JavaScript.

### Pluralization

Be aware that [vue-i18n](https://github.com/kazupon/vue-i18n) also supports a [pluralization](https://kazupon.github.io/vue-i18n/guide/pluralization.html) syntax. So you should not define multiple translations and then switch them in templates.

### Use outside of component or Vue instance

If you need to use translations outside of a component or Vue instance, where the utilities are injected, you can use the vue-i18n instance which is exported from `setup/i18n.js`.

```javascript
import { i18n } from '@/setup/i18n';
 
const translation = i18n.t('c-add-to-cart.notLoggedInTitle');
```

## Blueprints

In the `/blueprints` folder you'll find templates for several tasks like a new component, test or styleguide entry. Please always base new files on this blueprints and not on an empty or copied existing file.

## Best practice

TBD

## Optimization

We have several possibilities/tools to optimize the size and speed of our application. This section will give you a few hints how to tweak it.

### Functional components

Vue allows us to also create `functional components`, which are basically just stateless functions and meant for a single render. Therefore the rendering itself is much faster while no components instance is cluttering the browser cache.

You can read more about this practice [here](https://vuejs.org/v2/guide/render-function.html#Functional-Components).

### Async components

Vue is able to load components asynchronously. While this should be used sparingly, since a huge amount of files will also slow down the whole application, it can be used to load big parts which are only used in a very specific an lesser reached part of the application on demand (e.g. the checkout in a shop or an extensive configurator for a certain task).

In webpack this separate parts of the application are called `chunks`. You can find more about how to use this with Vue components [here](https://vuejs.org/v2/guide/components.html#Async-Components). Be also aware, that you can define a specific chunk name by adding a `webpackChunkName` comment. This webpack feature is described [here](https://webpack.js.org/api/module-methods/#import-).

### Critical CSS

Delivering critical CSS to the browser trough the HTML head can drastically decrease the time until first render. As long as the HTML file itself is gziped still below 14kb. Therefore we decided to ad a manual possibility to define critical CSS styles, which will be extracted in a separate `*.critical.css` file during the build.

You can read more about critical CSS [here](https://css-tricks.com/annotating-critical-css/) and the tool we're using [here](https://github.com/mrnocreativity/postcss-critical-split)

### SVG usage
Check svg files delivered from designers and remove unnecessary attributes like "title" (because title attribute will displayed on hover-state)

### Themes
Theme styles are delivered seperatly in a *.css file. In this files are the global css-vars defined which can be used in every vue component.
* For the available theme colors check the theme files: `app/setup/scss/themes/theme-**.scss`
* Vue mixin for including theme class-names into component `app/mixins/themes.js`
* The current theme is always available in the store `app/store/modules/session/index.js`
* Developers can always use the SASS color variables `$color-primary--1,...`, the mapping of the SASS variable will handle the usage of a CSS variable, BUT: you have to use the --rgb SASS variable for a rgba() use case
* [Infos css variables](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_variables) (For the IE polyfill we use [this](https://github.com/jhildenbiddle/css-vars-ponyfill))

Usage example:
```scss
  .class {
    color: $color-primary--1;
    background: linear-gradient(to right, $color-gradient--2-0, $color-gradient--2-1);
    background-color: rgba($color-primary--1--rgb, 0.5);
  }
```

## Living styleguide

The living styleguide is defined in two parts: one is documenting all available Vue components of the project, in the second one you can create example pages to test and share the design with the client or developer.

### File system

Please note, that the living styleguide has its on section in `/app/styleguide` where you can find `components`, `routes` and anything else, which is only related to the living styleguide. This makes it more easy to identify and split out unneeded code during the build.

### Mock data

You can share the mock data from the demo pages with the vue-styleguidist by importing them into the global mixin which is defined inside `app/setup/styleguide.options.js`. They will be merged with the `data()` object of each component which is displayed inside the component styleguide. Access the data with `mockData.<yourKey>` (e.g. `<c-cms-wrapper :components="mockData.cCmsWrapperMockData" />`).

## Webpack

### Path alias

Webpack supports to use an [alias](https://webpack.js.org/loaders/css-loader/#alias) for paths. Thanks to this feature, you don't need to define relative paths when importing one JavaScript file into an other. The `@` alias stands for the application root (`/app`). So for example you can just write `import options from '@/setup/options'` in any file to import the `options.js` file from the `setup` folder without caring about relative path resolving.

## Node.js and NPM

Please see the separate [package.md](package.md).

## Configuration files

### .babelrc

The configuration file for the Babel compiler. Please note, that the browser version configuration is taken from the `browserslist` section in `package.json`.

### .editorconfig

The `.editorconfig` file in the project root defines project defaults for your IDE like indent and type of line-breaks. Please make sure that your IDE is configured to read this file. Help and plugins can be found [here](http://editorconfig.org/#download).

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

## Known issues

### Webpack

#### Webpack does not perform code splitting

Make sure you don't use `babel-plugin-dynamic-import-node` since it parses the import/require statements and therefor removes the possibility to split your code! Use [babel-plugin-syntax-dynamic-import](https://babeljs.io/docs/plugins/syntax-dynamic-import/) instead.

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

## ToDo

* [x] Add info about npm version
* [x] Functional components
* [x] Node scripts
* [x] Inspector
* [x] Must read
* [x] Installation (npm, inspector)
* [x] Best practice
* [x] Minification/Code splitting
* [x] Vue exceptions
* [x] Blueprints
* [x] eslint-plugin-vue https://github.com/vuejs/eslint-plugin-vue
* [x] Data injection/handling
* [x] BEM helper
* [x] BEM guidelines
* [x] Folder structure
* [x] Naming (only singular)
* [x] Vuex & modules
* [x] Axios request mocking https://github.com/ctimmerm/axios-mock-adapter
* [x] Styleguide components
* [x] webpack alias
* [x] webpackChunkName
* [ ] Custom element style reset (e.g. iframe)
* [ ] Fallback image for e-picture
* [x] e-picture should support relation property and fallback image
* [ ] npm update: only update one package at a time, test, then update next.

## License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2017-present, valantic CEC Schweiz AG
