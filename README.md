# LastFm NodeJs client

[![NPM Version](https://img.shields.io/npm/v/lastfm-nodejs-client.svg?branch=main)](https://www.npmjs.com/package/lastfm-nodejs-client)
[![Downloads Per Week](https://img.shields.io/npm/dw/lastfm-nodejs-client.svg?color=blue)](https://www.npmjs.com/package/lastfm-nodejs-client)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

A Node JS wrapper client for fetching public data from [LastFm API](https://www.last.fm/api).

Fetch server side or client side, thanks to [cross-fetch](https://github.com/lquixada/cross-fetch)

## How to use the client

Install the npm package in your project.

```bash
pnpm install
```

Consider [PNPM](https://pnpm.io/) ▶️

### Import it

Import the client module:

```js
import { lastFm } from 'lastfm-nodejs-client';
```

Import the Types as type:

```js
import type { Artist, Track, User, WeeklyAlbum } from 'lastfm-nodejs-client/@types';
```

_Working on getting these into [DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped)_

### Use it

```js
const lastFm = LastFmApi();
const { config, method } = lastFm;

const getTopArtists = async () => {
  const data = await lastFm.getTopArtists(
    method.user.top_artists,
    config.username,
    'overall',
    '200',
  );
  const { topartists } = data;
  return topartists;
};
```

🚀 Gives you:

![user](https://res.cloudinary.com/mannuel/image/upload/v1668059500/topartist.png)

## Developing client

Written in TypeScript, compiles down to ES2015, provides the types for the lastFm entities.

## Fork repo

```bash
gh repo fork mannuelf/lastfm-nodejs-client
```

What's gh? [Get it here](https://cli.github.com/manual/gh_repo_fork)

### Postman collections

A list of endpoints currently mapped to this client. Still under development, not feature complete.

[View collections](https://documenter.getpostman.com/view/4217/2s8YKJELqJ) ▶️

### ENV

Create `.env` file in project root:

You do not need an API key to query the public USER entity, add only base url and a username to env file.

```bash
LASTFM_API_BASE_URL=""
LASTFM_USER=""
```

For everything else you will need to include:

```bash
LASTFM_API_KEY=""
LASTFM_APPNAME=""
```

Create them [here](https://www.last.fm/api/account/create).

### Develop

```bash
pnpm dev
```

### Build

```bash
pnpm build
```

### Why I built this?

I was building a scrobbles page [https://mannuelferreira.com/scrobbles](https://mannuelferreira.com/scrobbles) and I thought others might want it to.
