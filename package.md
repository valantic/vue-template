# NPM packages

## Scripts

There are several scripts that will support you during the development and deploy process. In the end you'll probably only need two or three of them, since they often call each other.

### Common

#### `npm run build`

Creates the production build of the current code and moves it to the `/dist` folder. This will also perform **code splitting** and **minification/uglyfication**. `npm run test` **MUST** be executed before building!

#### `npm run dev`

Starts the development-environment with styleguide example pages. Please note, that for performance reasons no minification and uglyfication is performed.

#### `npm run test`

This will test the current state of TS, JS and CSS code. Tests **MUST** be executed before creating a build.

#### All scripts

- `npm run clean:caches` - Clears linter caches.
- `npm run dev` - Runs the development environment.
- `npm run fix:stylelint` - Runs Stylelint in `--fix` mode, to autofix some issues.
- `npm run lint` - Runs all available linters.
- `npm run lint:eslint` - Runs ESLint without the `--fix` mode.
- `npm run lint:stylelint` - Runs Stylelint without the `--fix` mode.
- `npm run lint-staged` - Required by Git Hooks.
- `npm run test` - Runs all available tests (unit, linters).
- `npm run test:unit` - Executes Vitest tests.
- `npm run build` - Builds the productive application.
- `npm run build:icons` - Updates the SVG sprite.
- `npm run build:profile` - Runs a build and shows a package content overview.
- `npm run build:watch` - Allows to develop with a continuous productive build.
- `npm run serve` - Runs Vite in preview mode.
- `npm run prepare` - Auto executed setup script for Git Hooks.
- `npm run prettier` - Runs Prettier formatter in write mode.
- `npm run tsc` - Runs TypeScript tests.

## Dependencies

### Project

### Template

