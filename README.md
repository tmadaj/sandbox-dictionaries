# Project Setup

## Prerequisites

- node 12
- npm 6

## Initialisation

`npm i` to install dependencies

To speed up all further builds, React and other infrequently updated libraries are built into a separate bundle by:

`npm run build:dll:dev` or `npm run build:dll:prod`

## Running dev-server

`npm run dev` lunches a local HTTP development server with support of Hot Module Reloading. The address to access it is printed out.

## Builds

`npm run build:dev` or `npm run build:prod`

## Lint

ESLint is run before build or by `npm run lint`

## Tests

`npm run test` for Jest

# TODOs

- TS config & fixes
- Several TODO comments
- Name of dictionary editable
- Data persistance is done really simply by saving redux store to local storage. Not an optimal initial solition with a future server connection in mind.
