# vue-template

TBD: Add info about npm version

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
