# NPM packages

## Scripts

There are several scripts that will support you during the development and deploy process. In the end you'll probably only need two or three of them, since they often call each other.

### Common

#### `npm run build`

Creates the production build of the current code and moves it to the `/dist` folder. This will also perform **code splitting**, **critical CSS splitting** and **minification/uglyfication**. `npm run test` **MUST** be executed before building!

> NOTE: the environment had to be defined explicitly on the NODE_ENV. webpack's "--mode production" did not work, because the config was requested multiple times but switched to "development" on the second request. See https://github.com/webpack/webpack/issues/6460

#### `npm run dev`

Starts the development-environment with styleguide example pages. Please note, that for performance reasons no minification, uglyfication and CSS extraction is performed.

#### `npm run test`

This will test the current state of CSS and JS code. Tests **MUST** be executed before creating a build.

#### All scripts

* `npm run clean:caches` - Clears linter caches.
* `npm run dev` - See above.
* `npm run dev:s` - See above.
* `npm run jest` - Executes Jest tests.
* `npm run test` - See above.
* `npm run build` - See above.
* `npm run build:profile` - Runs a build and shows a package content overview
* `npm run build:watch` - Allows to develop with a continuous productive build.
* `npm run storybook` - Runs storybook server.
* `npm run build:storybook` - Creates storybook build.

## Dependencies

### Project

