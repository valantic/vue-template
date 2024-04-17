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
- `npm run fix:eslint` - Runs ESLint in `--fix` mode, to autofix some issues.
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
- `npm run build:storybook` - Creates storybook build.
- `npm run build:watch` - Allows to develop with a continuous productive build.
- `npm run serve` - Runs Vite in preview mode.
- `npm run prepare` - Auto executed setup script for Git Hooks.
- `npm run storybook` - Runs the storybook server.
- `npm run tsc` - Runs TypeScript tests.

## Dependencies

### Project

### Template

- [@popperjs/core](https://www.npmjs.com/package/@popperjs/core) - Tooltip & Popover Positioning Engine
  > components, tooltip
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
- [pinia](https://www.npmjs.com/package/pinia) - Centralized State Management for Vue.js.
  > core, vue
- [the-new-css-reset](https://www.npmjs.com/package/the-new-css-reset) - This new CSS reset is using the new CSS features
  > core, css
- [vue](https://www.npmjs.com/package/vue) - Vue.js is a progressive, incrementally-adoptable JavaScript framework for building UI on the web.
  > core, cue
- [vue-i18n](https://www.npmjs.com/package/vue-i18n) - Internationalization plugin for Vue.js
  > core, vue

## Dev-Dependencies

tbd

### Project

### Template

- [@faker-js/faker](https://www.npmjs.com/package/@faker-js/faker) - Generate massive amounts of fake (but realistic) data for testing and development.
  > development, mock data
- [@storybook/\*](https://storybook.js.org/) - Build UIs without the grunt work.
  > development, storybook, components
- [@types/\*](https://github.com/DefinitelyTyped/DefinitelyTyped) - About
  The repository for high quality TypeScript type definitions.
  > development, typescript
- [@typescript-eslint/\*](https://github.com/typescript-eslint/typescript-eslint) - Monorepo for all the tooling which enables ESLint to support TypeScript.
  > eslint
- [@vitejs/plugin-vue](https://www.npmjs.com/package/@vitejs/plugin-vue) - Vite Vue Plugin.
  > vite
- [@vue/\*](https://www.npmjs.com/package/@vitejs/plugin-vue) - Additional tools for the vue development.
  > eslint, vitest
- [autoprefixer](https://www.npmjs.com/package/autoprefixer) - PostCSS plugin to parse CSS and add vendor prefixes to CSS rules using values from caniuse.com.
  > webpack, scss
- [cssnano](https://www.npmjs.com/package/cssnano) - A modular CSS minifier, built on top of the PostCSS ecosystem.
  > webpack, scss
- [eslint](https://www.npmjs.com/package/eslint) - ESLint is a tool for identifying and reporting on patterns found in ECMAScript/JavaScript code.
  > eslint
- [eslint-config-airbnb-base](https://www.npmjs.com/package/eslint-config-airbnb-base) - This package provides Airbnb's base JS .eslintrc (without React plugins) as an extensible shared config.
  > eslint
- [eslint-config-valantic](https://www.npmjs.com/package/eslint-config-valantic) - The default ESLint config of valantic.
  > eslint
- [eslint-import-resolver-vite](https://www.npmjs.com/package/eslint-import-resolver-vite) - Vite module resolution plugin for eslint-plugin-import.
- [eslint-plugin-import](https://www.npmjs.com/package/eslint-plugin-import) - This plugin intends to support linting of ES2015+ (ES6+) import/export syntax, and prevent issues with misspelling of file paths and import names.
  > eslint
- [eslint-plugin-storybook](https://www.npmjs.com/package/eslint-plugin-storybook) - Best practice rules for Storybook.
  > eslint
- [eslint-plugin-vue](https://www.npmjs.com/package/eslint-plugin-vue) - Official ESLint plugin for Vue.js
  > eslint
- [husky](https://www.npmjs.com/package/husky) - Git hooks made easy.
  > development, husky, eslint
- [jsdom](https://www.npmjs.com/package/jsdom) - jsdom is a pure-JavaScript implementation of many web standards, notably the WHATWG DOM and HTML Standards, for use with Node.js.
  > vitest
- [lint-staged](https://www.npmjs.com/package/lint-staged) - Run linters against staged git files and don't let 💩 slip into your code base!
  > development, husky, eslint
- [msw](https://www.npmjs.com/package/msw) - Tock Service Worker (MSW) is a seamless REST/GraphQL API mocking library for browser and Node.js.
  > development, mock data
- [postcss](https://www.npmjs.com/package/postcss) - PostCSS is a tool for transforming styles with JS plugins.
  > vite, postcss, scss
- [postcss-html](https://www.npmjs.com/package/postcss-html) - PostCSS syntax for parsing HTML (and HTML-like).
  > vite, postcss, scss
- [postcss-scss](https://www.npmjs.com/package/postcss-scss) - A SCSS parser for PostCSS.
  > vite, postcss, scss
- [rollup-plugin-visualizer](https://www.npmjs.com/package/rollup-plugin-visualizer) - Visualize and analyze your Rollup bundle to see which modules are taking up space.
  > vite
- [sass](https://www.npmjs.com/package/sass) - Node.js bindings to libsass.
  > vite, scss
- [stylelint](https://www.npmjs.com/package/stylelint) - A mighty, modern linter that helps you avoid errors and enforce conventions in your styles.
  > stylelint
- [stylelint-config-valantic](https://www.npmjs.com/package/stylelint-config-valantic) - Default valantic configuration for stylelint.
  > stylelint
- [svg-sprite](https://www.npmjs.com/package/svg-sprite) - IOs a low-level Node.js module that takes a bunch of SVG files, optimizes them and bakes them into SVG sprites of several types.
  > svg, component, c-icon
- [svgo](https://www.npmjs.com/package/svgo) - SVG Optimizer is a Node.js-based tool for optimizing SVG vector graphics files..
  > vite, svg
- [typescript](https://www.typescriptlang.org/) - Basic Package to write Code in Typescript.
  > vite, TypeScript
- [vite](https://www.npmjs.com/package/vite) - Next Generation Frontend Tooling.
  > vite
- [vite-plugin-image-optimizer](https://www.npmjs.com/package/vite-plugin-image-optimizer) - Plugin for Vite to optimize (compress) all images assets using Sharp.js and SVGO at build time.
  > vite, svg
- [vite-plugin-markdown](https://www.npmjs.com/package/vite-plugin-markdown) - A plugin enables you to import a Markdown file as various formats on your vite project.
  > vite, development
- [vue-router](https://www.npmjs.com/package/vue-router) - The official router for Vue.js.
  > core
- [vue-tsc](https://www.npmjs.com/package/vue-tsc) - TypeScript CLI for vue projects.
  > core
