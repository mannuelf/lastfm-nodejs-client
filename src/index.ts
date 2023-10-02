import { auth } from './auth';
import { config } from './config';
import { getInfo } from './getInfo';
import { getLovedTracks } from './getLovedTracks';
import { getRecentTracks } from './getRecentTracks';
import { getTopAlbums } from './getTopAlbums';
import { getTopArtists } from './getTopArtists';
import { getTopTracks } from './getTopTracks';
import { getWeeklyAlbumChart } from './getWeeklyAlbumChart';
import { getWeeklyArtistChart } from './getWeeklyArtistChart';
import { getWeeklyChartList } from './getWeeklyChartList';
import { getWeeklyTrackChart } from './getWeeklyTrackChart';
import { method } from './method';
import { chartTopTags } from './chart/topTags';
import { chartTopTracks } from './chart/topTracks';
import { chartTopArtists } from './chart/topArtists';

export default function LastFmApi() {
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
}
