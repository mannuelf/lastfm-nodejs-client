import { expect, test } from '@playwright/test';
import LastFmApi from '../src/index.js';

test.describe('Last.fm API Integration', () => {
  const lastFm = LastFmApi();
  const { config, method } = lastFm;

  test('getTopArtists fetches and returns valid artist data', async () => {
    // Note: We use the username configured in .env (or a fallback like 'rj' which is the founder's username)
    const username = config.username || 'rj';

    const data = await lastFm.getTopArtists(
      method.user.getTopArtists,
      username,
      'overall',
      '5', // limit to 5 for faster tests
    );

    // Verify root object
    expect(data.topartists).toBeDefined();

    // Verify attributes
    expect(data.topartists['@attr']).toBeDefined();
    expect(data.topartists['@attr'].user).toBe(username);

    // Verify artists array
    expect(Array.isArray(data.topartists.artist)).toBeTruthy();
    expect(data.topartists.artist.length).toBeGreaterThan(0);

    // Verify first artist shape
    const firstArtist = data.topartists.artist[0];
    if (firstArtist) {
      expect(firstArtist.name).toBeDefined();
      expect(firstArtist.url).toBeDefined();
      expect(firstArtist.playcount).toBeDefined();
      expect(firstArtist['@attr'].rank).toBeDefined();
    }
  });

  test('getTopTracks fetches and returns valid track data', async () => {
    const username = config.username || 'rj';

    const data = await lastFm.getTopTracks(method.user.getTopTracks, username, 'overall', '5');

    // Verify root object
    expect(data.toptracks).toBeDefined();

    // Verify attributes
    expect(data.toptracks['@attr']).toBeDefined();
    expect(data.toptracks['@attr'].user).toBe(username);

    // Verify tracks array
    expect(Array.isArray(data.toptracks.track)).toBeTruthy();
    expect(data.toptracks.track.length).toBeGreaterThan(0);

    // Verify first track shape
    const firstTrack = data.toptracks.track[0];
    if (firstTrack) {
      expect(firstTrack.name).toBeDefined();
      expect(firstTrack.url).toBeDefined();
      expect(firstTrack.playcount).toBeDefined();
      expect(firstTrack.artist).toBeDefined();
      expect(firstTrack.artist.name).toBeDefined();
    }
  });

  test('getRecentTracks fetches and returns valid track data', async () => {
    const username = config.username || 'rj';

    const data = await lastFm.getRecentTracks(method.user.getRecentTracks, username, '', '5');

    // Verify root object
    expect(data.recenttracks).toBeDefined();

    // Verify attributes
    expect(data.recenttracks['@attr']).toBeDefined();
    expect(data.recenttracks['@attr'].user).toBe(username);

    // Verify tracks array
    expect(Array.isArray(data.recenttracks.track)).toBeTruthy();
    expect(data.recenttracks.track.length).toBeGreaterThan(0);

    // Verify first track shape
    const firstTrack = data.recenttracks.track[0];
    if (firstTrack) {
      expect(firstTrack.name).toBeDefined();
      expect(firstTrack.url).toBeDefined();
      expect(firstTrack.artist).toBeDefined();
    }
  });
});
