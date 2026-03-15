# lastfm-nodejs-client

A TypeScript Node.js wrapper client for the [Last.fm API](https://www.last.fm/api). Published on npm as [`lastfm-nodejs-client`](https://www.npmjs.com/package/lastfm-nodejs-client) (v1.5.1).

## Project Overview

This library lets consumers fetch public Last.fm data (user stats, charts, tracks, albums, artists) from both server-side and client-side environments using [cross-fetch](https://github.com/lquixada/cross-fetch).

**Author:** Mannuel Ferreira
**License:** MIT

## Tech Stack

- **Language:** TypeScript (strict mode)
- **Module system:** Dual ESM (`tsconfig.json`) + CJS (`tsconfig-cjs.json`)
- **Runtime:** Node.js v24+
- **HTTP:** `cross-fetch`
- **Testing:** Playwright (`npx playwright test --reporter=list`)
- **Linting:** ESLint with `eslint-config-standard-with-typescript`
- **Build output:** `dist/` (JS) + `dist/@types/` (declarations)

## Architecture

### Entry Point

`src/index.ts` — Exports `LastFmApi()` factory function returning an object with all API methods.

### Core Modules

| File | Purpose |
|------|---------|
| `src/config.ts` | Reads env vars (`LASTFM_API_KEY`, `LASTFM_API_BASE_URL`, `LASTFM_USER`, etc.) via `dotenv` |
| `src/method.ts` | Maps API method names (e.g. `user.getTopArtists`, `chart.getTopTracks`) |
| `src/request.ts` | Generic fetch wrapper with error handling; builds URL from options |
| `src/createOptions.ts` | Helper to create request option objects (method, user, period, limit) |
| `src/auth.ts` | `auth.getToken` endpoint |
| `src/lastfm.types.ts` | All TypeScript interfaces/types for API responses |

### API Methods (User)

- `getInfo` — User profile info
- `getLovedTracks` — User's loved tracks
- `getRecentTracks` — Recently played tracks
- `getTopAlbums` — Top albums by period
- `getTopArtists` — Top artists by period
- `getTopTracks` — Top tracks by period
- `getWeeklyAlbumChart` — Weekly album chart
- `getWeeklyArtistChart` — Weekly artist chart
- `getWeeklyChartList` — Available weekly chart date ranges
- `getWeeklyTrackChart` — Weekly track chart

### API Methods (Chart)

- `chart/topArtists.ts` — Global chart top artists
- `chart/topTracks.ts` — Global chart top tracks
- `chart/topTags.ts` — Global chart top tags

## Commands

```bash
# Install dependencies
pnpm install

# Run tests
pnpm test

# Lint
pnpm lint
pnpm lint-fix

# Build (ESM + CJS)
pnpm build

# Clean build artifacts
pnpm clean

# Publish to npm
pnpm publish
```

## Environment Variables

Create a `.env` file in the project root:

```bash
# Required
LASTFM_API_BASE_URL="https://ws.audioscrobbler.com/2.0/"
LASTFM_USER="your_username"

# Required for non-public endpoints
LASTFM_API_KEY="your_api_key"
LASTFM_APPNAME="your_app_name"
LASTFM_SHARED_SECRET="your_shared_secret"
```

## File Structure

```
src/
├── index.ts              # Entry point, LastFmApi factory
├── config.ts             # Environment config
├── method.ts             # API method name constants
├── request.ts            # HTTP fetch wrapper
├── createOptions.ts      # Request options builder
├── auth.ts               # Auth token endpoint
├── lastfm.types.ts       # TypeScript type definitions
├── getInfo.ts            # user.getInfo
├── getLovedTracks.ts     # user.getLovedTracks
├── getRecentTracks.ts    # user.getRecentTracks
├── getTopAlbums.ts       # user.getTopAlbums
├── getTopArtists.ts      # user.getTopArtists
├── getTopTracks.ts       # user.getTopTracks
├── getWeeklyAlbumChart.ts
├── getWeeklyArtistChart.ts
├── getWeeklyChartList.ts
├── getWeeklyTrackChart.ts
└── chart/
    ├── topArtists.ts
    ├── topTags.ts
    └── topTracks.ts
tests/
└── env.spec.ts           # Validates env vars are present
```

## Conventions

- Each API method lives in its own file and follows the same pattern: create options → call `request<ResponseType>(options)`
- Types are centralized in `lastfm.types.ts`
- Method name constants are defined in `method.ts` matching Last.fm's API naming (e.g. `user.getTopArtists`)
- The project uses `satisfies` for type-safe config/method objects
- ESM is the primary module format (`"type": "module"` in package.json), with a secondary CJS build
