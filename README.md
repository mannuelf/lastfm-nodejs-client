# LastFm NodeJs client

A Node JS wrapper client for fetching public data from [LastFm API](https://www.last.fm/api).

If you're doing node in 2022 consider PNPM, get it [here](https://pnpm.io/).

## How to use the client

```bash
(p)npm install
```

### Import it

```bash
import { lastFm } from 'lastfm-nodejs-client';
```

```js
const getUser = async () => {
  const data = await lastFm.getInfo(
    config.method.user.getInfo,
    config.username,
    'overall',
    12
  );
  const { user } = data;
  return user;
};

const user = getUser();

user.name;
```

### Use it

## Developing the client

```bash
pnpm install
```

```bash
pnpm build
```

### Testing the code

```bash
pnpm test
```
