# Changelog

## 1.5.1

- fix node module resolution issues where on build node could not find the module.
- now both esm and commonjs are built to dist folder and working.

## 1.5.0

- move types to root
- fix esm and commonjs distributions
- update docs

## 1.4.6

- error handling check if json in request.

## 1.4.5

- fixes missing lastFm types

## 1.4.4

- distribute ESM and CommonJs
- new build scripts and commands

## 1.4.3

- fix missmatched types for Album and Track, added some optionals pity, but it works, that just how they give us the data.

## 1.4.2

- bug, release dist

## 1.4.1

- export esm modules modern js only.
- add all dts and dts map files to dist
- adds lastfm types to dist

## 1.4.0

- update all api functions from snake case to camel case.

## 1.3.0

- Updates npm dependencies.
- refactors request with new error handling and responses.
- updates getInfo, removes hte un-required params.

## 1.2.4

- Updates npm dependencies.
- Refactors request methods options and updates all callsites.
- Add nvmrc file for easy switching node version.

## 1.2.3

- Adds tests, using Playwright.
- Adds dotenv npm module as a new dependency.

## 1.2.2

- Put log back, some APIs do get Bad Request for MBIDs that don't exist, don't have solve for this yet, so not throwing any more as it grinds future request to a halt. This is a working version.

## 1.2.1

- Tidy up, removes console logs.

## 1.2.0

- Swops `node-fetch` for `cross-fetch` for server and browser fetching support in one.

## 1.1.5

- Fix incorrect type on request method.

## 1.1.4

- Fix incorrect type on request method.

## 1.1.3

- Fix incorrect type import.

## 1.1.2

- Fix broken type, Track image type is an array of Images.

## 1.1.1

- update function declaration.
- re-add type declartion files for source code.

## 1.1.0

- Downgrade node-fetch to v2.6.7.
- Do not ship separate declaration files.
- TS now exports to CommonJs modules for better support older consumers.

## 1.0.6

- Forking repo README update.

## 1.0.5

- Fix local types.
- Update readme with current way of using the types.
- adds screenshot of it in use.

## 1.0.4

- Export types.

## 1.0.3

- Adds types file to distribution.
- Updates readme with types imports.

## 1.0.2

- Refactors types.d.ts to types.ts so can ship them with package and consumers can import them in their projects.

## 1.0.1

- Refactors config and methods to own modules.
- tsconfig, generate types to allow shipping types in one package, no need to DefinitleyTyped right now.
- update docs with new way of interacting with API.

## 1.0.0

- Initial project setup.