### Template
- [@vuelidate/core](https://www.npmjs.com/package/@vuelidate/core) - Simple, lightweight model-based validation for Vue.js 2.x & 3.0
  > vuelidate, validation
- [@vuelidate/validators](https://www.npmjs.com/package/@vuelidate/validators) - This is the standalone validators package for Vuelidate.
  > vuelidate, validation
- [axios](https://www.npmjs.com/package/axios) - Promise based HTTP client for the browser and node.js.
  > core
- [body-scroll-lock](https://www.npmjs.com/package/body-scroll-lock) - Enables body scroll locking (for iOS Mobile and Tablet, Android, desktop Safari/Chrome/Firefox) without breaking scrolling of a target element (eg. modal/lightbox/flyouts/nav-menus).
  > c-modal
- [core-js](https://www.npmjs.com/package/core-js) - Modular standard library for JavaScript. Includes polyfills for ECMAScript up to 2019: promises, symbols, collections, iterators, typed arrays, many other features, ECMAScript proposals, some cross-platform WHATWG / W3C features and proposals like URL. You can load only required features or use it without global namespace pollution.
  > core, polyfill
- [pinia](https://www.npmjs.com/package/pinia) - Centralized State Management for Vue.js.
  > core
- [dayjs](https://www.npmjs.com/package/dayjs) - Fast 2kB alternative to Moment.js with the same modern API.
  > c-date-picker-input, c-date-picker-range
- [embla-carousel](https://www.npmjs.com/package/embla-carousel) - Embla Carousel is a bare bones carousel library with great fluid motion and awesome swipe precision. It's library agnostic, dependency free and 100% open source. Build awesome carousels by extending Embla Carousel with your own CSS and JavaScript.
  > c-slider
- [embla-carousel-autoplay](https://www.npmjs.com/package/embla-carousel-autoplay) - An autoplay plugin for Embla Carousel.
  > c-slider
- [the-new-css-reset](https://www.npmjs.com/package/the-new-css-reset) - This new CSS reset is using the new CSS features
  > css
- [vue](https://www.npmjs.com/package/vue) - Vue.js is a progressive, incrementally-adoptable JavaScript framework for building UI on the web.
  > core
- [vue-i18n](https://www.npmjs.com/package/vue-i18n) - Internationalization plugin for Vue.js
  > core
## Dev-Dependencies

### Project

### Template
- [@babel/core](https://www.npmjs.com/package/@babel/core) - JS compiler to create ES5 code from ES2015+.
  > webpack
- [@babel/plugin-syntax-dynamic-import](https://www.npmjs.com/package/@babel/plugin-syntax-dynamic-import) - Makes @babel/core understand the not yet standardized import() syntax.
  > webpack
- [@babel/preset-env](https://www.npmjs.com/package/@babel/preset-env) - Transform preset, which will transform the input code according to browserlist settings in package.json
  > webpack
- [@faker-js/faker](https://www.npmjs.com/package/@faker-js/faker) - Generate massive amounts of fake (but realistic) data for testing and development.
  > development environment, mock data
- [@storybook/addon-actions](https://www.npmjs.com/package/@storybook/addon-actions) - Storybook Addon Actions can be used to display data received by event handlers in Storybook.
  > storybook
- [@storybook/addon-essentials](https://www.npmjs.com/package/@storybook/addon-essentials) - Storybook Essentials is a curated collection of addons to bring out the best of Storybook.
  > storybook
- [@storybook/addon-interactions](https://www.npmjs.com/package/@storybook/addon-interactions) - Storybook Addon Interactions enables visual debugging of interactions and tests in Storybook.
  > storybook
- [@storybook/builder-webpack5](https://www.npmjs.com/package/@storybook/builder-webpack5) - Builder implemented with webpack5 and webpack5-compatible loaders/plugins/config, used by @storybook/core-server to build the preview iframe.
  > storybook
- [@storybook/manager-webpack5](https://www.npmjs.com/package/@storybook/manager-webpack5) - Builder implemented with webpack5 and webpack5-compatible loaders/plugins/config, used by @storybook/core-server to build the manager UI.
  > storybook
- [@storybook/preset-scss](https://www.npmjs.com/package/@storybook/preset-scss) - One-line SCSS configuration for storybook.
  > storybook
- [@storybook/testing-library](https://www.npmjs.com/package/@storybook/testing-library) - Storybook integration for Testing Library, instrumented for use with the Interactions addon.
  > storybook
- [@storybook/vue3](https://www.npmjs.com/package/@storybook/vue3) - Storybook for Vue 3 is a UI development environment for your Vue 3 components.
  > storybook
- [@types/body-scroll-lock](https://www.npmjs.com/package/@types/body-scroll-lock) - This package contains type definitions for body-scroll-lock
  > types
- [@types/jest](https://www.npmjs.com/package/@types/jest) - This package contains type definitions for Jest.
  > types jest
- [@types/resize-observer-browser](https://www.npmjs.com/package/@types/resize-observer-browser) - This package contains type definitions for resize-observer-browser.
  > types
- [@types/webpack-env](https://www.npmjs.com/package/@types/webpack-env) - This package contains type definitions for webpack (module API).
  > types
- [@typescript-eslint/eslint-plugin](https://www.npmjs.com/package/@typescript-eslint/eslint-plugin) - An ESLint plugin which provides lint rules for TypeScript codebases.
  > eslint
- [@typescript-eslint/parser](https://www.npmjs.com/package/@typescript-eslint/parser) - An ESLint parser which leverages TypeScript ESTree to allow for ESLint to lint TypeScript source code.
  > eslint
- [@valantic/webpack-dependency-hint](https://www.npmjs.com/package/@valantic/webpack-dependency-hint) - A Webpack plugin that delivers a console output when a dependency check is recommended.
  > environment
- [@vue/eslint-config-typescript](https://www.npmjs.com/package/@vue/eslint-config-typescript) - This ruleset is the base configuration for Vue-TypeScript projects.
  > eslint
- [@vue/test-utils](https://www.npmjs.com/package/@vue/test-utils) - The official test library for Vue.js.
  > test environment
- [@vue/vue3-jest](https://www.npmjs.com/package/@vue/vue3-jest) - Jest transformer for Vue Single File Components.
  > jest
- [ajv](https://www.npmjs.com/package/ajv) - The fastest JSON validator for Node.js and browser.
  > environment
- [autoprefixer](https://www.npmjs.com/package/autoprefixer) - PostCSS plugin to parse CSS and add vendor prefixes to CSS rules using values from caniuse.com.
  > webpack, scss
- [babel-jest](https://www.npmjs.com/package/babel-jest) - Compiles modern JavaScript for Jest.
  > test environment
- [babel-loader](https://www.npmjs.com/package/babel-loader) - This package allows transpiling JavaScript files using Babel and webpack.
  > webpack
- [babel-plugin-transform-require-context](https://www.npmjs.com/package/babel-plugin-transform-require-context) - A Babel plugin that transforms webpack-specific require.context() into dummy function calls so that the code can run safely outside of the webpack environment
  > jest
- [clean-webpack-plugin](https://www.npmjs.com/package/clean-webpack-plugin) - A webpack plugin to remove/clean your build folder(s).
  > webpack
- [copy-webpack-plugin](https://www.npmjs.com/package/copy-webpack-plugin) - Copies individual files or entire directories, which already exist, to the build directory.
  > webpack
- [css-loader](https://www.npmjs.com/package/css-loader) - The css-loader interprets @import and url() like import/require() and will resolve them.
  > webpack
- [cssnano](https://www.npmjs.com/package/cssnano) - A modular CSS minifier, built on top of the PostCSS ecosystem.
  > webpack, scss
- [eslint](https://www.npmjs.com/package/eslint) - ESLint is a tool for identifying and reporting on patterns found in ECMAScript/JavaScript code.
  > eslint
- [eslint-config-airbnb-base](https://www.npmjs.com/package/eslint-config-airbnb-base) - This package provides Airbnb's base JS .eslintrc (without React plugins) as an extensible shared config.
  > eslint
- [eslint-config-valantic](https://www.npmjs.com/package/eslint-config-valantic) - The default ESLint config of valantic.
  > eslint
- [eslint-import-resolver-webpack](https://www.npmjs.com/package/eslint-import-resolver-webpack) - Webpack-literate module resolution plugin for eslint-plugin-import.
  > webpack, eslint
- [eslint-plugin-import](https://www.npmjs.com/package/eslint-plugin-import) - This plugin intends to support linting of ES2015+ (ES6+) import/export syntax, and prevent issues with misspelling of file paths and import names.
  > eslint
- [eslint-plugin-vue](https://www.npmjs.com/package/eslint-plugin-vue) - Official ESLint plugin for Vue.js
  > eslint
- [fork-ts-checker-webpack-plugin](https://www.npmjs.com/package/fork-ts-checker-webpack-plugin) - Webpack plugin that runs TypeScript type checker on a separate process.
  > webpack
- [html-webpack-plugin](https://www.npmjs.com/package/html-webpack-plugin) - Plugin that simplifies creation of HTML files to serve your bundles.
  > webpack
- [husky](https://www.npmjs.com/package/husky) - Git hooks made easy.
  > development environment, eslint, test environment
- [image-webpack-loader](https://www.npmjs.com/package/image-webpack-loader) - Image loader module for webpack. Minify PNG, JPEG, GIF, SVG and WEBP images with imagemin.
  > webpack
- [jest](https://www.npmjs.com/package/jest) - Delightful JavaScript Testing.
  > test environment
- [jest-environment-jsdom](https://www.npmjs.com/package/jest-environment-jsdom) - A jest dependency.
  > jest environment
- [jest-transform-stub](https://www.npmjs.com/package/jest-transform-stub) - Jest doesn't handle non JavaScript assets by default.
  > jest environment
- [lint-staged](https://www.npmjs.com/package/lint-staged) - Run linters against staged git files and don't let 💩 slip into your code base!
  > husky, development environment, eslint, test environment
- [mini-css-extract-plugin](https://www.npmjs.com/package/mini-css-extract-plugin) - This plugin extracts CSS into separate files.
  > webpack
- [msw](https://www.npmjs.com/package/msw) - Tock Service Worker (MSW) is a seamless REST/GraphQL API mocking library for browser and Node.js.
  > development environment, mock data
- [postcss](https://www.npmjs.com/package/postcss) - PostCSS is a tool for transforming styles with JS plugins.
  > webpack, scss
- [postcss-html](https://www.npmjs.com/package/postcss-html) - PostCSS syntax for parsing HTML (and HTML-like).
  > webpack, scss
- [postcss-loader](https://www.npmjs.com/package/postcss-loader) - Loader for webpack to process CSS with PostCSS.
  > webpack, scss
- [postcss-scss](https://www.npmjs.com/package/postcss-scss) - A SCSS parser for PostCSS.
  > webpack, scss
- [sass](https://www.npmjs.com/package/sass) - Node.js bindings to libsass.
  > webpack, scss
- [sass-loader](https://www.npmjs.com/package/sass-loader) - Loads a Sass/SCSS file and compiles it to CSS.
  > webpack, scss
- [stylelint](https://www.npmjs.com/package/stylelint) - A mighty, modern linter that helps you avoid errors and enforce conventions in your styles.
  > stylelint
- [stylelint-config-valantic](https://www.npmjs.com/package/stylelint-config-valantic) - Default valantic configuration for stylelint.
  > stylelint
- [stylelint-webpack-plugin](https://www.npmjs.com/package/stylelint-webpack-plugin) - A Stylelint plugin for webpack
  > webpack, stylelint
- [svg-sprite](https://www.npmjs.com/package/svg-sprite) - IOs a low-level Node.js module that takes a bunch of SVG files, optimizes them and bakes them into SVG sprites of several types.
  > svg icon sprite
- [svg4everybody](https://www.npmjs.com/package/svg4everybody) - SVG for Everybody adds SVG External Content support to all browsers.
  > svg icon sprite
- [terser-webpack-plugin](https://www.npmjs.com/package/terser-webpack-plugin) - This plugin uses terser to minify your JavaScript.
  > webpack
- [ts-jest](https://www.npmjs.com/package/ts-jest) - A Jest transformer with source map support that lets you use Jest to test projects written in TypeScript.
  > jest
- [ts-loader](https://www.npmjs.com/package/ts-loader) - This package allows showing typescript Errors and transpiling Typescript files to Javascript files using typescript and webpack.
  > webpack
- [typescript](https://www.typescriptlang.org/) - Basic Package to write Code in Typescript.
  > webpack
- [vue-loader](https://www.npmjs.com/package/vue-loader) - webpack loader for Vue Single-File Components.
  > webpack
- [vue-markdown-loader](https://www.npmjs.com/package/vue-markdown-loader) - Convert Markdown file to Vue Component using markdown-it.
  > development environment
- [vue-router](https://www.npmjs.com/package/vue-router) - The official router for Vue.js.
  > core
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
- [webpack-env](https://www.npmjs.com/package/webpack-env) - Webpack ENV is a webpack plug-in for creating ENV-variable-like globals in webpack.
  > webpack, development environment
