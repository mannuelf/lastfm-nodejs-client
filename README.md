# LastFm NodeJs client

A Node JS wrapper client for fetching public data from [LastFm API](https://www.last.fm/api).

## But Why?

I was building scrobbles page [https://mannuelferreira.com/scrobbles](https://mannuelferreira.com/scrobbles) and I thought other might want it to.

## How to use the client

Install the npm package in your project.

```bash
pnpm install
```

Consider [PNPM](https://pnpm.io/) ▶️

### Import it

```js
import { lastFm } from 'lastfm-nodejs-client';
```

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

## Developing client

Written in TypeScript and compiles down to ES2015.

### Postman collections

A list of endpoints currently mapped to this client. Still under development, not feature complete.

[View collections](https://documenter.getpostman.com/view/4217/2s8YKJELqJ) ▶️

Clone repo

```bash
git clone git@github.com:mannuelf/lastfm-nodejs-client.git
```

create `.env` file in project root.
Requirements for environment are:

```bash
LASTFM_API_BASE_URL=""
LASTFM_API_KEY=""
LASTFM_APPNAME=""
LASTFM_USER=""
```

Get it [here](https://www.last.fm/api/account/create)

Develop

```bash
pnpm dev
```

Build

```bash
pnpm build
```
