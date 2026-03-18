# LastFm NodeJs client

[![NPM Version](https://img.shields.io/npm/v/lastfm-nodejs-client.svg?branch=main)](https://www.npmjs.com/package/lastfm-nodejs-client)
[![Downloads Per Week](https://img.shields.io/npm/dw/lastfm-nodejs-client.svg?color=blue)](https://www.npmjs.com/package/lastfm-nodejs-client)
[![Codacy Badge](https://app.codacy.com/project/badge/Grade/ba3b73c24e06433fabe0efed8b43d026)](https://www.codacy.com/gh/mannuelf/lastfm-nodejs-client/dashboard?utm_source=github.com&utm_medium=referral&utm_content=mannuelf/lastfm-nodejs-client&utm_campaign=Badge_Grade)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

A TypeScript client for the [Last.fm API](https://www.last.fm/api). Works in Node.js ≥18 and all modern browsers — no polyfills required.

## Install

```bash
pnpm add lastfm-nodejs-client
```

```bash
npm install lastfm-nodejs-client
```

```bash
yarn add lastfm-nodejs-client
```

## Setup

Create a `.env` file in your project root:

```bash
LASTFM_API_BASE_URL="https://ws.audioscrobbler.com/2.0/"
LASTFM_USER="your_username"
LASTFM_API_KEY="your_api_key"
LASTFM_APPNAME="your_app_name"
LASTFM_SHARED_SECRET="your_shared_secret"
```

Get your API key at [last.fm/api/account/create](https://www.last.fm/api/account/create).

## Usage

```ts
import LastFmApi from 'lastfm-nodejs-client';

const lastFm = LastFmApi();
const { method } = lastFm;
```

### Get a user's top artists

```ts
import LastFmApi from 'lastfm-nodejs-client';
import type { TopArtistsResponse } from 'lastfm-nodejs-client';

const lastFm = LastFmApi();
const { method } = lastFm;

const data: TopArtistsResponse = await lastFm.getTopArtists(
  method.user.getTopArtists,
  'your_username',
  'overall', // period: overall | 7day | 1month | 3month | 6month | 12month
  '10',      // limit
);

console.log(data.topartists.artist);
```

### Get a user's recent tracks

```ts
import LastFmApi from 'lastfm-nodejs-client';
import type { RecentTracksResponse } from 'lastfm-nodejs-client';

const lastFm = LastFmApi();
const { method } = lastFm;

const data: RecentTracksResponse = await lastFm.getRecentTracks(
  method.user.getRecentTracks,
  'your_username',
  '10', // limit
);

console.log(data.recenttracks.track);
```

### Get artist info

```ts
import LastFmApi from 'lastfm-nodejs-client';
import type { ArtistInfoResponse } from 'lastfm-nodejs-client';

const lastFm = LastFmApi();
const { method } = lastFm;

const data: ArtistInfoResponse = await lastFm.artist.artistGetInfo(
  method.artist.getInfo,
  'Radiohead',
);

console.log(data.artist);
```

### Get album info

```ts
import LastFmApi from 'lastfm-nodejs-client';
import type { AlbumInfoResponse } from 'lastfm-nodejs-client';

const lastFm = LastFmApi();
const { method } = lastFm;

const data: AlbumInfoResponse = await lastFm.album.albumGetInfo(
  method.album.getInfo,
  'Radiohead',
  'OK Computer',
);

console.log(data.album);
```

### Search for a track

```ts
import LastFmApi from 'lastfm-nodejs-client';
import type { TrackSearchResponse } from 'lastfm-nodejs-client';

const lastFm = LastFmApi();
const { method } = lastFm;

const data: TrackSearchResponse = await lastFm.track.trackSearch(
  method.track.search,
  'Creep',
  'Radiohead', // optional artist filter
  '5',         // limit
);

console.log(data.results.trackmatches.track);
```

### Love a track (authenticated)

Requires a session key (`sk`) obtained via `auth.getMobileSession` or `auth.getSession`.

```ts
import LastFmApi from 'lastfm-nodejs-client';

const lastFm = LastFmApi();
const { method } = lastFm;

await lastFm.track.trackLove(
  method.track.love,
  'Radiohead',
  'Creep',
  'your_session_key',
);
```

## All available namespaces

| Namespace | Methods |
|-----------|---------|
| `album` | `albumGetInfo`, `albumGetTags`, `albumGetTopTags`, `albumSearch`, `albumAddTags`, `albumRemoveTag` |
| `artist` | `artistGetInfo`, `artistGetSimilar`, `artistGetTags`, `artistGetTopAlbums`, `artistGetTopTags`, `artistGetTopTracks`, `artistSearch`, `artistAddTags`, `artistRemoveTag`, `artistGetCorrection` |
| `auth` | `getToken`, `getSession`, `getMobileSession` |
| `chart` | `chartTopArtists`, `chartTopTracks`, `chartTopTags` |
| `geo` | `geoGetTopArtists`, `geoGetTopTracks` |
| `library` | `libraryGetArtists` |
| `tag` | `tagGetInfo`, `tagGetSimilar`, `tagGetTopAlbums`, `tagGetTopArtists`, `tagGetTopTags`, `tagGetWeeklyChartList`, `tagTopTracks` |
| `track` | `trackGetInfo`, `trackGetSimilar`, `trackGetTags`, `trackGetTopTags`, `trackSearch`, `trackLove`, `trackUnlove`, `trackAddTags`, `trackRemoveTag`, `trackScrobble`, `trackUpdateNowPlaying`, `trackGetCorrection` |
| `user` | `userGetPersonalTags` |

Legacy flat methods also available: `getTopArtists`, `getTopTracks`, `getRecentTracks`, `getLovedTracks`, `getInfo`, `getFriends`, `getUserTopTags`, `getWeeklyAlbumChart`, `getWeeklyArtistChart`, `getWeeklyChartList`, `getWeeklyTrackChart`, `getTopAlbums`.

## Developing

```bash
gh repo fork mannuelf/lastfm-nodejs-client
```

```bash
pnpm install
pnpm test
pnpm lint
pnpm build
```

### Why I built this

I was building a scrobbles page at [mannuelferreira.com/scrobbles](https://mannuelferreira.com/scrobbles) and thought others might find it useful.
