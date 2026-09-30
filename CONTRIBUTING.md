# Contributing to this repository

## Getting started

- Clone this repository.
- Use the Node.js version from `.nvmrc` (e.g. `nvm use`) and install the dependencies with `npm ci`.
- `npm run dev` starts the app with the living styleguide.

## Developing

- Create a branch from `main`: `feature/<name>` or `bugfix/<name>`.
- Base new components, stores, plugins and tests on the files in `blueprints/`.
- Run `npm run build:icons` after adding or removing an icon SVG.
- Run `npm test` and fix all issues.
- Add or update the feature doc in `docs/` if a feature changed (index: `docs/README.md`).
- Add a changelog entry (see below).
- Open a pull request using the pull request template.

## Changelog

Every change gets an entry under `## unreleased` in [CHANGELOG.md](CHANGELOG.md), e.g. `- [fix] Description.`.
Breaking changes go under `### Breaking Changes` with a **Migration:** note. The full convention is described in
[AGENTS.md](AGENTS.md#changelog-required-for-every-task).

## Releasing

This repo is not released: it is not versioned, tagged or published. Projects start from it or pull its updates in.
