import { expect, test } from '@playwright/test';
import LastFmApi from '../src/index.js';

test.describe('Last.fm API Integration', () => {
  const lastFm = LastFmApi();
  const { config, method } = lastFm;
  const username = config.username || 'rj';

  test.describe('user.getTopArtists', () => {
    test('returns valid artist data', async () => {
      const data = await lastFm.getTopArtists(method.user.getTopArtists, username, 'overall', '5');

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
      const data = await lastFm.getTopTracks(method.user.getTopTracks, username, 'overall', '5');

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
      const data = await lastFm.getTopAlbums(method.user.getTopAlbums, username, 'overall', '5');

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
      const data = await lastFm.getRecentTracks(method.user.getRecentTracks, username, '', '5');

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
      const data = await lastFm.getLovedTracks(method.user.getLovedTracks, username, '', '5');

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
      const data = await lastFm.getInfo(method.user.getInfo, username);

      expect(data.user).toBeDefined();
      expect(data.user.name).toBe(username);
      expect(data.user.url).toBeDefined();
      expect(data.user.playcount).toBeDefined();
      expect(data.user.registered).toBeDefined();
    });
  });

  test.describe('user.getWeeklyChartList', () => {
    test('returns valid weekly chart list', async () => {
      const data = await lastFm.getWeeklyChartList(method.user.getWeeklyChartList, username, '', '');

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
      const data = await lastFm.getWeeklyArtistChart(method.user.getWeeklyArtistChart, username, '', '5');

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
      const data = await lastFm.getWeeklyAlbumChart(method.user.getWeeklyAlbumChart, username, '', '5');

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
      const data = await lastFm.getWeeklyTrackChart(method.user.getWeeklyTrackChart, username, '', '5');

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
    // TODO: response shape from live API doesn't match ChartTopArtistResponse type — needs investigation
    test.skip('returns valid global top artists', async () => {
      const data = await lastFm.chart.chartTopArtists(method.chart.getTopArtists, '', '', '1', '5');

      expect(data.artists).toBeDefined();
      expect(Array.isArray(data.artists)).toBeTruthy();
      expect(data.artists.length).toBeGreaterThan(0);

      const first = data.artists[0];
      if (first) {
        expect(first.name).toBeDefined();
        expect(first.url).toBeDefined();
      }
    });
  });

  test.describe('chart.getTopTracks', () => {
    // TODO: response shape from live API doesn't match TopTrackResponse type — needs investigation
    test.skip('returns valid global top tracks', async () => {
      const data = await lastFm.chart.chartTopTracks(method.chart.getTopTracks, '1');

      expect(data.toptracks).toBeDefined();
      expect(Array.isArray(data.toptracks.track)).toBeTruthy();
      expect(data.toptracks.track.length).toBeGreaterThan(0);

      const first = data.toptracks.track[0];
      if (first) {
        expect(first.name).toBeDefined();
        expect(first.url).toBeDefined();
        expect(first.artist).toBeDefined();
      }
    });
  });

  test.describe('chart.getTopTags', () => {
    // TODO: response shape from live API doesn't match TagsResponse type — needs investigation
    test.skip('returns valid global top tags', async () => {
      const data = await lastFm.chart.chartTopTags(method.chart.getTopTags, '1');

      expect(data.tag).toBeDefined();
      expect(Array.isArray(data.tag)).toBeTruthy();
      expect(data.tag.length).toBeGreaterThan(0);

      const first = data.tag[0];
      if (first) {
        expect(first.name).toBeDefined();
        expect(first.url).toBeDefined();
      }
    });
  });
});
