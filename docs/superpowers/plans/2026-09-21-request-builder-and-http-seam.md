# Request Builder & HTTP Seam Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Collapse the 57 shallow per-method wrapper files and the positional `createOptions()` helper into one deep, data-driven request-builder module (a `registry` + `dispatch` engine), and give `request()`/`signedRequest()` a real injected HTTP seam (`HttpClient = typeof fetch`) instead of the incidental `global.fetch` monkeypatch used in tests today.

**Architecture:** A single `src/registry.ts` module declares every Last.fm API method as data (namespace, signed/unsigned, field requirements/defaults, response type), with TypeScript param/response types derived from that data via `satisfies` and conditional types — no hand-maintained parallel type table. A `src/dispatch.ts` engine resolves a method's params against the registry (applying defaults, enforcing required fields at runtime) and calls into a rewritten `src/request.ts`, whose `request()`/`signedRequest()` now accept an injected `HttpClient` and `Config` instead of importing a global singleton or calling `fetch` directly. `src/namespaces.ts` builds the public `api.<namespace>.<method>()` object straight from the registry, giving full, consistent namespacing (fixing the `auth` split and the flat legacy `get*` methods). `src/index.ts` becomes a five-line factory wiring `loadConfig()` + the namespace generator together, accepting an optional `httpClient` for tests.

**Tech Stack:** TypeScript (strict, `noUncheckedIndexedAccess`), native `fetch`/`Response`/`URLSearchParams` (via `@types/node`'s global fetch types — no `dom` lib needed), Playwright as the test runner, zero runtime dependencies.

## Global Constraints

- Node.js >=20.0.0, TypeScript `strict: true` + `noUncheckedIndexedAccess: true` (per `tsconfig.json`).
- Zero runtime dependencies — no new packages. `md5.ts` (pure TS MD5) stays unchanged and is still used for `api_sig` generation.
- Dual ESM + CJS build (`tsconfig.json` / `tsconfig-cjs.json`) — all new files use `.js`-suffixed relative imports (e.g. `from './config.js'`) per the existing convention, even though the source files are `.ts`.
- This is a breaking change targeting **2.0.0** (semver major bump in `package.json`, `CHANGELOG.md` entry, `README.md` rewrite for the new call shape).
- Tests run via `pnpm exec playwright test --reporter=list` (`pnpm test`). Every new/rewritten unit test uses an **injected fake `HttpClient`** — no `global.fetch` monkeypatching anywhere in the new test suite.
- Test strategy (per design decision): a thorough dispatch/request engine test suite (unit-level, fake HTTP client) plus **one live-network smoke test per namespace** in `tests/api.spec.ts` — not one test per method. Existing `user.*`/`chart.*` live tests are preserved and adapted; `album`, `artist`, `auth`, `geo`, `library`, `tag`, `track` each gain exactly one new smoke test.
- Config: `LASTFM_API_KEY` and `LASTFM_API_BASE_URL` are **eager-required** (thrown at `loadConfig()`/`LastFmApi()` construction time). `LASTFM_SHARED_SECRET` is **lazy-required** (thrown only when a signed method is actually dispatched without it). `LASTFM_APPNAME` and `LASTFM_USER` are fully optional, defaulting to `''`.
- Four confirmed positional-argument bugs are fixed by construction in the new registry (not preserved): `chart.getTopArtists`'s `page`/`limit` swap, `chart.getTopTags`/`chart.getTopTracks`'s `page` misrouted as `user`, and `user.getPersonalTags`'s dropped `taggingtype`. All other methods preserve their exact current field-sending behavior (including pre-existing semantically-dead fields like `auth.getToken`'s `user`/`period`/`limit`) — fixing those is out of scope for this plan.
- The public `LastFmApi()` return value no longer exposes `config` or `method` (both were incidental implementation leaks in the old `index.ts`). Callers now call `api.<namespace>.<method>(namedParams)` directly; the method-name string is derived internally from the registry key.

---

## File Structure

**Create:**
- `src/registry.ts` — the method registry: `RequestFieldName`, `FieldSpec`, `MethodDef`, `defineMethod()`, the `registry` object (57 entries), `MethodName`, `ParamsFor<M>`, `ResponseFor<M>`.
- `src/dispatch.ts` — `dispatch()`: resolves params against the registry (defaults + required-field enforcement), routes to `request()` or `signedRequest()`.
- `src/namespaces.ts` — `buildNamespaces()`: builds the nested `{ album: { getInfo, ... }, ... }` object from the registry and an injected dispatcher function.
- `tests/registry.spec.ts`, `tests/dispatch.spec.ts`, `tests/namespaces.spec.ts`, `tests/index.spec.ts`, `tests/config.spec.ts` — new unit test files (fake `HttpClient`, no live network).

**Modify (rewrite in place):**
- `src/config.ts` — replace the `config` singleton with `loadConfig(env?)`.
- `src/request.ts` — replace the hardcoded 18-field `RequestOptions`/`buildUrl` with a generic `Params` bag, inject `HttpClient` and `Config` as parameters, extract shared `serializeParams()`/error-checking.
- `src/index.ts` — replace the 57-file import list with `LastFmApi(options?: { httpClient?: HttpClient })` built from `loadConfig()` + `buildNamespaces()`.
- `src/lastfm.types.ts` — remove duplicate/dead/conflicting type declarations (see Task 1).
- `tests/api.spec.ts` — adapt every call to the new `api.<namespace>.<method>(namedParams)` shape; add 7 new namespace smoke tests.
- `README.md`, `CHANGELOG.md`, `package.json` — 2.0.0 breaking-release docs and version bump.

