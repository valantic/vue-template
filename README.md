# vue-template

This is a custom Vue template which is based on the idea of using BEM, CriticalCSS and a living styleguide while building mainly a not a SPA but a set of components used inside a CMS system.

## Introduction

### About this readme

If you're new on this project, please take your time and read carefully through this documentation and, if needed, trough the linked documentations.

Please note, that there is also a `package.md` file which contains additional information about the used NPM packages and available NPM scripts. 

### Before starting

This template, in most parts, follows the default Vue conventions. Where this is not the case, you'll find documentation on the customizations in this readme.

Before you start working on this project, you **MUST** read the following documentations:

* [Vue Introduction](https://vuejs.org/v2/guide/)
* [Vue Styleguide](https://vuejs.org/v2/style-guide/)
* [Vue component styleguide](https://github.com/pablohpsilva/vuejs-component-style-guide)
* [package.md](package.md)

You **MUST** also be familiar with the following tools:

* [SCSS](https://sass-lang.com/)
* [ES2015](https://babeljs.io/learn-es2015/) (especially with Classes, Const/Let, Modules, Promises)
* [ESLint](https://eslint.org/)
* [Stylelint](https://stylelint.io/)
* [Jest](https://facebook.github.io/jest/)
* [NPM](https://docs.npmjs.com/getting-started/what-is-npm)
* Your IDE

You **SHOULD** also know the following tools:

* [webpack](https://webpack.js.org/)

### Before installing

You **MUST** install the following tools globally, before you can use this template:

* [Node.js & NPM](https://nodejs.org/en/) (See package.json for the required versions. Use a version manager in case you work on different projects (e.g. [n](https://www.npmjs.com/package/n) or [nvm](https://github.com/creationix/nvm/blob/master/README.md)))
* [Vue-Devtools](https://github.com/vuejs/vue-devtools) for your browser
* A modern IDE

### Installing

Before executing the following command, please **make sure your Node and NPM version meet the requirements** in package.json's `endignes` section.

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

### This project

> TODO: replace this part with project specific information.

TBD:

[x] Add info about npm version
[] Functional components
[x] Node scripts
[x] Inspector
[x] Must read
[x] Installation (npm, inspector)
[] Best practice
[] Minification/Code splitting
[] Vue exceptions

## Configuration files

### .editorconfig

The `.editorconfig` file in the project root defines project defaults for your IDE like indent and type of line-breaks. Please make sure that your IDE is configured to read this file. Help and plugins can be found [here](http://editorconfig.org/#download).

### .npmrc

By default `npm` will install new packages with the version info prefix `^`, which means, that minor version updates can be installed automatically. Past projects have shown, that this behaviour can lead to problems, since minor updates are often not backwards compatible. Therefore we replace the prefix with `~` which by default only allows patch updates and therefore gives us less headache. The [config file](https://docs.npmjs.com/files/npmrc) is used automatically.

## Node.js

### Installing npm packages

To install all Node.js dependencies, needed by this project, run the following command.

```
$ npm install
```

#### Known issues

##### Stale

If you get a warning about `Using stale package data`, try to clear your npm cache before installing the packages:

```
$ npm cache clean --force
```

##### Error when installing mozjpeg 1

If you should get the following error when installing mozjpeg on MacOS

```
Command failed: autoreconf -fiv
```

Try to fix it by installing the following brew packages:

```
$ brew install automake autoconf libtool
```

##### Error when installing mozjpeg 2

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

##### Error when installing mozjpeg 3

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
