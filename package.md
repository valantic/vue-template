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
- [@babel/core](https://www.npmjs.com/package/@babel/core) - JS compiler to create ES5 code from ES2015+.
  > webpack
- [@babel/plugin-syntax-dynamic-import](https://www.npmjs.com/package/@babel/plugin-syntax-dynamic-import) - Makes @babel/core understand the not yet standardized import() syntax.
  > webpack
- [@babel/preset-env](https://www.npmjs.com/package/@babel/preset-env) - Transform preset, which will transform the input code according to browserlist settings in package.json
  > webpack
- [@vue/test-utils](https://www.npmjs.com/package/@vue/test-utils) - The official test library for Vue.js.
  > test environment
- [autoprefixer](https://www.npmjs.com/package/autoprefixer) - PostCSS plugin to parse CSS and add vendor prefixes to CSS rules using values from caniuse.com.
  > webpack, scss
- [axios-mock-adapter](https://www.npmjs.com/package/axios-mock-adapter) - Axios adapter that allows to easily mock requests.
  > development environment, mock data
- [babel-core](https://www.npmjs.com/package/babel-core/v/7.0.0-bridge.0) - Required by vue-jest and jest tests.
  > webpack setup
- [babel-eslint](https://www.npmjs.com/package/babel-eslint) - babel-eslint allows you to lint ALL valid Babel code with the fantastic ESLint.
  > eslint
- [babel-jest](https://www.npmjs.com/package/babel-jest) - Compiles modern JavaScript for Jest.
  > test environment
- [babel-loader](https://www.npmjs.com/package/babel-loader) - This package allows transpiling JavaScript files using Babel and webpack.
  > webpack
- [clean-webpack-plugin](https://www.npmjs.com/package/clean-webpack-plugin) - A webpack plugin to remove/clean your build folder(s).
  > webpack
- [css-loader](https://www.npmjs.com/package/css-loader) - The css-loader interprets @import and url() like import/require() and will resolve them.
  > webpack
- cssnano
  > webpack, scss
- eslint
  > eslint
- eslint-config-airbnb-base
  > eslint
- eslint-config-valantic
  > eslint
- eslint-import-resolver-webpack
  > eslint
- eslint-plugin-import
  > eslint
- eslint-plugin-vue
  > eslint
- eslint-webpack-plugin
  > webpack, eslint
- faker
  > development environment, mock data
- file-loader
  > webpack
- friendly-errors-webpack-plugin
  > webpack
- html-webpack-plugin
  > webpack
- husky
  > development environment, eslint, test environment
- image-webpack-loader
  > webpack
- jest
  > test environment
- jest-transform-stub
  > test environment
- launch-editor-middleware
  > development environment
- lint-staged
  > husky, development environment, eslint, test environment
- mini-css-extract-plugin
  > webpack
- node-sass
  > webpack, scss
- postcss-loader
  > webpack, scss
- sass-loader
  > webpack, scss
- sass-resources-loader
  > webpack, scss
- stylelint
  > stylelint
- stylelint-config-valantic
  > stylelint
- stylelint-webpack-plugin
  > webpack, stylelint
- stylus
  > stylus
- stylus-loader
  > webpack, stylus
- uglifyjs-webpack-plugin
  > webpack
- vue-jest
  > test environment
- vue-loader
  > webpack
- vue-markdown-loader
  > development environment
- vue-styleguidist
  > development environment
- vue-template-compiler
  > webpack
- webpack
  > webpack
- webpack-bundle-analyzer
  > webpack
- webpack-cli
  > webpack
- webpack-dev-serve
  > webpack, development environment