**Delete:**
- `src/createOptions.ts`, `src/method.ts`, `src/auth.ts`.
- `src/album/`, `src/artist/`, `src/auth/`, `src/chart/`, `src/geo/`, `src/library/`, `src/tag/`, `src/track/`, `src/user/` (entire directories, 44 files).
- `src/getFriends.ts`, `src/getInfo.ts`, `src/getLovedTracks.ts`, `src/getRecentTracks.ts`, `src/getTopAlbums.ts`, `src/getTopArtists.ts`, `src/getTopTracks.ts`, `src/getUserTopTags.ts`, `src/getWeeklyAlbumChart.ts`, `src/getWeeklyArtistChart.ts`, `src/getWeeklyChartList.ts`, `src/getWeeklyTrackChart.ts` (12 legacy files).
- `tests/request.spec.ts` (replaced by the rewritten version in Task 3 — same filename, so this is folded into that task's rewrite, not a separate deletion step).

---

## Task 1: Fix duplicate and conflicting types in `lastfm.types.ts`

**Files:**
- Modify: `src/lastfm.types.ts`

**Interfaces:**
- Consumes: nothing (pure type-level cleanup).
- Produces: a `lastfm.types.ts` with no duplicate interface names and a single, correct `AttrLimit` (`{ user?: string; totalPages: string; page: string; perPage: string; total: string; }`).

This task removes: the unused `LoveTracksResponse` typo type + the duplicate `LovedTracks` interface it sits next to (lines 94-101), the duplicate `RecentTracks` interface (lines 241-244), the duplicate `WeeklyArtistChartResponse`/`WeeklyArtistChart` pair (lines 280-287), and the second, conflicting `AttrLimit` declaration (lines 293-297) that TypeScript was silently declaration-merging into the first, corrupting `TopTrackResponse`, `RecentTracksResponse`, `TopArtistsResponse`, `WeeklyArtistChartResponse`, `TopAlbumsResponse`, and `WeeklyTrackChartResponse`.

- [ ] **Step 1: Verify current compile state as a baseline**

Run: `pnpm exec tsc --noEmit -p tsconfig.json`
Expected: no errors (this is a baseline check before editing — the duplicates compile today because TypeScript allows re-declaring identical/merge-compatible interfaces).

- [ ] **Step 2: Remove the dead `LoveTracksResponse` type and its adjacent duplicate `LovedTracks`**

In `src/lastfm.types.ts`, find:

```typescript
export interface LoveTracksResponse {
  lovedtracks: LovedTracks;
}

export interface LovedTracks {
  track: Track[];
  '@attr': AttrNowPlaying;
}
export interface FriendsResponse {
```

Replace with:

```typescript
export interface FriendsResponse {
```

- [ ] **Step 3: Remove the duplicate `RecentTracks` declaration**

Find:

```typescript
export interface RecentTracks {
  track: Track[];
  '@attr': AttrLimit;
}

export interface Image {
```

Replace with:

```typescript
export interface Image {
```

- [ ] **Step 4: Remove the duplicate `WeeklyArtistChartResponse`/`WeeklyArtistChart` pair**

Find:

```typescript
export interface WeeklyArtistChartResponse {
  weeklyartistchart: WeeklyArtistChart;
}

export interface WeeklyArtistChart {
  artist: Artist[];
  '@attr': AttrLimit;
}

export interface AttrRank {
```

Replace with:

```typescript
export interface AttrRank {
```

- [ ] **Step 5: Remove the second, conflicting `AttrLimit` declaration**

Find:

```typescript
export interface AttrLimit {
  from: string;
  user?: string;
  to: string;
}

export interface WeeklyChartListResponse {
```

Replace with:

```typescript
export interface WeeklyChartListResponse {
```

- [ ] **Step 6: Verify the file still compiles and no duplicate names remain**

Run: `pnpm exec tsc --noEmit -p tsconfig.json`
Expected: no errors.

Run: `grep -c "^export interface LovedTracks " src/lastfm.types.ts`
Expected: `1`

Run: `grep -c "^export interface RecentTracks " src/lastfm.types.ts`
Expected: `1`

Run: `grep -c "^export interface WeeklyArtistChart " src/lastfm.types.ts`
Expected: `1`

Run: `grep -c "^export interface AttrLimit " src/lastfm.types.ts`
Expected: `1`

Run: `grep -c "LoveTracksResponse" src/lastfm.types.ts`
Expected: `0`

- [ ] **Step 7: Run the full existing test suite to confirm nothing broke**

Run: `pnpm test`
Expected: PASS (all existing tests, unaffected by this type-only cleanup)

- [ ] **Step 8: Commit**

```bash
git add src/lastfm.types.ts
git commit -m "fix: remove duplicate and conflicting type declarations in lastfm.types.ts"
```

---

## Task 2: Rewrite `config.ts` as a `loadConfig()` factory

**Files:**
- Modify: `src/config.ts`
- Test: `tests/config.spec.ts` (new)

**Interfaces:**
- Consumes: `process.env` (or an injected env-like object for testing).
- Produces: `export interface Config { apiKey: string; baseUrl: string; sharedSecret: string; appName: string; username: string; }` and `export function loadConfig(env?: NodeJS.ProcessEnv): Config`. Later tasks (`request.ts`, `dispatch.ts`, `index.ts`) consume `Config` and call `loadConfig()`.

This is the first step of a breaking change: after this task, the old `src/request.ts` (`import { config } from './config.js'`) and old `src/index.ts` will fail to compile, because the singleton `config` export no longer exists. That is expected and is resolved by Task 3 and Task 7 — the full package will not build cleanly again until Task 8. Each task's own test file is run in isolation (not the full suite) until then.

- [ ] **Step 1: Write the failing test**

Create `tests/config.spec.ts`:

```typescript
import { expect, test } from '@playwright/test';
import { loadConfig } from '../src/config.js';

test.describe('loadConfig', () => {
  test('throws when LASTFM_API_KEY is missing', () => {
    expect(() => loadConfig({ LASTFM_API_BASE_URL: 'https://example.com' })).toThrow(
      'Missing required environment variable: LASTFM_API_KEY',
    );
  });

  test('throws when LASTFM_API_BASE_URL is missing', () => {
    expect(() => loadConfig({ LASTFM_API_KEY: 'key' })).toThrow(
      'Missing required environment variable: LASTFM_API_BASE_URL',
    );
  });

  test('defaults optional fields to an empty string when unset', () => {
    const config = loadConfig({ LASTFM_API_KEY: 'key', LASTFM_API_BASE_URL: 'https://example.com' });

    expect(config.sharedSecret).toBe('');
    expect(config.appName).toBe('');
    expect(config.username).toBe('');
  });

  test('reads all provided values', () => {
    const config = loadConfig({
      LASTFM_API_KEY: 'key',
      LASTFM_API_BASE_URL: 'https://example.com',
      LASTFM_SHARED_SECRET: 'secret',
      LASTFM_APPNAME: 'app',
      LASTFM_USER: 'rj',
    });

    expect(config).toEqual({
      apiKey: 'key',
      baseUrl: 'https://example.com',
      sharedSecret: 'secret',
      appName: 'app',
      username: 'rj',
    });
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx playwright test tests/config.spec.ts --reporter=list`
Expected: FAIL — `loadConfig` is not exported from `../src/config.js` (module has no export named `loadConfig`).

- [ ] **Step 3: Rewrite `src/config.ts`**

Replace the entire contents of `src/config.ts` with:

```typescript
export interface Config {
  apiKey: string;
  baseUrl: string;
  sharedSecret: string;
  appName: string;
  username: string;
}

export function loadConfig(env: NodeJS.ProcessEnv = process.env): Config {
  const apiKey = env.LASTFM_API_KEY;
  const baseUrl = env.LASTFM_API_BASE_URL;

  if (!apiKey) {
    throw new Error('Missing required environment variable: LASTFM_API_KEY');
  }
  if (!baseUrl) {
    throw new Error('Missing required environment variable: LASTFM_API_BASE_URL');
  }

  return {
    apiKey,
    baseUrl,
    sharedSecret: env.LASTFM_SHARED_SECRET ?? '',
    appName: env.LASTFM_APPNAME ?? '',
    username: env.LASTFM_USER ?? '',
  };
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx playwright test tests/config.spec.ts --reporter=list`
Expected: PASS (4 tests)

- [ ] **Step 5: Commit**

```bash
git add src/config.ts tests/config.spec.ts
git commit -m "feat: replace config singleton with loadConfig() factory"
```

---

## Task 3: Rewrite `request.ts` with an injected `HttpClient` seam

**Files:**
- Modify: `src/request.ts`
- Modify: `tests/request.spec.ts` (full rewrite)

**Interfaces:**
- Consumes: `Config` (from `src/config.ts`, Task 2), `md5` (from `src/md5.ts`, unchanged).
- Produces: `export type HttpClient = typeof fetch;`, `export type Params = Record<string, string | undefined>;`, `export enum ErrorResponse { ... }`, `export async function request<TResponse>(methodName: string, params: Params, config: Config, httpClient: HttpClient): Promise<TResponse>`, `export async function signedRequest<TResponse>(methodName: string, params: Params, config: Config, httpClient: HttpClient): Promise<TResponse>`. Task 5 (`dispatch.ts`) consumes exactly these four exports.

- [ ] **Step 1: Write the failing test**

Replace the entire contents of `tests/request.spec.ts` with:

```typescript
import { expect, test } from '@playwright/test';
import { request, signedRequest, type HttpClient } from '../src/request.js';
import type { Config } from '../src/config.js';

const config: Config = {
  apiKey: 'test-api-key',
  baseUrl: 'https://ws.audioscrobbler.com/2.0/',
  sharedSecret: 'test-shared-secret',
  appName: '',
  username: '',
};

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json' },
  });
}

test.describe('request', () => {
  test('builds a GET URL with method, api_key, format, and provided params', async () => {
    let capturedUrl: string | undefined;
    const httpClient: HttpClient = async input => {
      capturedUrl = input.toString();
      return jsonResponse({ ok: true });
    };

    await request('album.getInfo', { artist: 'Radiohead', album: 'OK Computer' }, config, httpClient);

    const url = new URL(capturedUrl!);
    expect(url.searchParams.get('method')).toBe('album.getInfo');
    expect(url.searchParams.get('artist')).toBe('Radiohead');
    expect(url.searchParams.get('album')).toBe('OK Computer');
    expect(url.searchParams.get('api_key')).toBe('test-api-key');
    expect(url.searchParams.get('format')).toBe('json');
  });

  test('omits undefined and empty-string params from the URL', async () => {
    let capturedUrl: string | undefined;
    const httpClient: HttpClient = async input => {
      capturedUrl = input.toString();
      return jsonResponse({ ok: true });
    };

    await request('user.getRecentTracks', { user: 'rj', limit: '5', from: undefined }, config, httpClient);

    const url = new URL(capturedUrl!);
    expect(url.searchParams.has('from')).toBe(false);
  });

  test('throws on HTTP 401', async () => {
    const httpClient: HttpClient = async () => jsonResponse(null, 401);
    await expect(request('user.getInfo', { user: 'rj' }, config, httpClient)).rejects.toThrow('HTTP 401');
  });

  test('throws on HTTP 500', async () => {
    const httpClient: HttpClient = async () => jsonResponse(null, 500);
    await expect(request('user.getInfo', { user: 'rj' }, config, httpClient)).rejects.toThrow('HTTP 500');
  });

  test('throws on LastFM error 10 - Invalid API key', async () => {
    const httpClient: HttpClient = async () => jsonResponse({ error: 10, message: 'Invalid API key' });
    await expect(request('user.getInfo', { user: 'rj' }, config, httpClient)).rejects.toThrow(
      'LastFM error 10: Invalid API key',
    );
  });

  test('throws on LastFM error 6 - Invalid parameters', async () => {
    const httpClient: HttpClient = async () => jsonResponse({ error: 6, message: 'Invalid parameters' });
    await expect(request('user.getInfo', { user: 'rj' }, config, httpClient)).rejects.toThrow(
      'LastFM error 6: Invalid parameters',
    );
  });

  test('throws on LastFM error 29 - Rate limit exceeded', async () => {
    const httpClient: HttpClient = async () => jsonResponse({ error: 29, message: 'Rate limit exceeded' });
    await expect(request('user.getInfo', { user: 'rj' }, config, httpClient)).rejects.toThrow(
      'LastFM error 29: Rate limit exceeded',
    );
  });

  test('throws on LastFM error 26 - Suspended API key', async () => {
    const httpClient: HttpClient = async () => jsonResponse({ error: 26, message: 'Suspended API key' });
    await expect(request('user.getInfo', { user: 'rj' }, config, httpClient)).rejects.toThrow(
      'LastFM error 26: Suspended API key',
    );
  });

  test('propagates network errors', async () => {
    const httpClient: HttpClient = async () => {
      throw new Error('Network failure');
    };
    await expect(request('user.getInfo', { user: 'rj' }, config, httpClient)).rejects.toThrow('Network failure');
  });
});

test.describe('signedRequest', () => {
  test('POSTs a form-urlencoded body with a computed api_sig', async () => {
    let capturedUrl: string | undefined;
    let capturedInit: RequestInit | undefined;
    const httpClient: HttpClient = async (input, init) => {
      capturedUrl = input.toString();
      capturedInit = init;
      return jsonResponse({ token: 'abc' });
    };

    await signedRequest(
      'track.love',
      { artist: 'Radiohead', track: 'Karma Police', sk: 'session-key' },
      config,
      httpClient,
    );

    expect(capturedUrl).toBe(config.baseUrl);
    expect(capturedInit?.method).toBe('POST');
    expect((capturedInit?.headers as Record<string, string>)['Content-Type']).toBe(
      'application/x-www-form-urlencoded',
    );

    const body = capturedInit?.body as URLSearchParams;
    expect(body.get('artist')).toBe('Radiohead');
    expect(body.get('track')).toBe('Karma Police');
    expect(body.get('sk')).toBe('session-key');
    expect(body.get('api_sig')).toMatch(/^[a-f0-9]{32}$/);
  });

  test('produces a signature matching the documented Last.fm signing scheme', async () => {
    let capturedInit: RequestInit | undefined;
    const httpClient: HttpClient = async (_input, init) => {
      capturedInit = init;
      return jsonResponse({ token: 'abc' });
    };

    await signedRequest(
      'track.love',
      { artist: 'Radiohead', track: 'Karma Police', sk: 'session-key' },
      config,
      httpClient,
    );

    const body = capturedInit?.body as URLSearchParams;
    const { md5 } = await import('../src/md5.js');
    const sigParams: Record<string, string> = {
      method: 'track.love',
      api_key: config.apiKey,
      artist: 'Radiohead',
      track: 'Karma Police',
      sk: 'session-key',
    };
    const sortedKeys = Object.keys(sigParams).sort();
    const expectedSig = md5(sortedKeys.map(key => `${key}${sigParams[key]}`).join('') + config.sharedSecret);

    expect(body.get('api_sig')).toBe(expectedSig);
  });

  test('throws when the shared secret is missing', async () => {
    const httpClient: HttpClient = async () => jsonResponse({ token: 'abc' });
    const configWithoutSecret: Config = { ...config, sharedSecret: '' };

    await expect(
      signedRequest(
        'track.love',
        { artist: 'Radiohead', track: 'Karma Police', sk: 'session-key' },
        configWithoutSecret,
        httpClient,
      ),
    ).rejects.toThrow('LASTFM_SHARED_SECRET');
  });

  test('throws on a Last.fm error code', async () => {
    const httpClient: HttpClient = async () => jsonResponse({ error: 9, message: 'Invalid session key' });
    await expect(
      signedRequest('track.love', { artist: 'Radiohead', track: 'Karma Police', sk: 'bad-key' }, config, httpClient),
    ).rejects.toThrow('LastFM error 9: Invalid session key');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx playwright test tests/request.spec.ts --reporter=list`
Expected: FAIL — `src/request.ts` does not export `HttpClient`, and `request`/`signedRequest` have the old single-argument signature.

- [ ] **Step 3: Rewrite `src/request.ts`**

Replace the entire contents of `src/request.ts` with:

```typescript
import { md5 } from './md5.js';
import type { Config } from './config.js';

export type HttpClient = typeof fetch;
export type Params = Record<string, string | undefined>;

/**
 * Last.fm API error codes.
 * @see https://www.last.fm/api/errorcodes
 */
export enum ErrorResponse {
  InvalidService = 2,
  InvalidMethod = 3,
  AuthenticationFailed = 4,
  InvalidFormat = 5,
  InvalidParameters = 6,
  InvalidResource = 7,
  OperationFailed = 8,
  InvalidSessionKey = 9,
  InvalidAPIKey = 10,
  ServiceOffline = 11,
  InvalidMethodSignature = 13,
  TemporaryError = 16,
  SuspendedAPIKey = 26,
  RateLimitExceeded = 29,
}

const ErrorMessages: Record<number, string> = {
  [ErrorResponse.InvalidService]: 'Invalid service',
  [ErrorResponse.InvalidMethod]: 'Invalid method',
  [ErrorResponse.AuthenticationFailed]: 'Authentication failed',
  [ErrorResponse.InvalidFormat]: 'Invalid format',
  [ErrorResponse.InvalidParameters]: 'Invalid parameters',
  [ErrorResponse.InvalidResource]: 'Invalid resource',
  [ErrorResponse.OperationFailed]: 'Operation failed',
  [ErrorResponse.InvalidSessionKey]: 'Invalid session key',
  [ErrorResponse.InvalidAPIKey]: 'Invalid API key',
  [ErrorResponse.ServiceOffline]: 'Service offline',
  [ErrorResponse.InvalidMethodSignature]: 'Invalid method signature',
  [ErrorResponse.TemporaryError]: 'Temporary error',
  [ErrorResponse.SuspendedAPIKey]: 'Suspended API key',
  [ErrorResponse.RateLimitExceeded]: 'Rate limit exceeded',
};

function serializeParams(params: Params): URLSearchParams {
  const search = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== '') {
      search.append(key, value);
    }
  }
  return search;
}

async function parseJsonResponse<TResponse>(res: Response): Promise<TResponse> {
  if (!res.ok) {
    throw new Error(`HTTP ${res.status}: ${res.statusText}`);
  }

  const body = (await res.json()) as { error?: number; message?: string };

  if (body.error) {
    const message = ErrorMessages[body.error] ?? body.message ?? 'Unknown error';
    throw new Error(`LastFM error ${body.error}: ${message}`);
  }

  return body as TResponse;
}

/**
 * Performs a GET request to the Last.fm API.
 *
 * Throws an `Error` on HTTP failure or if the Last.fm response body contains an error code.
 */
export async function request<TResponse>(
  methodName: string,
  params: Params,
  config: Config,
  httpClient: HttpClient,
): Promise<TResponse> {
  const search = serializeParams(params);
  search.append('method', methodName);
  search.append('api_key', config.apiKey);
  search.append('format', 'json');

  const res = await httpClient(`${config.baseUrl}?${search.toString()}`, {
    headers: { 'Content-Type': 'application/json' },
  });

  return parseJsonResponse<TResponse>(res);
}

/**
 * Performs an MD5-signed POST request to the Last.fm API.
 *
 * Used for write operations (scrobble, love, addTags, auth sessions). Generates an `api_sig`
 * by sorting all parameters alphabetically, concatenating `key+value` pairs, appending the
 * shared secret, and MD5-hashing the result.
 */
export async function signedRequest<TResponse>(
  methodName: string,
  params: Params,
  config: Config,
  httpClient: HttpClient,
): Promise<TResponse> {
  if (!config.sharedSecret) {
    throw new Error('Missing required environment variable: LASTFM_SHARED_SECRET (required for signed requests)');
  }

  const sigParams: Record<string, string> = { method: methodName, api_key: config.apiKey };
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== '') {
      sigParams[key] = value;
    }
  }

  const sortedKeys = Object.keys(sigParams).sort();
  const sigString = sortedKeys.map(key => `${key}${sigParams[key]}`).join('') + config.sharedSecret;
  const apiSig = md5(sigString);

  const body = serializeParams(params);
  body.append('method', methodName);
  body.append('api_key', config.apiKey);
  body.append('api_sig', apiSig);
  body.append('format', 'json');

  const res = await httpClient(config.baseUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body,
  });

  return parseJsonResponse<TResponse>(res);
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx playwright test tests/request.spec.ts --reporter=list`
Expected: PASS (13 tests)

- [ ] **Step 5: Commit**

```bash
git add src/request.ts tests/request.spec.ts
git commit -m "feat: inject HttpClient and Config into request/signedRequest"
```

---

## Task 4: Build the method registry (`src/registry.ts`)

**Files:**
- Create: `src/registry.ts`
- Test: `tests/registry.spec.ts` (new)

**Interfaces:**
- Consumes: every response type from `src/lastfm.types.ts` (Task 1's cleaned-up version).
- Produces: `export type RequestFieldName = 'user' | 'tag' | 'period' | 'limit' | 'page' | 'from' | 'artist' | 'album' | 'track' | 'country' | 'autocorrect' | 'lang' | 'sk' | 'token' | 'tags' | 'timestamp' | 'username' | 'password' | 'taggingtype';`, `export interface FieldSpec<Required extends boolean = boolean> { required: Required; default?: string; }`, `export interface MethodDef<P = Partial<Record<RequestFieldName, string | undefined>>, R = unknown> { namespace: string; signed: boolean; fields: Partial<Record<RequestFieldName, FieldSpec>>; readonly __response?: R; }`, `export const registry = { ... } satisfies Record<string, MethodDef>;`, `export type MethodName = keyof typeof registry;`, `export type ParamsFor<M extends MethodName> = ...`, `export type ResponseFor<M extends MethodName> = ...`. Task 5 (`dispatch.ts`) and Task 6 (`namespaces.ts`) consume `registry`, `MethodName`, `ParamsFor`, `ResponseFor`.

- [ ] **Step 1: Write the failing test**

Create `tests/registry.spec.ts`:

```typescript
import { expect, test } from '@playwright/test';
import { registry } from '../src/registry.js';

test.describe('registry', () => {
  test('contains exactly 57 methods', () => {
    expect(Object.keys(registry)).toHaveLength(57);
  });

  test('every registry key matches the "<namespace>.<method>" shape', () => {
    for (const key of Object.keys(registry)) {
      expect(key).toMatch(/^[a-z]+\.[a-zA-Z]+$/);
    }
  });

  test('chart.getTopArtists exposes limit and page as separate required fields (bug fix)', () => {
    const def = registry['chart.getTopArtists'];
    expect(def.fields.limit).toEqual({ required: true });
    expect(def.fields.page).toEqual({ required: true });
  });

  test('chart.getTopTags and chart.getTopTracks require only page (bug fix)', () => {
    expect(Object.keys(registry['chart.getTopTags'].fields)).toEqual(['page']);
    expect(Object.keys(registry['chart.getTopTracks'].fields)).toEqual(['page']);
  });

  test('user.getPersonalTags requires taggingtype (bug fix)', () => {
    expect(registry['user.getPersonalTags'].fields.taggingtype).toEqual({ required: true });
  });

  test('signed methods are flagged correctly', () => {
    expect(registry['track.scrobble'].signed).toBe(true);
    expect(registry['album.getInfo'].signed).toBe(false);
    expect(registry['auth.getSession'].signed).toBe(true);
    expect(registry['auth.getToken'].signed).toBe(false);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx playwright test tests/registry.spec.ts --reporter=list`
Expected: FAIL — `Cannot find module '../src/registry.js'`.

- [ ] **Step 3: Create `src/registry.ts`**

```typescript
import type {
  AlbumInfoResponse,
  AlbumSearchResponse,
  AlbumTagsResponse,
  AlbumTopTagsResponse,
  ArtistCorrectionResponse,
  ArtistInfoResponse,
  ArtistSearchResponse,
  ArtistSimilarResponse,
  ArtistTagsResponse,
  ArtistTopAlbumsResponse,
  ArtistTopTagsResponse,
  ArtistTopTracksResponse,
  AuthMobileSessionResponse,
  AuthResponse,
  AuthSessionResponse,
  ChartTopArtistResponse,
  ChartTopTagsResponse,
  ChartTopTracksResponse,
  FriendsResponse,
  GeoTopArtistsResponse,
  GeoTopTracksResponse,
  LibraryArtistsResponse,
  LovedTracksResponse,
  RecentTracksResponse,
  ScrobbleResponse,
  TagInfoResponse,
  TagSimilarResponse,
  TagTopAlbumsResponse,
  TagTopArtistsResponse,
  TagTopTagsResponse,
  TagTopTracksResponse,
  TagWeeklyChartListResponse,
  TopAlbumsResponse,
  TopArtistsResponse,
  TopTrackResponse,
  TrackCorrectionResponse,
  TrackInfoResponse,
  TrackSearchResponse,
  TrackSimilarResponse,
  TrackTagsResponse,
  TrackTopTagsResponse,
  UserPersonalTagsResponse,
  UserResponse,
  UserTopTagsResponse,
  WeeklyAlbumChartResponse,
  WeeklyArtistChartResponse,
  WeeklyChartListResponse,
  WeeklyTrackChartResponse,
} from './lastfm.types.js';

export type RequestFieldName =
  | 'user'
  | 'tag'
  | 'period'
  | 'limit'
  | 'page'
  | 'from'
  | 'artist'
  | 'album'
  | 'track'
  | 'country'
  | 'autocorrect'
  | 'lang'
  | 'sk'
  | 'token'
  | 'tags'
  | 'timestamp'
  | 'username'
  | 'password'
  | 'taggingtype';

export interface FieldSpec<Required extends boolean = boolean> {
  required: Required;
  default?: string;
}

type FieldsShape = Partial<Record<RequestFieldName, FieldSpec>>;

type RequiredKeys<F extends FieldsShape> = {
  [K in keyof F]: F[K] extends FieldSpec<true> ? K : never;
}[keyof F];

type OptionalKeys<F extends FieldsShape> = {
  [K in keyof F]: F[K] extends FieldSpec<true> ? never : K;
}[keyof F];

type ParamsFromFields<F extends FieldsShape> = { [K in RequiredKeys<F>]: string } & {
  [K in OptionalKeys<F>]?: string;
};

export interface MethodDef<
  P extends Partial<Record<RequestFieldName, string | undefined>> = Partial<Record<RequestFieldName, string | undefined>>,
  R = unknown,
> {
  namespace: string;
  signed: boolean;
  fields: FieldsShape;
  readonly __response?: R;
}

export function defineMethod<F extends FieldsShape>(def: { namespace: string; signed: boolean; fields: F }) {
  return function <R>(): MethodDef<ParamsFromFields<F>, R> {
    return def as unknown as MethodDef<ParamsFromFields<F>, R>;
  };
}

export const registry = {
  // Album
  'album.addTags': defineMethod({
    namespace: 'album',
    signed: true,
    fields: {
      artist: { required: true },
      album: { required: true },
      tags: { required: true },
      sk: { required: true },
    },
  })<AuthResponse>(),
  'album.getInfo': defineMethod({
    namespace: 'album',
    signed: false,
    fields: {
      artist: { required: true },
      album: { required: true },
      autocorrect: { required: false, default: '1' },
      lang: { required: false, default: 'en' },
    },
  })<AlbumInfoResponse>(),
  'album.getTags': defineMethod({
    namespace: 'album',
    signed: false,
    fields: {
      artist: { required: true },
      album: { required: true },
      user: { required: true },
      autocorrect: { required: false, default: '1' },
    },
  })<AlbumTagsResponse>(),
  'album.getTopTags': defineMethod({
    namespace: 'album',
    signed: false,
    fields: {
      artist: { required: true },
      album: { required: true },
      autocorrect: { required: false, default: '1' },
    },
  })<AlbumTopTagsResponse>(),
  'album.removeTag': defineMethod({
    namespace: 'album',
    signed: true,
    fields: {
      artist: { required: true },
      album: { required: true },
      tag: { required: true },
      sk: { required: true },
    },
  })<AuthResponse>(),
  'album.search': defineMethod({
    namespace: 'album',
    signed: false,
    fields: {
      album: { required: true },
      limit: { required: false, default: '30' },
      page: { required: false, default: '1' },
    },
  })<AlbumSearchResponse>(),

  // Artist
  'artist.addTags': defineMethod({
    namespace: 'artist',
    signed: true,
    fields: {
      artist: { required: true },
      tags: { required: true },
      sk: { required: true },
    },
  })<AuthResponse>(),
  'artist.getCorrection': defineMethod({
    namespace: 'artist',
    signed: false,
    fields: {
      artist: { required: true },
    },
  })<ArtistCorrectionResponse>(),
  'artist.getInfo': defineMethod({
    namespace: 'artist',
    signed: false,
    fields: {
      artist: { required: true },
      autocorrect: { required: false, default: '1' },
      lang: { required: false, default: 'en' },
    },
  })<ArtistInfoResponse>(),
  'artist.getSimilar': defineMethod({
    namespace: 'artist',
    signed: false,
    fields: {
      artist: { required: true },
      limit: { required: false, default: '30' },
      autocorrect: { required: false, default: '1' },
    },
  })<ArtistSimilarResponse>(),
  'artist.getTags': defineMethod({
    namespace: 'artist',
    signed: false,
    fields: {
      artist: { required: true },
      user: { required: true },
      autocorrect: { required: false, default: '1' },
    },
  })<ArtistTagsResponse>(),
  'artist.getTopAlbums': defineMethod({
    namespace: 'artist',
    signed: false,
    fields: {
      artist: { required: true },
      limit: { required: false, default: '50' },
      page: { required: false, default: '1' },
      autocorrect: { required: false, default: '1' },
    },
  })<ArtistTopAlbumsResponse>(),
  'artist.getTopTags': defineMethod({
    namespace: 'artist',
    signed: false,
    fields: {
      artist: { required: true },
      autocorrect: { required: false, default: '1' },
    },
  })<ArtistTopTagsResponse>(),
  'artist.getTopTracks': defineMethod({
    namespace: 'artist',
    signed: false,
    fields: {
      artist: { required: true },
      limit: { required: false, default: '50' },
      page: { required: false, default: '1' },
      autocorrect: { required: false, default: '1' },
    },
  })<ArtistTopTracksResponse>(),
  'artist.removeTag': defineMethod({
    namespace: 'artist',
    signed: true,
    fields: {
      artist: { required: true },
      tag: { required: true },
      sk: { required: true },
    },
  })<AuthResponse>(),
  'artist.search': defineMethod({
    namespace: 'artist',
    signed: false,
    fields: {
      artist: { required: true },
      limit: { required: false, default: '30' },
      page: { required: false, default: '1' },
    },
  })<ArtistSearchResponse>(),

  // Auth
  'auth.getMobileSession': defineMethod({
    namespace: 'auth',
    signed: true,
    fields: {
      username: { required: true },
      password: { required: true },
    },
  })<AuthMobileSessionResponse>(),
  'auth.getSession': defineMethod({
    namespace: 'auth',
    signed: true,
    fields: {
      token: { required: true },
    },
  })<AuthSessionResponse>(),
  'auth.getToken': defineMethod({
    namespace: 'auth',
    signed: false,
    fields: {
      user: { required: true },
      period: { required: true },
      limit: { required: true },
    },
  })<AuthResponse>(),

  // Chart
  'chart.getTopArtists': defineMethod({
    namespace: 'chart',
    signed: false,
    fields: {
      user: { required: true },
      period: { required: true },
      limit: { required: true },
      page: { required: true },
    },
  })<ChartTopArtistResponse>(),
  'chart.getTopTags': defineMethod({
    namespace: 'chart',
    signed: false,
    fields: {
      page: { required: true },
    },
  })<ChartTopTagsResponse>(),
  'chart.getTopTracks': defineMethod({
    namespace: 'chart',
    signed: false,
    fields: {
      page: { required: true },
    },
  })<ChartTopTracksResponse>(),

  // Geo
  'geo.getTopArtists': defineMethod({
    namespace: 'geo',
    signed: false,
    fields: {
      country: { required: true },
      limit: { required: false, default: '50' },
      page: { required: false, default: '1' },
    },
  })<GeoTopArtistsResponse>(),
  'geo.getTopTracks': defineMethod({
    namespace: 'geo',
    signed: false,
    fields: {
      country: { required: true },
      limit: { required: false, default: '50' },
      page: { required: false, default: '1' },
    },
  })<GeoTopTracksResponse>(),

  // Library
  'library.getArtists': defineMethod({
    namespace: 'library',
    signed: false,
    fields: {
      user: { required: true },
      limit: { required: false, default: '50' },
      page: { required: false, default: '1' },
    },
  })<LibraryArtistsResponse>(),

  // Tag
  'tag.getInfo': defineMethod({
    namespace: 'tag',
    signed: false,
    fields: {
      tag: { required: true },
      lang: { required: false, default: 'en' },
    },
  })<TagInfoResponse>(),
  'tag.getSimilar': defineMethod({
    namespace: 'tag',
    signed: false,
    fields: {
      tag: { required: true },
    },
  })<TagSimilarResponse>(),
  'tag.getTopAlbums': defineMethod({
    namespace: 'tag',
    signed: false,
    fields: {
      tag: { required: true },
      limit: { required: false, default: '50' },
      page: { required: false, default: '1' },
    },
  })<TagTopAlbumsResponse>(),
  'tag.getTopArtists': defineMethod({
    namespace: 'tag',
    signed: false,
    fields: {
      tag: { required: true },
      limit: { required: false, default: '50' },
      page: { required: false, default: '1' },
    },
  })<TagTopArtistsResponse>(),
  'tag.getTopTags': defineMethod({
    namespace: 'tag',
    signed: false,
    fields: {},
  })<TagTopTagsResponse>(),
  'tag.getTopTracks': defineMethod({
    namespace: 'tag',
    signed: false,
    fields: {
      tag: { required: true },
      limit: { required: true },
    },
  })<TagTopTracksResponse>(),
  'tag.getWeeklyChartList': defineMethod({
    namespace: 'tag',
    signed: false,
    fields: {
      tag: { required: true },
    },
  })<TagWeeklyChartListResponse>(),

  // Track
  'track.addTags': defineMethod({
    namespace: 'track',
    signed: true,
    fields: {
      artist: { required: true },
      track: { required: true },
      tags: { required: true },
      sk: { required: true },
    },
  })<AuthResponse>(),
  'track.getCorrection': defineMethod({
    namespace: 'track',
    signed: false,
    fields: {
      artist: { required: true },
      track: { required: true },
    },
  })<TrackCorrectionResponse>(),
  'track.getInfo': defineMethod({
    namespace: 'track',
    signed: false,
    fields: {
      artist: { required: true },
      track: { required: true },
      autocorrect: { required: false, default: '1' },
      lang: { required: false, default: 'en' },
    },
  })<TrackInfoResponse>(),
  'track.getSimilar': defineMethod({
    namespace: 'track',
    signed: false,
    fields: {
      artist: { required: true },
      track: { required: true },
      limit: { required: false, default: '30' },
      autocorrect: { required: false, default: '1' },
    },
  })<TrackSimilarResponse>(),
  'track.getTags': defineMethod({
    namespace: 'track',
    signed: false,
    fields: {
      artist: { required: true },
      track: { required: true },
      user: { required: true },
      autocorrect: { required: false, default: '1' },
    },
  })<TrackTagsResponse>(),
  'track.getTopTags': defineMethod({
    namespace: 'track',
    signed: false,
    fields: {
      artist: { required: true },
      track: { required: true },
      autocorrect: { required: false, default: '1' },
    },
  })<TrackTopTagsResponse>(),
  'track.love': defineMethod({
    namespace: 'track',
    signed: true,
    fields: {
      artist: { required: true },
      track: { required: true },
      sk: { required: true },
    },
  })<AuthResponse>(),
  'track.removeTag': defineMethod({
    namespace: 'track',
    signed: true,
    fields: {
      artist: { required: true },
      track: { required: true },
      tag: { required: true },
      sk: { required: true },
    },
  })<AuthResponse>(),
  'track.scrobble': defineMethod({
    namespace: 'track',
    signed: true,
    fields: {
      artist: { required: true },
      track: { required: true },
      timestamp: { required: true },
      album: { required: true },
      sk: { required: true },
    },
  })<ScrobbleResponse>(),
  'track.search': defineMethod({
    namespace: 'track',
    signed: false,
    fields: {
      track: { required: true },
      artist: { required: false },
      limit: { required: false, default: '30' },
      page: { required: false, default: '1' },
    },
  })<TrackSearchResponse>(),
  'track.unlove': defineMethod({
    namespace: 'track',
    signed: true,
    fields: {
      artist: { required: true },
      track: { required: true },
      sk: { required: true },
    },
  })<AuthResponse>(),
  'track.updateNowPlaying': defineMethod({
    namespace: 'track',
    signed: true,
    fields: {
      artist: { required: true },
      track: { required: true },
      album: { required: true },
      sk: { required: true },
    },
  })<AuthResponse>(),

  // User
  'user.getFriends': defineMethod({
    namespace: 'user',
    signed: false,
    fields: {
      user: { required: true },
      limit: { required: true },
    },
  })<FriendsResponse>(),
  'user.getInfo': defineMethod({
    namespace: 'user',
    signed: false,
    fields: {
      user: { required: true },
    },
  })<UserResponse>(),
  'user.getLovedTracks': defineMethod({
    namespace: 'user',
    signed: false,
    fields: {
      user: { required: true },
      period: { required: true },
      limit: { required: true },
    },
  })<LovedTracksResponse>(),
  'user.getPersonalTags': defineMethod({
    namespace: 'user',
    signed: false,
    fields: {
      user: { required: true },
      tag: { required: true },
      taggingtype: { required: true },
      limit: { required: false, default: '50' },
      page: { required: false, default: '1' },
    },
  })<UserPersonalTagsResponse>(),
  'user.getRecentTracks': defineMethod({
    namespace: 'user',
    signed: false,
    fields: {
      user: { required: true },
      limit: { required: true },
      from: { required: false },
    },
  })<RecentTracksResponse>(),
  'user.getTopAlbums': defineMethod({
    namespace: 'user',
    signed: false,
    fields: {
      user: { required: true },
      period: { required: true },
      limit: { required: true },
    },
  })<TopAlbumsResponse>(),
  'user.getTopArtists': defineMethod({
    namespace: 'user',
    signed: false,
    fields: {
      user: { required: true },
      period: { required: true },
      limit: { required: true },
    },
  })<TopArtistsResponse>(),
  'user.getTopTags': defineMethod({
    namespace: 'user',
    signed: false,
    fields: {
      user: { required: true },
      limit: { required: true },
    },
  })<UserTopTagsResponse>(),
  'user.getTopTracks': defineMethod({
    namespace: 'user',
    signed: false,
    fields: {
      user: { required: true },
      period: { required: true },
      limit: { required: true },
    },
  })<TopTrackResponse>(),
  'user.getWeeklyAlbumChart': defineMethod({
    namespace: 'user',
    signed: false,
    fields: {
      user: { required: true },
      period: { required: true },
      limit: { required: true },
    },
  })<WeeklyAlbumChartResponse>(),
  'user.getWeeklyArtistChart': defineMethod({
    namespace: 'user',
    signed: false,
    fields: {
      user: { required: true },
      period: { required: true },
      limit: { required: true },
    },
  })<WeeklyArtistChartResponse>(),
  'user.getWeeklyChartList': defineMethod({
    namespace: 'user',
    signed: false,
    fields: {
      user: { required: true },
      period: { required: true },
      limit: { required: true },
    },
  })<WeeklyChartListResponse>(),
  'user.getWeeklyTrackChart': defineMethod({
    namespace: 'user',
    signed: false,
    fields: {
      user: { required: true },
      period: { required: true },
      limit: { required: true },
    },
  })<WeeklyTrackChartResponse>(),
} satisfies Record<string, MethodDef>;

export type MethodName = keyof typeof registry;

export type ParamsFor<M extends MethodName> = (typeof registry)[M] extends MethodDef<infer P, infer _R> ? P : never;

export type ResponseFor<M extends MethodName> = (typeof registry)[M] extends MethodDef<infer _P, infer R> ? R : never;
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx playwright test tests/registry.spec.ts --reporter=list`
Expected: PASS (6 tests)

- [ ] **Step 5: Verify the registry type-checks on its own**

Run: `pnpm exec tsc --noEmit -p tsconfig.json`
Expected: errors only in files this plan hasn't rewritten yet (old `src/index.ts`, old method-wrapper files, old `src/request.ts` callers) — `src/registry.ts` itself must show zero errors. Confirm by running:

Run: `pnpm exec tsc --noEmit --strict --noUncheckedIndexedAccess --module ESNext --moduleResolution bundler --target ESNext src/registry.ts src/lastfm.types.ts`
Expected: no errors.

- [ ] **Step 6: Commit**

```bash
git add src/registry.ts tests/registry.spec.ts
git commit -m "feat: add the method registry as the single source of truth for all 57 endpoints"
```

---

## Task 5: Build the dispatch engine (`src/dispatch.ts`)

**Files:**
- Create: `src/dispatch.ts`
- Test: `tests/dispatch.spec.ts` (new)

**Interfaces:**
- Consumes: `registry`, `MethodName`, `ParamsFor`, `ResponseFor` (from `src/registry.ts`, Task 4); `request`, `signedRequest`, `HttpClient`, `Params` (from `src/request.ts`, Task 3); `Config` (from `src/config.ts`, Task 2).
- Produces: `export async function dispatch<M extends MethodName>(methodName: M, params: ParamsFor<M>, config: Config, httpClient: HttpClient): Promise<ResponseFor<M>>`. Task 6 (`namespaces.ts`) and Task 7 (`index.ts`) consume `dispatch`.

- [ ] **Step 1: Write the failing test**

Create `tests/dispatch.spec.ts`:

```typescript
import { expect, test } from '@playwright/test';
import { dispatch } from '../src/dispatch.js';
import type { HttpClient } from '../src/request.js';
import type { Config } from '../src/config.js';

const config: Config = {
  apiKey: 'test-api-key',
  baseUrl: 'https://ws.audioscrobbler.com/2.0/',
  sharedSecret: 'test-shared-secret',
  appName: '',
  username: '',
};

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json' },
  });
}

test.describe('dispatch', () => {
  test('applies field defaults for an unsigned method', async () => {
    let capturedUrl: string | undefined;
    const httpClient: HttpClient = async input => {
      capturedUrl = input.toString();
      return jsonResponse({ album: { name: 'OK Computer' } });
    };

    await dispatch('album.getInfo', { artist: 'Radiohead', album: 'OK Computer' }, config, httpClient);

    const url = new URL(capturedUrl!);
    expect(url.searchParams.get('autocorrect')).toBe('1');
    expect(url.searchParams.get('lang')).toBe('en');
  });

  test('throws a clear error naming every missing required field', async () => {
    const httpClient: HttpClient = async () => jsonResponse({});

    await expect(
      dispatch('user.getPersonalTags', { user: 'rj', tag: 'rock' } as never, config, httpClient),
    ).rejects.toThrow('user.getPersonalTags is missing required field(s): taggingtype');
  });

  test('sends chart.getTopArtists limit and page without swapping them (regression)', async () => {
    let capturedUrl: string | undefined;
    const httpClient: HttpClient = async input => {
      capturedUrl = input.toString();
      return jsonResponse({ artists: { artist: [] } });
    };

    await dispatch('chart.getTopArtists', { user: '', period: '', limit: '5', page: '2' }, config, httpClient);

    const url = new URL(capturedUrl!);
    expect(url.searchParams.get('limit')).toBe('5');
    expect(url.searchParams.get('page')).toBe('2');
  });

  test('sends chart.getTopTags page correctly instead of misrouting it to user (regression)', async () => {
    let capturedUrl: string | undefined;
    const httpClient: HttpClient = async input => {
      capturedUrl = input.toString();
      return jsonResponse({ tags: { tag: [] } });
    };

    await dispatch('chart.getTopTags', { page: '3' }, config, httpClient);

    const url = new URL(capturedUrl!);
    expect(url.searchParams.get('page')).toBe('3');
    expect(url.searchParams.has('user')).toBe(false);
  });

  test('routes signed methods through a POST with a computed api_sig', async () => {
    let capturedInit: RequestInit | undefined;
    const httpClient: HttpClient = async (_input, init) => {
      capturedInit = init;
      return jsonResponse({ token: 'abc' });
    };

    await dispatch('track.love', { artist: 'Radiohead', track: 'Karma Police', sk: 'session-key' }, config, httpClient);

    expect(capturedInit?.method).toBe('POST');
    expect((capturedInit?.body as URLSearchParams).get('api_sig')).toBeTruthy();
  });

  test('propagates errors raised by the underlying request', async () => {
    const httpClient: HttpClient = async () => jsonResponse({ error: 6, message: 'Invalid parameters' });

    await expect(dispatch('user.getInfo', { user: 'rj' }, config, httpClient)).rejects.toThrow(
      'LastFM error 6: Invalid parameters',
    );
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx playwright test tests/dispatch.spec.ts --reporter=list`
Expected: FAIL — `Cannot find module '../src/dispatch.js'`.

- [ ] **Step 3: Create `src/dispatch.ts`**

```typescript
import type { Config } from './config.js';
import { request, signedRequest, type HttpClient, type Params } from './request.js';
import { registry, type MethodName, type ParamsFor, type ResponseFor } from './registry.js';

function resolveParams(methodName: MethodName, params: Params): Params {
  const def = registry[methodName];
  const resolved: Params = {};
  const missing: string[] = [];

  for (const [field, spec] of Object.entries(def.fields)) {
    if (!spec) continue;

    const value = params[field];
    if (value !== undefined) {
      resolved[field] = value;
    } else if (spec.default !== undefined) {
      resolved[field] = spec.default;
    } else if (spec.required) {
      missing.push(field);
    }
  }

  if (missing.length > 0) {
    throw new Error(`${methodName} is missing required field(s): ${missing.join(', ')}`);
  }

  return resolved;
}

export async function dispatch<M extends MethodName>(
  methodName: M,
  params: ParamsFor<M>,
  config: Config,
  httpClient: HttpClient,
): Promise<ResponseFor<M>> {
  const def = registry[methodName];
  const resolvedParams = resolveParams(methodName, params as Params);

  if (def.signed) {
    return signedRequest<ResponseFor<M>>(methodName, resolvedParams, config, httpClient);
  }

  return request<ResponseFor<M>>(methodName, resolvedParams, config, httpClient);
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx playwright test tests/dispatch.spec.ts --reporter=list`
Expected: PASS (6 tests)

- [ ] **Step 5: Commit**

```bash
git add src/dispatch.ts tests/dispatch.spec.ts
git commit -m "feat: add the dispatch engine for registry-driven param resolution and routing"
```

---

## Task 6: Build the namespace generator (`src/namespaces.ts`)

**Files:**
- Create: `src/namespaces.ts`
- Test: `tests/namespaces.spec.ts` (new)

**Interfaces:**
- Consumes: `registry`, `MethodName`, `ParamsFor`, `ResponseFor` (from `src/registry.ts`, Task 4).
- Produces: `export type Namespaces = { [namespace]: { [method]: (params) => Promise<response> } }` (derived from the registry keys), `export type Dispatcher = <M extends MethodName>(methodName: M, params: ParamsFor<M>) => Promise<ResponseFor<M>>`, `export function buildNamespaces(dispatch: Dispatcher): Namespaces`. Task 7 (`index.ts`) consumes `buildNamespaces` and `Namespaces`.

- [ ] **Step 1: Write the failing test**

Create `tests/namespaces.spec.ts`:

```typescript
import { expect, test } from '@playwright/test';
import { buildNamespaces } from '../src/namespaces.js';
import type { MethodName, ParamsFor, ResponseFor } from '../src/registry.js';

test.describe('buildNamespaces', () => {
  test('groups all registry methods under their namespace', () => {
    const api = buildNamespaces(async <M extends MethodName>(_methodName: M, _params: ParamsFor<M>) => {
      return {} as ResponseFor<M>;
    });

    expect(Object.keys(api).sort()).toEqual(
      ['album', 'artist', 'auth', 'chart', 'geo', 'library', 'tag', 'track', 'user'].sort(),
    );
    expect(typeof api.album.getInfo).toBe('function');
    expect(typeof api.user.getPersonalTags).toBe('function');
  });

  test('dispatches through the injected function with the correct method name', async () => {
    const calls: MethodName[] = [];
    const api = buildNamespaces(async <M extends MethodName>(methodName: M, _params: ParamsFor<M>) => {
      calls.push(methodName);
      return {} as ResponseFor<M>;
    });

    await api.album.getInfo({ artist: 'Radiohead', album: 'OK Computer' });

    expect(calls).toEqual(['album.getInfo']);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx playwright test tests/namespaces.spec.ts --reporter=list`
Expected: FAIL — `Cannot find module '../src/namespaces.js'`.

- [ ] **Step 3: Create `src/namespaces.ts`**

```typescript
import { registry, type MethodName, type ParamsFor, type ResponseFor } from './registry.js';

type NamespaceOf<M extends MethodName> = M extends `${infer Namespace}.${string}` ? Namespace : never;
type MethodNameOf<M extends MethodName, Namespace extends string> = M extends `${Namespace}.${infer Rest}`
  ? Rest
  : never;
type MethodsInNamespace<Namespace extends string> = Extract<MethodName, `${Namespace}.${string}`>;

export type Namespaces = {
  [Namespace in NamespaceOf<MethodName>]: {
    [M in MethodsInNamespace<Namespace> as MethodNameOf<M, Namespace>]: (
      params: ParamsFor<M>,
    ) => Promise<ResponseFor<M>>;
  };
};

export type Dispatcher = <M extends MethodName>(methodName: M, params: ParamsFor<M>) => Promise<ResponseFor<M>>;

export function buildNamespaces(dispatch: Dispatcher): Namespaces {
  const namespaces: Record<string, Record<string, unknown>> = {};

  for (const methodName of Object.keys(registry) as MethodName[]) {
    const [namespace, method] = methodName.split('.') as [string, string];
    namespaces[namespace] ??= {};
    namespaces[namespace][method] = (params: ParamsFor<typeof methodName>) => dispatch(methodName, params);
  }

  return namespaces as Namespaces;
}
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx playwright test tests/namespaces.spec.ts --reporter=list`
Expected: PASS (2 tests)

- [ ] **Step 5: Commit**

```bash
git add src/namespaces.ts tests/namespaces.spec.ts
git commit -m "feat: generate the public namespaced api object from the registry"
```

---

## Task 7: Rewrite `index.ts` as the `LastFmApi` factory

**Files:**
- Modify: `src/index.ts`
- Test: `tests/index.spec.ts` (new)

**Interfaces:**
- Consumes: `loadConfig` (`src/config.ts`), `dispatch` (`src/dispatch.ts`), `buildNamespaces`, `Namespaces` (`src/namespaces.ts`), `HttpClient` (`src/request.ts`).
- Produces: `export interface LastFmApiOptions { httpClient?: HttpClient; }`, `export type LastFmApiReturn = Namespaces;`, `export function LastFmApi(options?: LastFmApiOptions): LastFmApiReturn`, `export default LastFmApi;`. This is the package's public entry point — Task 9 (`tests/api.spec.ts`) and any external consumer import from here.

- [ ] **Step 1: Write the failing test**

Create `tests/index.spec.ts`:

```typescript
import { expect, test } from '@playwright/test';
import { LastFmApi } from '../src/index.js';
import type { HttpClient } from '../src/request.js';

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json' },
  });
}

test.describe('LastFmApi', () => {
  test('dispatches album.getInfo through the injected http client', async () => {
    let capturedUrl: string | undefined;
    const httpClient: HttpClient = async input => {
      capturedUrl = input.toString();
      return jsonResponse({ album: { name: 'OK Computer' } });
    };

    const api = LastFmApi({ httpClient });
    const data = await api.album.getInfo({ artist: 'Radiohead', album: 'OK Computer' });

    expect(data.album.name).toBe('OK Computer');
    const url = new URL(capturedUrl!);
    expect(url.searchParams.get('method')).toBe('album.getInfo');
    expect(url.searchParams.get('artist')).toBe('Radiohead');
  });

  test('defaults to globalThis.fetch when no httpClient is provided', () => {
    const api = LastFmApi();
    expect(typeof api.album.getInfo).toBe('function');
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npx playwright test tests/index.spec.ts --reporter=list`
Expected: FAIL — `src/index.ts` does not export a named `LastFmApi`, and the old factory takes no `httpClient` option.

- [ ] **Step 3: Rewrite `src/index.ts`**

Replace the entire contents of `src/index.ts` with:

```typescript
import { loadConfig } from './config.js';
import { dispatch } from './dispatch.js';
import { buildNamespaces, type Namespaces } from './namespaces.js';
import type { HttpClient } from './request.js';

export interface LastFmApiOptions {
  httpClient?: HttpClient;
}

export type LastFmApiReturn = Namespaces;

/**
 * Creates a Last.fm API client with all supported methods organised by namespace.
 *
 * @example
 * ```ts
 * import LastFmApi from 'lastfm-nodejs-client';
 *
 * const api = LastFmApi();
 *
 * const topArtists = await api.user.getTopArtists({ user: 'username', period: '7day', limit: '10' });
 *
 * await api.track.scrobble({ artist: 'Artist', track: 'Track', timestamp: String(Math.floor(Date.now() / 1000)), album: 'Album', sk });
 * ```
 */
export function LastFmApi(options: LastFmApiOptions = {}): LastFmApiReturn {
  const config = loadConfig();
  const httpClient = options.httpClient ?? fetch;

  return buildNamespaces((methodName, params) => dispatch(methodName, params, config, httpClient));
}

export default LastFmApi;
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npx playwright test tests/index.spec.ts --reporter=list`
Expected: PASS (2 tests)

- [ ] **Step 5: Commit**

```bash
git add src/index.ts tests/index.spec.ts
git commit -m "feat: rewrite LastFmApi as a registry-driven factory with an httpClient option"
```

---

## Task 8: Delete the legacy method-wrapper layer

**Files:**
- Delete: `src/createOptions.ts`, `src/method.ts`, `src/auth.ts`
- Delete: `src/album/`, `src/artist/`, `src/auth/`, `src/chart/`, `src/geo/`, `src/library/`, `src/tag/`, `src/track/`, `src/user/` (directories)
- Delete: `src/getFriends.ts`, `src/getInfo.ts`, `src/getLovedTracks.ts`, `src/getRecentTracks.ts`, `src/getTopAlbums.ts`, `src/getTopArtists.ts`, `src/getTopTracks.ts`, `src/getUserTopTags.ts`, `src/getWeeklyAlbumChart.ts`, `src/getWeeklyArtistChart.ts`, `src/getWeeklyChartList.ts`, `src/getWeeklyTrackChart.ts`

**Interfaces:**
- Consumes: nothing (nothing in `src/index.ts`, `src/dispatch.ts`, `src/namespaces.ts`, `src/registry.ts`, `src/request.ts`, or `src/config.ts` references any of these files after Task 7).
- Produces: a fully-deleted legacy layer. This is the point where the whole package compiles cleanly again.

This is a pure deletion task — by the end of Task 7, nothing in the new module graph (`index.ts` → `dispatch.ts`/`namespaces.ts` → `registry.ts`/`request.ts`/`config.ts`) imports any of these files. They are dead code sitting on disk.

- [ ] **Step 1: Confirm nothing still imports the files about to be deleted**

Run: `grep -rl "createOptions\|from '\./method\.js'\|from '\./auth\.js'" src/index.ts src/dispatch.ts src/namespaces.ts src/registry.ts src/request.ts src/config.ts`
Expected: no output (no matches) — confirming the new module graph has zero references to the legacy layer.

- [ ] **Step 2: Delete the files and directories**

```bash
git rm -r src/createOptions.ts src/method.ts src/auth.ts \
  src/album src/artist src/auth src/chart src/geo src/library src/tag src/track src/user \
  src/getFriends.ts src/getInfo.ts src/getLovedTracks.ts src/getRecentTracks.ts \
  src/getTopAlbums.ts src/getTopArtists.ts src/getTopTracks.ts src/getUserTopTags.ts \
  src/getWeeklyAlbumChart.ts src/getWeeklyArtistChart.ts src/getWeeklyChartList.ts src/getWeeklyTrackChart.ts
```

- [ ] **Step 3: Verify the whole package compiles cleanly**

Run: `pnpm exec tsc --noEmit -p tsconfig.json`
Expected: no errors — this is the first point since Task 2 where the full project type-checks again.

- [ ] **Step 4: Run the full test suite**

Run: `pnpm test`
Expected: most tests PASS. `tests/api.spec.ts` will FAIL at this point (it still uses the old `lastFm.getTopArtists(method.user.getTopArtists, ...)` call shape and destructures `lastFm.config`/`lastFm.method`, both removed) — this is expected and fixed in Task 9. All other suites (`config`, `request`, `registry`, `dispatch`, `namespaces`, `index`, `env`) must PASS.

- [ ] **Step 5: Commit**

```bash
git commit -m "chore: delete the legacy per-method wrapper layer superseded by the registry"
```

---

## Task 9: Rewrite `tests/api.spec.ts` for the new call shape and namespace smoke coverage

**Files:**
- Modify: `tests/api.spec.ts`

**Interfaces:**
- Consumes: `LastFmApi` (`src/index.ts`), `loadConfig` (`src/config.ts`).
- Produces: nothing new — this is the top-level, live-network verification that every namespace works end-to-end.

This task adapts the 10 existing `user.*` tests and 3 existing `chart.*` tests to the new `api.<namespace>.<method>(namedParams)` shape (fixing the `chart.getTopArtists`/`chart.getTopTags`/`chart.getTopTracks` calls to use the corrected, bug-free field names), and adds one new smoke test each for `album`, `artist`, `auth`, `geo`, `library`, `tag`, and `track` — the seven namespaces that previously had zero test coverage of any kind.

- [ ] **Step 1: Replace the entire contents of `tests/api.spec.ts`**

```typescript
import { expect, test } from '@playwright/test';
import LastFmApi from '../src/index.js';
import { loadConfig } from '../src/config.js';

test.describe('Last.fm API Integration', () => {
  const api = LastFmApi();
  const username = loadConfig().username || 'rj';

  test.describe('user.getTopArtists', () => {
    test('returns valid artist data', async () => {
      const data = await api.user.getTopArtists({ user: username, period: 'overall', limit: '5' });

      expect(data.topartists).toBeDefined();
      expect(data.topartists['@attr'].user).toBe(username);
      expect(Array.isArray(data.topartists.artist)).toBeTruthy();
      expect(data.topartists.artist.length).toBeGreaterThan(0);

      const first = data.topartists.artist[0];
      if (first) {
        expect(first.name).toBeDefined();
        expect(first.url).toBeDefined();
        expect(first.playcount).toBeDefined();
        expect(first['@attr'].rank).toBeDefined();
      }
    });
  });

  test.describe('user.getTopTracks', () => {
    test('returns valid track data', async () => {
      const data = await api.user.getTopTracks({ user: username, period: 'overall', limit: '5' });

      expect(data.toptracks).toBeDefined();
      expect(data.toptracks['@attr'].user).toBe(username);
      expect(Array.isArray(data.toptracks.track)).toBeTruthy();
      expect(data.toptracks.track.length).toBeGreaterThan(0);

      const first = data.toptracks.track[0];
      if (first) {
        expect(first.name).toBeDefined();
        expect(first.url).toBeDefined();
        expect(first.playcount).toBeDefined();
        expect(first.artist.name).toBeDefined();
      }
    });
  });

  test.describe('user.getTopAlbums', () => {
    test('returns valid album data', async () => {
      const data = await api.user.getTopAlbums({ user: username, period: 'overall', limit: '5' });

      expect(data.topalbums).toBeDefined();
      expect(data.topalbums['@attr'].user).toBe(username);
      expect(Array.isArray(data.topalbums.album)).toBeTruthy();
      expect(data.topalbums.album.length).toBeGreaterThan(0);

      const first = data.topalbums.album[0];
      if (first) {
        expect(first.name).toBeDefined();
        expect(first.url).toBeDefined();
        expect(first.artist).toBeDefined();
      }
    });
  });

  test.describe('user.getRecentTracks', () => {
    test('returns valid track data', async () => {
      const data = await api.user.getRecentTracks({ user: username, limit: '5' });

      expect(data.recenttracks).toBeDefined();
      expect(data.recenttracks['@attr'].user).toBe(username);
      expect(Array.isArray(data.recenttracks.track)).toBeTruthy();
      expect(data.recenttracks.track.length).toBeGreaterThan(0);

      const first = data.recenttracks.track[0];
      if (first) {
        expect(first.name).toBeDefined();
        expect(first.url).toBeDefined();
        expect(first.artist).toBeDefined();
      }
    });
  });

  test.describe('user.getLovedTracks', () => {
    test('returns valid loved track data', async () => {
      const data = await api.user.getLovedTracks({ user: username, period: '', limit: '5' });

      expect(data.lovedtracks).toBeDefined();
      expect(Array.isArray(data.lovedtracks.track)).toBeTruthy();

      const first = data.lovedtracks.track[0];
      if (first) {
        expect(first.name).toBeDefined();
        expect(first.url).toBeDefined();
        expect(first.artist).toBeDefined();
      }
    });
  });

  test.describe('user.getInfo', () => {
    test('returns valid user profile data', async () => {
      const data = await api.user.getInfo({ user: username });

      expect(data.user).toBeDefined();
      expect(data.user.name).toBe(username);
      expect(data.user.url).toBeDefined();
      expect(data.user.playcount).toBeDefined();
      expect(data.user.registered).toBeDefined();
    });
  });

  test.describe('user.getWeeklyChartList', () => {
    test('returns valid weekly chart list', async () => {
      const data = await api.user.getWeeklyChartList({ user: username, period: '', limit: '' });

      expect(data.weeklychartlist).toBeDefined();
      expect(data.weeklychartlist['@attr'].user).toBe(username);
      expect(Array.isArray(data.weeklychartlist.chart)).toBeTruthy();
      expect(data.weeklychartlist.chart.length).toBeGreaterThan(0);

      const first = data.weeklychartlist.chart[0];
      if (first) {
        expect(first.from).toBeDefined();
        expect(first.to).toBeDefined();
      }
    });
  });

  test.describe('user.getWeeklyArtistChart', () => {
    test('returns valid weekly artist chart', async () => {
      const data = await api.user.getWeeklyArtistChart({ user: username, period: '', limit: '5' });

      expect(data.weeklyartistchart).toBeDefined();
      expect(Array.isArray(data.weeklyartistchart.artist)).toBeTruthy();
      expect(data.weeklyartistchart.artist.length).toBeGreaterThan(0);

      const first = data.weeklyartistchart.artist[0];
      if (first) {
        expect(first.name).toBeDefined();
        expect(first.url).toBeDefined();
      }
    });
  });

  test.describe('user.getWeeklyAlbumChart', () => {
    test('returns valid weekly album chart', async () => {
      const data = await api.user.getWeeklyAlbumChart({ user: username, period: '', limit: '5' });

      expect(data.weeklyalbumchart).toBeDefined();
      expect(Array.isArray(data.weeklyalbumchart.album)).toBeTruthy();
      expect(data.weeklyalbumchart.album.length).toBeGreaterThan(0);

      const first = data.weeklyalbumchart.album[0];
      if (first) {
        expect(first.name).toBeDefined();
        expect(first.url).toBeDefined();
        expect(first.artist).toBeDefined();
        expect(first.playcount).toBeDefined();
      }
    });
  });

  test.describe('user.getWeeklyTrackChart', () => {
    test('returns valid weekly track chart', async () => {
      const data = await api.user.getWeeklyTrackChart({ user: username, period: '', limit: '5' });

      expect(data.weeklytrackchart).toBeDefined();
      expect(Array.isArray(data.weeklytrackchart.track)).toBeTruthy();
      expect(data.weeklytrackchart.track.length).toBeGreaterThan(0);

      const first = data.weeklytrackchart.track[0];
      if (first) {
        expect(first.name).toBeDefined();
        expect(first.url).toBeDefined();
        expect(first.artist).toBeDefined();
      }
    });
  });

  test.describe('chart.getTopArtists', () => {
    test('returns valid global top artists', async () => {
      const data = await api.chart.getTopArtists({ user: '', period: '', limit: '5', page: '1' });

      expect(data.artists).toBeDefined();
      expect(Array.isArray(data.artists.artist)).toBeTruthy();
      expect(data.artists.artist.length).toBeGreaterThan(0);

      const first = data.artists.artist[0];
      if (first) {
        expect(first.name).toBeDefined();
        expect(first.url).toBeDefined();
      }
    });
  });

  test.describe('chart.getTopTracks', () => {
    test('returns valid global top tracks', async () => {
      const data = await api.chart.getTopTracks({ page: '1' });

      expect(data.tracks).toBeDefined();
      expect(Array.isArray(data.tracks.track)).toBeTruthy();
      expect(data.tracks.track.length).toBeGreaterThan(0);

      const first = data.tracks.track[0];
      if (first) {
        expect(first.name).toBeDefined();
        expect(first.url).toBeDefined();
        expect(first.artist).toBeDefined();
      }
    });
  });

  test.describe('chart.getTopTags', () => {
    test('returns valid global top tags', async () => {
      const data = await api.chart.getTopTags({ page: '1' });

      expect(data.tags).toBeDefined();
      expect(Array.isArray(data.tags.tag)).toBeTruthy();
      expect(data.tags.tag.length).toBeGreaterThan(0);

      const first = data.tags.tag[0];
      if (first) {
        expect(first.name).toBeDefined();
        expect(first.url).toBeDefined();
      }
    });
  });

  test.describe('album.getInfo', () => {
    test('returns valid album data', async () => {
      const data = await api.album.getInfo({ artist: 'Radiohead', album: 'OK Computer' });

      expect(data.album).toBeDefined();
      expect(data.album.name).toBeDefined();
      expect(data.album.artist).toBeDefined();
    });
  });

  test.describe('artist.getInfo', () => {
    test('returns valid artist data', async () => {
      const data = await api.artist.getInfo({ artist: 'Radiohead' });

      expect(data.artist).toBeDefined();
      expect(data.artist.name).toBeDefined();
      expect(data.artist.stats).toBeDefined();
    });
  });

  test.describe('auth.getToken', () => {
    test('returns a token', async () => {
      const data = await api.auth.getToken({ user: username, period: 'overall', limit: '5' });

      expect(data.token).toBeDefined();
      expect(typeof data.token).toBe('string');
    });
  });

  test.describe('geo.getTopArtists', () => {
    test('returns valid country chart data', async () => {
      const data = await api.geo.getTopArtists({ country: 'United Kingdom', limit: '5' });

      expect(data.topartists).toBeDefined();
      expect(Array.isArray(data.topartists.artist)).toBeTruthy();
      expect(data.topartists.artist.length).toBeGreaterThan(0);
    });
  });

  test.describe('library.getArtists', () => {
    test('returns a library artist list', async () => {
      const data = await api.library.getArtists({ user: username, limit: '5' });

      expect(data.artists).toBeDefined();
      expect(Array.isArray(data.artists.artist)).toBeTruthy();
    });
  });

  test.describe('tag.getInfo', () => {
    test('returns valid tag data', async () => {
      const data = await api.tag.getInfo({ tag: 'rock' });

      expect(data.tag).toBeDefined();
      expect(data.tag.name).toBeDefined();
    });
  });

  test.describe('track.getInfo', () => {
    test('returns valid track data', async () => {
      const data = await api.track.getInfo({ artist: 'Radiohead', track: 'Karma Police' });

      expect(data.track).toBeDefined();
      expect(data.track.name).toBeDefined();
      expect(data.track.artist).toBeDefined();
    });
  });
});
```

- [ ] **Step 2: Run the full test suite**

Run: `pnpm test`
Expected: PASS (all suites, including the 20 tests in `tests/api.spec.ts`, given valid Last.fm credentials in `.env`).

- [ ] **Step 3: Commit**

```bash
git add tests/api.spec.ts
git commit -m "test: adapt live integration tests to the new namespaced call shape and add smoke coverage for every namespace"
```

---

## Task 10: Update docs and ship 2.0.0

**Files:**
- Modify: `package.json`
- Modify: `README.md`
- Modify: `CHANGELOG.md`

**Interfaces:**
- Consumes: nothing new.
- Produces: a `2.0.0` release with docs matching the new API.

- [ ] **Step 1: Bump the version**

In `package.json`, change:

```json
  "version": "1.7.0",
```

to:

```json
  "version": "2.0.0",
```

- [ ] **Step 2: Add a `CHANGELOG.md` entry**

At the top of `CHANGELOG.md` (matching the existing `## X.Y.Z - date` + `type: description` format used by prior entries), add:

```markdown
## 2.0.0 - 2026-09-21
breaking: replace the 57 per-method wrapper files and positional `createOptions()` with a single data-driven registry (`api.<namespace>.<method>(namedParams)`) — the `method` constant and positional arguments are gone; every call now takes one named-params object
breaking: `LastFmApi()` no longer exposes `config` or `method` on its return value
breaking: `auth.getSession`/`auth.getMobileSession` move under `api.auth.*` (previously `api.authGetSession`/`api.authGetMobileSession`); all legacy flat `get*` methods move under `api.user.*`
fix: `chart.getTopArtists` no longer swaps `page` and `limit`
fix: `chart.getTopTags`/`chart.getTopTracks` send `page` correctly instead of misrouting it as `user`
fix: `user.getPersonalTags` now sends `taggingtype` (previously silently dropped)
fix: `request()`/`signedRequest()` accept an injected `httpClient` (`LastFmApi({ httpClient })`) instead of always calling `fetch` directly
fix: removed duplicate/conflicting type declarations in `lastfm.types.ts` (`AttrLimit` was declaration-merged from two conflicting shapes)
```

- [ ] **Step 3: Rewrite the README's usage section**

In `README.md`, find the "Usage" section's code example (using the old `lastFm.getTopArtists(method.user.getTopArtists, ...)` shape) and replace it with:

```markdown
## Usage

\`\`\`ts
import LastFmApi from 'lastfm-nodejs-client';

const api = LastFmApi();

const topArtists = await api.user.getTopArtists({ user: 'username', period: '7day', limit: '10' });

await api.track.scrobble({
  artist: 'Artist',
  track: 'Track',
  timestamp: String(Math.floor(Date.now() / 1000)),
  album: 'Album',
  sk,
});
\`\`\`

Every method takes a single named-params object — no more positional arguments or a separate `method` constant. Required fields are enforced at the type level and at runtime; optional fields fall back to Last.fm's documented defaults.

To use a fake HTTP client in tests, pass `httpClient`:

\`\`\`ts
const api = LastFmApi({ httpClient: myFakeFetch });
\`\`\`
```

Find the "All available namespaces" table (or equivalent section listing methods under the old `albumGetInfo`/`authGetSession`/flat-`get*` naming) and rewrite it to list methods under their normalized namespace (`album.getInfo`, `auth.getSession`, `auth.getMobileSession`, `auth.getToken`, `user.getTopArtists`, etc.) — one row per namespace listing its method names, matching the registry key list added in Task 4 (`album`: addTags, getInfo, getTags, getTopTags, removeTag, search; `artist`: addTags, getCorrection, getInfo, getSimilar, getTags, getTopAlbums, getTopTags, getTopTracks, removeTag, search; `auth`: getMobileSession, getSession, getToken; `chart`: getTopArtists, getTopTags, getTopTracks; `geo`: getTopArtists, getTopTracks; `library`: getArtists; `tag`: getInfo, getSimilar, getTopAlbums, getTopArtists, getTopTags, getTopTracks, getWeeklyChartList; `track`: addTags, getCorrection, getInfo, getSimilar, getTags, getTopTags, love, removeTag, scrobble, search, unlove, updateNowPlaying; `user`: getFriends, getInfo, getLovedTracks, getPersonalTags, getRecentTracks, getTopAlbums, getTopArtists, getTopTags, getTopTracks, getWeeklyAlbumChart, getWeeklyArtistChart, getWeeklyChartList, getWeeklyTrackChart).

- [ ] **Step 4: Final full verification**

Run: `pnpm test`
Expected: PASS (all suites)

Run: `pnpm lint`
Expected: no errors

Run: `pnpm build`
Expected: builds `dist/` and `dist/cjs/` with no errors

- [ ] **Step 5: Commit**

```bash
git add package.json README.md CHANGELOG.md
git commit -m "chore: release 2.0.0 - registry-driven API with injected HTTP seam"
```

---

## Self-Review

**Spec coverage:**
- Candidate 1 (collapse 57 wrapper files + `createOptions.ts` into one deep registry module) → Tasks 4, 5, 6, 7, 8. ✅
- Candidate 5 (real injected HTTP seam replacing the `global.fetch` monkeypatch) → Task 3 (`HttpClient` type + injection), Task 7 (`LastFmApiOptions.httpClient`), all new tests use the injected fake. ✅
- 4 confirmed bugs (chart page/limit swap, chart page→user misroute ×2, dropped `taggingtype`) → fixed in the registry (Task 4) and regression-tested in Task 5 and Task 9. ✅
- `lastfm.types.ts` duplicate/conflicting types → Task 1. ✅
- Full namespace normalization (auth split, flat legacy methods) → Task 6/7 (registry keys are the single source of the namespace shape) and Task 9/10 (README/tests reflect it). ✅
- Config eager/lazy/optional validation → Task 2 (`loadConfig`) and Task 3 (`signedRequest`'s lazy shared-secret check). ✅
- Test strategy (engine suite + one smoke test per namespace, not one test per method) → Tasks 3, 5 (engine suites), Task 9 (9 namespace smoke tests total, 7 of them new). ✅
- 2.0.0 breaking release, README/CHANGELOG → Task 10. ✅

**Placeholder scan:** No "TBD"/"add error handling"/"similar to Task N" phrases anywhere above; every step has complete, runnable code, including the full 57-entry registry.

**Type consistency:** `HttpClient`, `Params`, `Config`, `MethodName`, `ParamsFor<M>`, `ResponseFor<M>`, `dispatch()`, `buildNamespaces()`, `Namespaces`, `Dispatcher`, `LastFmApiOptions`, `LastFmApiReturn` are each defined exactly once (Tasks 2–7) and referenced with identical names and signatures in every later task and test file. The registry pattern (`defineMethod({...})<ResponseType>()`, `RequiredKeys`/`OptionalKeys`/`ParamsFromFields`, the `NamespaceOf`/`MethodsInNamespace` grouped-mapped-type idiom) was validated end-to-end — compile-checked under the project's exact `strict`+`noUncheckedIndexedAccess` settings against real `@types/node`, and runtime-verified (defaults apply, missing-required-field throws with the exact message format used in the tests above) — in an isolated scratch project before being written into this plan.

---

**Plan complete and saved to `docs/superpowers/plans/2026-09-21-request-builder-and-http-seam.md`. Two execution options:**

**1. Subagent-Driven (recommended)** - I dispatch a fresh subagent per task, review between tasks, fast iteration

**2. Inline Execution** - Execute tasks in this session using executing-plans, batch execution with checkpoints

**Which approach?**
