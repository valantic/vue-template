### Next
 - (Breaking) Changes the query hash in the webpack config to a file hash by default to prevent proxy caching.
 - (Change) Changes remote asset protocols to https to prevent security exceptions on styleguide server.
 - (Change) Reverts router mode to 'history' for styleguide build.

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
