### Next
 - (Feature) Adds styleguide build information to the index page.
 - (Feature) Adds support for local webpack dist (Pimcore).
 - (Feature) Adds auto-reload for scss file changes.
 - (Breaking) Refactors e-checkbox, so the styling of the states does not need to rely on JS anymore.
 - (Breaking) Removes e-with-root component.
   - The same behaviour can be achieved with :is="""
 - (Change) Fixes invalid greyscale order.
 - (Change) Replaces deprecated webpack-manifest-plugin with webpack-assets-manifest.
 - (Change) Simplyfies s-readme styles, so they align more with the current project.
 - (Change) Updates browser support table.
 - (Change) Makes form mixin imports absolute to prevent ESLint errors.
 - (Change) Removes deprecated prop from e-checkbox demos.
 - (Change) Adds multi line demo for e-checkbox.
 - (Bug) Fixes broken styleguide build.

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
