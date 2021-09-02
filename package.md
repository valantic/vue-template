# NPM packages

## Scripts

There are several scripts that will support you during the development and deploy process. In the end you'll probably only need two or three of them, since they often call each other.

### Common

#### `npm run build`

Creates the production build of the current code and moves it to the `/dist` folder. This will also perform **code splitting**, **critical CSS splitting** and **minification/uglyfication**. `npm run test` **MUST** be executed before building!

> NOTE: the environment had to be defined explicitly on the NODE_ENV. webpack's "--mode production" did not work, because the config was requested multiple times but switched to "development" on the second request. See https://github.com/webpack/webpack/issues/6460

#### `npm run dev`

Starts the development-environment with styleguide example pages. Please note, that for performance reasons no minification, uglyfication and CSS extraction is performed.

#### `npm run dev:s` or `npm run styleguide`

Starts [Vue-Styleguidist](https://github.com/vue-styleguidist/vue-styleguidist) in a separate webpack and localhost instance.

#### `npm run test`

This will test the current state of CSS and JS code. Tests **MUST** be executed before creating a build.

#### All scripts

* `npm run clean:caches` - Clears linter caches.
* `npm run dev` - See above.
* `npm run dev:s` - See above.
* `npm run jest` - Executes Jest tests.
* `npm run styleguide` - See above.
* `npm run test` - See above.
* `npm run build` - See above.
* `npm run build:profile` - Runs a build and shows a package content overview
* `npm run build:styleguide` - Creates a standalone build of the development and component styleguide.
* `npm run build:watch` - Allows to develop with a continuous productive build.

## Dependencies

### Project

### Template

- [axios](https://www.npmjs.com/package/axios) - Promise based HTTP client for the browser and node.js.
  > core
- [core-js](https://www.npmjs.com/package/core-js) - Modular standard library for JavaScript. Includes polyfills for ECMAScript up to 2019: promises, symbols, collections, iterators, typed arrays, many other features, ECMAScript proposals, some cross-platform WHATWG / W3C features and proposals like URL. You can load only required features or use it without global namespace pollution.
  > core, polyfill
- [css-vars-ponyfill](https://www.npmjs.com/package/css-vars-ponyfill) - A ponyfill that provides client-side support for CSS custom properties (aka "CSS variables") in legacy and modern browsers.
  > core, polyfill, ie11
- [dayjs](https://www.npmjs.com/package/dayjs) - Fast 2kB alternative to Moment.js with the same modern API.
  > c-date-picker-input, c-date-picker-range
- [picturefill](https://www.npmjs.com/package/picturefill) - A responsive image polyfill.
  > core, polyfill, ie11
- [swiper](https://www.npmjs.com/package/swiper) - Swiper is the free and most modern mobile touch slider with hardware accelerated transitions and amazing native behavior.
  > c-swiper-modal, c-swiper-gallery, c-swiper-hero
- [vue](https://www.npmjs.com/package/vue) - Vue.js is a progressive, incrementally-adoptable JavaScript framework for building UI on the web.
  > core
- [vue-i18n](https://www.npmjs.com/package/vue-i18n) - Internationalization plugin for Vue.js
  > core
- [vuex](https://www.npmjs.com/package/vuex) - Centralized State Management for Vue.js.
  > core


## Dev-Dependencies

### Project

### Template
- [@babel/core](https://www.npmjs.com/package/@babel/core) - JS compiler to create ES5 code from ES2015+.
  > webpack
- [@babel/eslint-parser](https://www.npmjs.com/package/@babel/eslint-parser) - babel-eslint allows you to lint ALL valid Babel code with the fantastic ESLint.
  > eslint
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
- [babel-jest](https://www.npmjs.com/package/babel-jest) - Compiles modern JavaScript for Jest.
  > test environment
- [babel-loader](https://www.npmjs.com/package/babel-loader) - This package allows transpiling JavaScript files using Babel and webpack.
  > webpack
- [clean-webpack-plugin](https://www.npmjs.com/package/clean-webpack-plugin) - A webpack plugin to remove/clean your build folder(s).
  > webpack
- [css-loader](https://www.npmjs.com/package/css-loader) - The css-loader interprets @import and url() like import/require() and will resolve them.
  > webpack
- [cssnano](https://www.npmjs.com/package/cssnano) - A modular CSS minifier, built on top of the PostCSS ecosystem.
  > webpack, scss
- [eslint](https://www.npmjs.com/package/eslint) - ESLint is a tool for identifying and reporting on patterns found in ECMAScript/JavaScript code.
  > eslint
- [eslint-config-airbnb-base](https://www.npmjs.com/package/eslint-config-airbnb-base) - This package provides Airbnb's base JS .eslintrc (without React plugins) as an extensible shared config.
  > eslint
- [eslint-config-valantic](https://www.npmjs.com/package/eslint-config-valantic) - The default ESLint config of valantic. .
  > eslint
- [eslint-import-resolver-webpack](https://www.npmjs.com/package/eslint-import-resolver-webpack) - Webpack-literate module resolution plugin for eslint-plugin-import.
  > webpack, eslint
- [eslint-plugin-import](https://www.npmjs.com/package/eslint-plugin-import) - This plugin intends to support linting of ES2015+ (ES6+) import/export syntax, and prevent issues with misspelling of file paths and import names.
  > eslint
- [eslint-plugin-vue](https://www.npmjs.com/package/eslint-plugin-vue) - Official ESLint plugin for Vue.js
  > eslint
- [eslint-webpack-plugin](https://www.npmjs.com/package/eslint-webpack-plugin) - A ESLint plugin for webpack.
  > webpack, eslint
- [faker](https://www.npmjs.com/package/faker) - Generate massive amounts of fake data in the browser and node.js.
  > development environment, mock data
- [file-loader](https://www.npmjs.com/package/file-loader) - The file-loader resolves import/require() on a file into a url and emits the file into the output directory.
  > webpack
- [friendly-errors-webpack-plugin](https://www.npmjs.com/package/friendly-errors-webpack-plugin) - Friendly-errors-webpack-plugin recognizes certain classes of webpack errors and cleans, aggregates and prioritizes them to provide a better Developer Experience.
  > webpack
- [html-webpack-plugin](https://www.npmjs.com/package/html-webpack-plugin) - Plugin that simplifies creation of HTML files to serve your bundles.
  > webpack
- [husky](https://www.npmjs.com/package/husky) - Git hooks made easy.
  > development environment, eslint, test environment
- [image-webpack-loader](https://www.npmjs.com/package/image-webpack-loader) - Image loader module for webpack. Minify PNG, JPEG, GIF, SVG and WEBP images with imagemin.
  > webpack
- [jest](https://www.npmjs.com/package/jest) - Delightful JavaScript Testing.
  > test environment
- [jest-transform-stub](https://www.npmjs.com/package/jest-transform-stub) - Jest doesn't handle non JavaScript assets by default.
  > test environment
- [launch-editor-middleware](https://www.npmjs.com/package/launch-editor-middleware) - Open file in editor from Node.js.
  > development environment
- [lint-staged](https://www.npmjs.com/package/lint-staged) - Run linters against staged git files and don't let 💩 slip into your code base!
  > husky, development environment, eslint, test environment
- [mini-css-extract-plugin](https://www.npmjs.com/package/mini-css-extract-plugin) - This plugin extracts CSS into separate files.
  > webpack
- [postcss-loader](https://www.npmjs.com/package/postcss-loader) - Loader for webpack to process CSS with PostCSS.
  > webpack, scss
- [sass](https://www.npmjs.com/package/sass) - Node.js bindings to libsass.
  > webpack, scss
- [sass-loader](https://www.npmjs.com/package/sass-loader) - Loads a Sass/SCSS file and compiles it to CSS.
  > webpack, scss
- [sass-resources-loader](https://www.npmjs.com/package/sass-resources-loader) - This loader will @import your SASS resources into every required SASS module.
  > webpack, scss
- [stylelint](https://www.npmjs.com/package/stylelint) - A mighty, modern linter that helps you avoid errors and enforce conventions in your styles.
  > stylelint
- [stylelint-config-valantic](https://www.npmjs.com/package/stylelint-config-valantic) - Default valantic configuration for stylelint.
  > stylelint
- [stylelint-webpack-plugin](https://www.npmjs.com/package/stylelint-webpack-plugin) - A Stylelint plugin for webpack
  > webpack, stylelint
- [terser-webpack-plugin](https://www.npmjs.com/package/terser-webpack-plugin) - This plugin uses terser to minify your JavaScript.
  > webpack
- [vue-jest](https://www.npmjs.com/package/vue-jest) - Jest Vue transformer with source map support.
  > test environment
- [vue-loader](https://www.npmjs.com/package/vue-loader) - webpack loader for Vue Single-File Components.
  > webpack
- [vue-markdown-loader](https://www.npmjs.com/package/vue-markdown-loader) - Convert Markdown file to Vue Component using markdown-it.
  > development environment
- [vue-router](https://www.npmjs.com/package/vue-router) - The official router for Vue.js.
  > core
- [vue-styleguidist](https://www.npmjs.com/package/vue-styleguidist) - Isolated Vue component development environment with a living style guide.
  > development environment
- [webpack](https://www.npmjs.com/package/webpack) - webpack is a module bundler.
  > webpack
- [webpack-assets-manifest](https://www.npmjs.com/package/webpack-assets-manifest) - Creates a manifest.json to map webpack input with output.
  > webpack
- [webpack-bundle-analyzer](https://www.npmjs.com/package/webpack-bundle-analyzer) - Visualize size of webpack output files with an interactive zoomable treemap.
  > webpack
- [webpack-cli](https://www.npmjs.com/package/webpack-cli) - The official CLI of webpack.
  > webpack
- [webpack-dev-serve](https://www.npmjs.com/package/webpack-dev-server) - Use webpack with a development server that provides live reloading.
  > webpack, development environment
