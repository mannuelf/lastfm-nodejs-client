import { auth } from './auth.js';
import { config } from './config.js';
import { getInfo } from './getInfo.js';
import { getLovedTracks } from './getLovedTracks.js';
import { getRecentTracks } from './getRecentTracks.js';
import { getTopAlbums } from './getTopAlbums.js';
import { getTopArtists } from './getTopArtists.js';
import { getTopTracks } from './getTopTracks.js';
import { getWeeklyAlbumChart } from './getWeeklyAlbumChart.js';
import { getWeeklyArtistChart } from './getWeeklyArtistChart.js';
import { getWeeklyChartList } from './getWeeklyChartList.js';
import { getWeeklyTrackChart } from './getWeeklyTrackChart.js';
import { method } from './method.js';
import { chartTopTags } from './chart/topTags.js';
import { chartTopTracks } from './chart/topTracks.js';
import { chartTopArtists } from './chart/topArtists.js';

const LastFmApi = () => {
  return {
    auth,
    chart: {
      chartTopArtists,
      chartTopTracks,
      chartTopTags,
    },
    config,
    getInfo,
    getLovedTracks,
    getRecentTracks,
    getTopAlbums,
    getTopArtists,
    getTopTracks,
    getWeeklyAlbumChart,
    getWeeklyArtistChart,
    getWeeklyChartList,
    getWeeklyTrackChart,
    method,
  };
};

export default LastFmApi;
