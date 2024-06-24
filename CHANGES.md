### Next

- (Feature) Adds component s-navigation-filter for filtering sidebar navigation links
- (Feature) Adds styleguide build information to the index page.
- (Feature) Adds support for local webpack dist (Pimcore).
- (Feature) Adds auto-reload for scss file changes.
- (Breaking) Refactors e-checkbox, so the styling of the states does not need to rely on JS anymore.
- (Breaking) Removes e-with-root component.
  - The same behaviour can be achieved with :is=""
- (Breaking) Sprite support for e-icon.
- (Breaking) Removes touch-device mixin
- (Breaking) Removes c-panel
- (Breaking) Refactors e-picture (inverts sizes definition, adds additional options)
- (Breaking) Issue 168 Replace multiselect
  - Replaces the old c-multiselect component with a new e-multiselect component
  - Refactoring and remove project specific features
  - Makes the component simpler and more generic usable
  - Adds v-model handling
- (Change) Fixes invalid greyscale order.
- (Change) Replaces deprecated webpack-manifest-plugin with webpack-assets-manifest.
- (Change) Simplifies s-readme styles, so they align more with the current project.
- (Change) Updates browser support table.
- (Change) Makes form mixin imports absolute to prevent ESLint errors.
- (Change) Removes deprecated prop from e-checkbox demos.
- (Change) Adds multi line demo for e-checkbox.
- (Change) Adds translation best practices to readme.
- (Change) Enables console errors for HTML inside of translations
- (Update) Updates all NPM packages to the current version. Except:
  - stylus-loader: was removed, because not required anymore
  - stylus: was removed because not required anymore
  - vue-js-modal because version 2.0 is not ready
  - uglifyjs-webpack-plugin: was replaced with terser-webpack-plugin because deprecated
- (Change) Issue 163: Replaces Reboot Styles with Reset npm package, removes some default spacing styles
- (Change) Issue 159: Replace SCSS slash division
  - Updates the sass plugin to version 1.39.2 which makes it possible to use the @use "math:div" function.
  - Replaces the SCSS divisions by "slash" with the math.div() Sass function
  - Activates the `hoistUseStatements` option in the sass-loader plugin
- (Change) Issue 144 / 166:
  - Removes global scss imports
  - Replaces usages of `@import` with `@use` and `@forward`
  - Replaces usages of `@extends` with `@mixins` as extends is not supported by scss namespaces
  - Uses local imports for scss mixins, functions and variables
- (Bug) Fixes broken styleguide build.
- (Breaking) Issue 157: Updates to Vue 3 and Typescript
  - Changes all JS files and Vue SFC files to be written in Typescript
  - Adjusts Store Modules Syntax to be benefit from typings
  - Adjusts custom V-Model Syntax as it is not supported in Vue 3 anymore
  - Replace Mixins by Compositions to benefit from typings
  - Updates Directive Hooks to work with Vue 3
  - Removes IE11 Polyfills as Vue 3 does not support IE11 anymore
  - Removes Spryker related code
  - Removes Components Collapse, CollapseGroup, Modal, ModalStack
  - Removes EventBus as it is not supported anymore in Vue 3
  - Removes Pimcore Directives
- (Change) Issue 171: Updates to Webpack 5

### v7.0.0 (2020-09-29)

- (Breaking) Changes the query hash in the webpack config to a file hash by default to prevent proxy caching.
- (Feature) Adds 'isMobile' computed to the '$viewport' helper/tools.
- (Change) Changes remote asset protocols to https to prevent security exceptions on styleguide server.
- (Change) Reverts router mode to 'history' for styleguide build.
- (Change) Replaces relative imports with alias based ones.
- (Change) Adds postcss as standalone NPM package because it is no longer a dependency of the postcss-loader.
- (Change) Updates roadmap in readme file.
- (Update) Updates all NPM packages to the current version. Except:
  - babel-core because it is still needed by jest/vue-jest
  - babel-eslint because of the issue https://github.com/babel/babel-eslint/issues/815
  - vue-js-modal because version 2.0 is not ready

### v 6.0.0 (2020-08-25)

- (Breaking) Refactors c-modal header component to slot.
- (Feature) New outside click directive.
- (Feature) New e-table component.
- (Bug) Refactors the Google Analytics dataLayer condition. Testing for a native array could be problematic, since it may be replaced during initialisation.
- (Update) Updates all NPM packages to the current version. Except:
  - babel-core because it is still needed by jest/vue-jest
  - babel-eslint because of the issue https://github.com/babel/babel-eslint/issues/815
  - vue-js-modal because version 2.0 is not ready
- (Removed) Removes e-link component.

### v 5.0.0 (2020-07-24)

- Updates all NPM packages to the current version (2020-07-24, except babel-eslint because of an issue, https://github.com/babel/babel-eslint/issues/815)
- Updates and extends Vue Styleguidist documentations
- Replaces styleguide components section in Vue Styleguidist with pages
- Extends e-select with the optional props to define alternative value and label sources
- Extends e-select with the possibility to disable the placeholder entry

### v 4.0.0 (2020-03-20)

- Updates all NPM packages to the current version (2020-03-18, except babel-eslint because of an issue. See https://github.com/babel/babel-eslint/issues/815)
- Removes Vuetify because version 2 created a massive overhead in builded files
- Adds separate translation files for styleguide #77
- Adds state flags for components in styleguidist to track state #69
- Refactors entire webpack configuration
- Adds code splitting for polyfill code #62
- Changes folder structure slightly

### v 3.1.0 (2019-02-14)

- Adds status label to components. #70
- update eslint config. #68
- update vue-i18n. #72
- Add scale validator. #67
- Replace moment.js with dayjs. #73
- Fix issue with backdrop in c-modal.
