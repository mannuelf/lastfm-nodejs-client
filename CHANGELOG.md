# Changelog

## 1.2.3

- Adds tests, using Playwright
- Adds dotenv npm module as a new dependency

## 1.2.2

- Put log back, some APIs do get Bad Request for MBIDs that don't exist, don't have solve for this yet, so not throwing any more as it grinds future request to a halt. This is a working version.

## 1.2.1

- Tidy up, removes console logs

## 1.2.0

- Swops `node-fetch` for `cross-fetch` for server and browser fetching support in one.

## 1.1.5

- Fix incorrect type on request method

## 1.1.4

- Fix incorrect type on request method

## 1.1.3

- Fix incorrect type import

## 1.1.2

- Fix broken type, Track image type is an array of Images.

## 1.1.1

- update function declaration
- re-add type declartion files for source code

## 1.1.0

- Downgrade node-fetch to v2.6.7
- Do not ship separate declaration files
- TS now exports to CommonJs modules for better support older consumers

## 1.0.6

- Forking repo README update

## 1.0.5

- Fix local types
- Update readme with current way of using the types
- adds screenshot of it in use

## 1.0.4

- Export types

## 1.0.3

- Adds types file to distribution
- Updates readme with types imports

## 1.0.2

- Refactors types.d.ts to types.ts so can ship them with package and consumers can import them in their projects

## 1.0.1

- Refactors config and methods to own modules
- tsconfig, generate types to allow shipping types in one package, no need to DefinitleyTyped right now
- update docs with new way of interacting with API

## 1.0.0

- Initial project setup