- [@valantic/frontend-utils](https://github.com/valantic/frontend-utils) - valantic shared frontend utility library.
  > core, utilities
- [@valantic/scss-utils](https://github.com/valantic/scss-utils) - valantic shared SCSS utility library.
  > core, scss
- [@vuelidate/core](https://www.npmjs.com/package/@vuelidate/core) - Simple, lightweight model-based validation for Vue.js 2.x & 3.0
  > vuelidate, validation
- [@vuelidate/validators](https://www.npmjs.com/package/@vuelidate/validators) - This is the standalone validators package for Vuelidate.
  > vuelidate, validation
- [axios](https://www.npmjs.com/package/axios) - Promise based HTTP client for the browser and node.js.
  > core, api
- [body-scroll-lock](https://www.npmjs.com/package/body-scroll-lock) - Enables body scroll locking (for iOS Mobile and Tablet, Android, desktop Safari/Chrome/Firefox) without breaking scrolling of a target element (eg. modal/lightbox/flyouts/nav-menus).
  > components, c-modal
- [dayjs](https://www.npmjs.com/package/dayjs) - Fast 2kB alternative to Moment.js with the same modern API.
  > components, c-date-picker-input, c-date-picker-range
- [embla-carousel](https://www.npmjs.com/package/embla-carousel) - Embla Carousel is a bare bones carousel library with great fluid motion and awesome swipe precision. It's library agnostic, dependency free and 100% open source. Build awesome carousels by extending Embla Carousel with your own CSS and JavaScript.
  > embla, components, c-slider
- [embla-carousel-autoplay](https://www.npmjs.com/package/embla-carousel-autoplay) - An autoplay plugin for Embla Carousel.
  > embla, components, c-slider
- [floating-vue](https://www.npmjs.com/package/floating-vue) - Floating UI-based tooltip and popover plugin for Vue.js.
  > components, tooltip
- [pikaday](https://www.npmjs.com/package/pikaday) - A refreshing JavaScript datepicker — lightweight, no dependencies.
  > components, c-date-picker-input
- [pinia](https://www.npmjs.com/package/pinia) - Centralized State Management for Vue.js.
  > core, vue
- [the-new-css-reset](https://www.npmjs.com/package/the-new-css-reset) - This new CSS reset is using the new CSS features
  > core, css
- [vue](https://www.npmjs.com/package/vue) - Vue.js is a progressive, incrementally-adoptable JavaScript framework for building UI on the web.
  > core, cue
- [vue-i18n](https://www.npmjs.com/package/vue-i18n) - Internationalization plugin for Vue.js
  > core, vue

## Dev-Dependencies

### Project

### Template

- [@eslint/eslintrc](https://www.npmjs.com/package/@eslint/eslintrc) - Legacy ESLint config compatibility helper for flat config migration.
  > eslint
- [@eslint/js](https://www.npmjs.com/package/@eslint/js) - ESLint's built-in JavaScript rule set.
  > eslint
- [@faker-js/faker](https://www.npmjs.com/package/@faker-js/faker) - Generate massive amounts of fake (but realistic) data for testing and development.
  > development, mock data
- [@trivago/prettier-plugin-sort-imports](https://www.npmjs.com/package/@trivago/prettier-plugin-sort-imports) - Prettier plugin to sort import statements.
  > prettier
- [@types/\*](https://github.com/DefinitelyTyped/DefinitelyTyped) - About
  The repository for high quality TypeScript type definitions.
  > development, typescript
- [@valantic/vue-styleguide](https://github.com/valantic/vue-styleguide) - valantic Vue styleguide component library (dev-only).
  > development, styleguide
- [@vitejs/plugin-vue](https://www.npmjs.com/package/@vitejs/plugin-vue) - Vite Vue Plugin.
  > vite
- [@vue/\*](https://www.npmjs.com/package/@vitejs/plugin-vue) - Additional tools for the vue development.
  > eslint, vitest
- [autoprefixer](https://www.npmjs.com/package/autoprefixer) - PostCSS plugin to parse CSS and add vendor prefixes to CSS rules using values from caniuse.com.
  > vite, scss
- [cssnano](https://www.npmjs.com/package/cssnano) - A modular CSS minifier, built on top of the PostCSS ecosystem.
  > vite, scss
- [eslint](https://www.npmjs.com/package/eslint) - ESLint is a tool for identifying and reporting on patterns found in ECMAScript/JavaScript code.
  > eslint
- [eslint-config-prettier](https://www.npmjs.com/package/eslint-config-prettier) - Disables ESLint rules that would conflict with Prettier.
  > eslint, prettier
- [eslint-config-valantic](https://www.npmjs.com/package/eslint-config-valantic) - The default ESLint config of valantic.
  > eslint
- [eslint-plugin-import](https://www.npmjs.com/package/eslint-plugin-import) - This plugin intends to support linting of ES2015+ (ES6+) import/export syntax, and prevent issues with misspelling of file paths and import names.
  > eslint
- [eslint-plugin-jsdoc](https://www.npmjs.com/package/eslint-plugin-jsdoc) - ESLint rules for JSDoc comments.
  > eslint
- [eslint-plugin-unicorn](https://www.npmjs.com/package/eslint-plugin-unicorn) - ESLint rules for code quality (unicorn ruleset).
  > eslint
- [eslint-plugin-vue](https://www.npmjs.com/package/eslint-plugin-vue) - Official ESLint plugin for Vue.js
  > eslint
- [globals](https://www.npmjs.com/package/globals) - Global variable declarations for use in ESLint flat config.
  > eslint
- [husky](https://www.npmjs.com/package/husky) - Git hooks made easy.
  > development, husky, eslint
- [jsdom](https://www.npmjs.com/package/jsdom) - jsdom is a pure-JavaScript implementation of many web standards, notably the WHATWG DOM and HTML Standards, for use with Node.js.
  > vitest
- [lint-staged](https://www.npmjs.com/package/lint-staged) - Run linters against staged git files and don't let 💩 slip into your code base!
  > development, husky, eslint
- [msw](https://www.npmjs.com/package/msw) - Mock Service Worker (MSW) is a seamless REST/GraphQL API mocking library for browser and Node.js.
  > development, mock data
- [postcss](https://www.npmjs.com/package/postcss) - PostCSS is a tool for transforming styles with JS plugins.
  > vite, postcss, scss
- [postcss-html](https://www.npmjs.com/package/postcss-html) - PostCSS syntax for parsing HTML (and HTML-like).
  > vite, postcss, scss
- [postcss-scss](https://www.npmjs.com/package/postcss-scss) - A SCSS parser for PostCSS.
  > vite, postcss, scss
- [prettier](https://www.npmjs.com/package/prettier) - Opinionated code formatter.
  > prettier
- [rollup-plugin-visualizer](https://www.npmjs.com/package/rollup-plugin-visualizer) - Visualize and analyze your Rollup bundle to see which modules are taking up space.
  > vite
- [sass](https://www.npmjs.com/package/sass) - Dart Sass compiler for Node.js.
  > vite, scss
- [stylelint](https://www.npmjs.com/package/stylelint) - A mighty, modern linter that helps you avoid errors and enforce conventions in your styles.
  > stylelint
- [stylelint-config-valantic](https://www.npmjs.com/package/stylelint-config-valantic) - Default valantic configuration for stylelint.
  > stylelint
- [svg-sprite](https://www.npmjs.com/package/svg-sprite) - A low-level Node.js module that takes a bunch of SVG files, optimizes them and bakes them into SVG sprites of several types.
  > svg, component, c-icon
- [svgo](https://www.npmjs.com/package/svgo) - SVG Optimizer is a Node.js-based tool for optimizing SVG vector graphics files.
  > vite, svg
- [typescript](https://www.typescriptlang.org/) - Basic Package to write Code in Typescript.
  > vite, TypeScript
- [typescript-eslint](https://github.com/typescript-eslint/typescript-eslint) - Monorepo for all the tooling which enables ESLint to support TypeScript.
  > eslint
- [vite](https://www.npmjs.com/package/vite) - Next Generation Frontend Tooling.
  > vite
- [vite-plugin-compression](https://www.npmjs.com/package/vite-plugin-compression) - Vite plugin to generate gzip/brotli compressed assets at build time.
  > vite
- [vite-plugin-image-optimizer](https://www.npmjs.com/package/vite-plugin-image-optimizer) - Plugin for Vite to optimize (compress) all images assets using Sharp.js and SVGO at build time.
  > vite, svg
- [vite-plugin-markdown](https://www.npmjs.com/package/vite-plugin-markdown) - A plugin enables you to import a Markdown file as various formats on your vite project.
  > vite, development
- [vitest](https://www.npmjs.com/package/vitest) - Vite-native unit test runner.
  > vitest
- [vue-component-type-helpers](https://www.npmjs.com/package/vue-component-type-helpers) - TypeScript helpers for Vue component prop and emit types.
  > typescript, vitest
- [vue-eslint-parser](https://www.npmjs.com/package/vue-eslint-parser) - ESLint parser for `.vue` single-file components.
  > eslint
- [vue-router](https://www.npmjs.com/package/vue-router) - The official router for Vue.js.
  > development, styleguide
- [vue-tsc](https://www.npmjs.com/package/vue-tsc) - TypeScript CLI for vue projects.
  > core
