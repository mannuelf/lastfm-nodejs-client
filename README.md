# LastFm NodeJs client

A Node JS wrapper client for fetching public data from [LastFm API](https://www.last.fm/api).

## How to use the client

Install the npm package in your project.

```bash
pnpm install
```

Consider [PNPM](https://pnpm.io/) ▶️

### Import it

Import module

```js
import { lastFm } from 'lastfm-nodejs-client';
```

Import types

```js
import {
  Artist,
  Track,
  User,
  WeeklyAlbum,
} from 'lastfm-nodejs-client/dist/types';
```

_Working on getting these into [DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped)_

### Use it

```js
const lastFm = LastFmApi();
const { config, method } = lastFm;

const getUser = async () => {
  const data = await lastFm.getInfo(
    method.user.getInfo,
    config.username,
    'overall',
    12
  );
  const { user } = data;
  return user;
};

const user = getUser();

console.log(user.name);
```

🚀 Gives you

![user](https://res.cloudinary.com/mannuel/image/upload/v1667372693/images/typescript.png)

## Developing client

Written in TypeScript, compiles down to ES2015, provides the types for the lastFm entities.

## Fork repo

```bash
gh repo fork git@github.com:mannuelf/lastfm-nodejs-client.git
```

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
