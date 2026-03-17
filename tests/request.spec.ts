import { expect, test } from '@playwright/test';
import LastFmApi from '../src/index.js';

const mockFetch = (body: unknown, status = 200) => {
  global.fetch = async () =>
    new Response(JSON.stringify(body), {
      status,
      headers: { 'content-type': 'application/json' },
    });
};

test.describe('Request error handling', () => {
  const lastFm = LastFmApi();
  const { method } = lastFm;
  const username = 'rj';
  let originalFetch: typeof global.fetch;

  test.beforeEach(() => {
    originalFetch = global.fetch;
  });

  test.afterEach(() => {
    global.fetch = originalFetch;
  });

  test('throws on HTTP 401', async () => {
    mockFetch(null, 401);
    await expect(
      lastFm.getTopArtists(method.user.getTopArtists, username, 'overall', '1'),
    ).rejects.toThrow('HTTP 401');
  });

  test('throws on HTTP 500', async () => {
    mockFetch(null, 500);
    await expect(
      lastFm.getTopArtists(method.user.getTopArtists, username, 'overall', '1'),
    ).rejects.toThrow('HTTP 500');
  });

  test('throws on LastFM error 10 - Invalid API key', async () => {
    mockFetch({ error: 10, message: 'Invalid API key' });
    await expect(
      lastFm.getTopArtists(method.user.getTopArtists, username, 'overall', '1'),
    ).rejects.toThrow('LastFM error 10: Invalid API key');
  });

  test('throws on LastFM error 6 - Invalid parameters', async () => {
    mockFetch({ error: 6, message: 'Invalid parameters' });
    await expect(
      lastFm.getTopArtists(method.user.getTopArtists, username, 'overall', '1'),
    ).rejects.toThrow('LastFM error 6: Invalid parameters');
  });

  test('throws on LastFM error 29 - Rate limit exceeded', async () => {
    mockFetch({ error: 29, message: 'Rate limit exceeded' });
    await expect(
      lastFm.getTopArtists(method.user.getTopArtists, username, 'overall', '1'),
    ).rejects.toThrow('LastFM error 29: Rate limit exceeded');
  });

  test('throws on LastFM error 26 - Suspended API key', async () => {
    mockFetch({ error: 26, message: 'Suspended API key' });
    await expect(
      lastFm.getTopArtists(method.user.getTopArtists, username, 'overall', '1'),
    ).rejects.toThrow('LastFM error 26: Suspended API key');
  });

  test('propagates network errors', async () => {
    global.fetch = async () => {
      throw new Error('Network failure');
    };
    await expect(
      lastFm.getTopArtists(method.user.getTopArtists, username, 'overall', '1'),
    ).rejects.toThrow('Network failure');
  });
});
