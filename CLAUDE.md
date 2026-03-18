# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A TypeScript Node.js wrapper client for the [Last.fm API](https://www.last.fm/api). Published on npm as [`lastfm-nodejs-client`](https://www.npmjs.com/package/lastfm-nodejs-client).

**Author:** Mannuel Ferreira | **License:** MIT

## Tech Stack

- **Language:** TypeScript (strict mode)
- **Module system:** Dual ESM (`tsconfig.json`) + CJS (`tsconfig-cjs.json`)
- **Runtime:** Node.js >=18.0.0
- **HTTP:** Native `fetch` (no external HTTP dependency); signed requests use `node:crypto` for MD5 API signature
- **Testing:** Playwright (`npx playwright test --reporter=list`)
- **Linting:** ESLint with `eslint-config-standard-with-typescript`
- **Build output:** `dist/` (JS) + `dist/@types/` (declarations)

## Commands

```bash
pnpm install          # Install dependencies
pnpm test             # Run all tests
pnpm lint             # Lint
pnpm lint-fix         # Lint and auto-fix
pnpm build            # Clean + build ESM and CJS
pnpm clean            # Remove dist/

# Run a single test file
npx playwright test tests/api.spec.ts --reporter=list
```

## Architecture

### Entry Point

`src/index.ts` exports `LastFmApi()` — a factory that returns a flat/namespaced object of all API methods.

### Core Modules

| File | Purpose |
|------|---------|
| `src/config.ts` | Reads env vars (`LASTFM_API_KEY`, `LASTFM_API_BASE_URL`, etc.) via `dotenv` |
| `src/method.ts` | `method` constant — maps namespaced method names (e.g. `method.user.getTopArtists`) using `satisfies` |
| `src/request.ts` | `request<T>()` (GET) and `signedRequest<T>()` (POST with MD5 API signature); `buildUrl()` assembles query params |
| `src/createOptions.ts` | Helper to build the `RequestOptions` object passed to `request()` |
| `src/lastfm.types.ts` | All TypeScript interfaces/types for API responses |

### API Namespaces

Methods are organised into subdirectories matching the Last.fm API namespace. Each file exports a single function; all are composed in `src/index.ts`:

| Namespace | Directory | Notes |
|-----------|-----------|-------|
| user (legacy flat) | `src/get*.ts` | `getInfo`, `getLovedTracks`, `getRecentTracks`, `getTopAlbums`, `getTopArtists`, `getTopTracks`, `getWeeklyAlbumChart`, `getWeeklyArtistChart`, `getWeeklyChartList`, `getWeeklyTrackChart`, `getFriends`, `getUserTopTags` |
| album | `src/album/` | `getInfo`, `getTags`, `getTopTags`, `search`, `addTags`, `removeTag` |
| artist | `src/artist/` | `getCorrection`, `getInfo`, `getSimilar`, `getTags`, `getTopAlbums`, `getTopTags`, `getTopTracks`, `search`, `addTags`, `removeTag` |
| auth | `src/auth/` + `src/auth.ts` | `getToken`, `getSession`, `getMobileSession`; signed methods use `signedRequest()` |
| chart | `src/chart/` | `topArtists`, `topTracks`, `topTags` |
| geo | `src/geo/` | `getTopArtists`, `getTopTracks` |
| library | `src/library/` | `getArtists` |
| tag | `src/tag/` | `getInfo`, `getSimilar`, `getTopAlbums`, `getTopArtists`, `getTopTags`, `getTopTracks`, `getWeeklyChartList`, `topTracks` |
| track | `src/track/` | `getCorrection`, `getInfo`, `getSimilar`, `getTags`, `getTopTags`, `search`, `love`, `unlove`, `addTags`, `removeTag`, `scrobble`, `updateNowPlaying` |
| user | `src/user/` | `getPersonalTags` |

### Adding a New Endpoint

1. Create `src/<namespace>/<methodName>.ts` — call `createOptions(method.<namespace>.<method>, ...)` then `request<ResponseType>(options)`.
2. Add the method name constant to `src/method.ts` (both the interface and the `satisfies` object).
3. Add the response type(s) to `src/lastfm.types.ts`.
4. Import and expose the function in `src/index.ts` under the correct namespace.

### Signed vs Unsigned Requests

- Read-only endpoints → `request<T>(options)` (GET)
- Write/auth endpoints (scrobble, love, addTags, auth sessions) → `signedRequest<T>(options, config.shared_secret)` (POST with MD5 signature per Last.fm auth spec)

## Environment Variables

```bash
LASTFM_API_BASE_URL="https://ws.audioscrobbler.com/2.0/"
LASTFM_USER="your_username"
LASTFM_API_KEY="your_api_key"
LASTFM_APPNAME="your_app_name"
LASTFM_SHARED_SECRET="your_shared_secret"   # required for signed requests
```
