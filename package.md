# NPM packages

## Scripts

There are several scripts that will support you during the development and deploy process. In the end you'll probably only need two or three of them, since they often call each other.

### Common

#### `npm run build`

Creates the production build of the current code and moves it to the `/dist` folder. This will also perform **code splitting**, **critical CSS splitting** and **minification/uglyfication**. `npm run test` **MUST** be executed before building!

#### `npm run dev`

Starts the development-environment with styleguide example pages. Please note, that for performance reasons no minification, uglyfication and CSS extraction is performed.

#### `npm run dev:styleguide`

Starts [Vue-Styleguidist](https://github.com/vue-styleguidist/vue-styleguidist) in a separate webpack and localhost instance.

#### `npm run test`

This will test the current state of CSS and JS code. Tests **MUST** be executed before creating a build.

#### All scripts

* `npm run dev` - See above.

## Dependencies

### Project

### Template

* [@babel/plugin-syntax-dynamic-import](https://babeljs.io/docs/plugins/syntax-dynamic-import/) - This plugin is required to use inline (dynamic) module imports (e.g. when importing language files). **Don't use babel-plugin-dynamic-import-node since it breaks code splitting!**


## Dev-Dependencies

### Project

### Template
- @babel/core
- @babel/plugin-syntax-dynamic-import
- @babel/preset-env
- @vue/test-utils
- autoprefixer
- axios-mock-adapter
- babel-core - Required by vue-jest and jest tests.
- babel-eslint
- babel-jest
- babel-loader
- clean-webpack-plugin
- css-loader
- cssnano
- eslint
- eslint-config-airbnb-base
- eslint-config-valantic
- eslint-import-resolver-webpack
- eslint-loader
- eslint-plugin-import
- eslint-plugin-vue
- eslint-webpack-plugin
- faker
- file-loader
- friendly-errors-webpack-plugin
- html-webpack-plugin
- husky
- image-webpack-loader
- jest
- jest-transform-stub
- launch-editor-middleware
- lint-staged
- mini-css-extract-plugin
- node-sass
- postcss-loader
- sass-loader
- sass-resources-loader
- stylelint
- stylelint-config-valantic
- stylelint-webpack-plugin
- stylus
- stylus-loader
- uglifyjs-webpack-plugin
- vue-jest
- vue-loader
- vue-markdown-loader
- vue-styleguidist
- vue-template-compiler
- webpack
- webpack-bundle-analyzer
- webpack-clean
- webpack-cli
- webpack-dev-serve
