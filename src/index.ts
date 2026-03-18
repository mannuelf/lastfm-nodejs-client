import { auth } from './auth.js';
import { config } from './config.js';
import { getFriends } from './getFriends.js';
import { getInfo } from './getInfo.js';
import { getLovedTracks } from './getLovedTracks.js';
import { getRecentTracks } from './getRecentTracks.js';
import { getTopAlbums } from './getTopAlbums.js';
import { getTopArtists } from './getTopArtists.js';
import { getUserTopTags } from './getUserTopTags.js';
import { getTopTracks } from './getTopTracks.js';
import { getWeeklyAlbumChart } from './getWeeklyAlbumChart.js';
import { getWeeklyArtistChart } from './getWeeklyArtistChart.js';
import { getWeeklyChartList } from './getWeeklyChartList.js';
import { getWeeklyTrackChart } from './getWeeklyTrackChart.js';
import { method } from './method.js';
import { chartTopTags } from './chart/topTags.js';
import { chartTopTracks } from './chart/topTracks.js';
import { chartTopArtists } from './chart/topArtists.js';
import { tagTopTracks } from './tag/topTracks.js';

// Album
import { albumGetInfo } from './album/getInfo.js';
import { albumGetTags } from './album/getTags.js';
import { albumGetTopTags } from './album/getTopTags.js';
import { albumSearch } from './album/search.js';
import { albumAddTags } from './album/addTags.js';
import { albumRemoveTag } from './album/removeTag.js';

// Artist
import { artistGetCorrection } from './artist/getCorrection.js';
import { artistGetInfo } from './artist/getInfo.js';
import { artistGetSimilar } from './artist/getSimilar.js';
import { artistGetTags } from './artist/getTags.js';
import { artistGetTopAlbums } from './artist/getTopAlbums.js';
import { artistGetTopTags } from './artist/getTopTags.js';
import { artistGetTopTracks } from './artist/getTopTracks.js';
import { artistSearch } from './artist/search.js';
import { artistAddTags } from './artist/addTags.js';
import { artistRemoveTag } from './artist/removeTag.js';

// Auth
import { authGetMobileSession } from './auth/getMobileSession.js';
import { authGetSession } from './auth/getSession.js';

// Geo
import { geoGetTopArtists } from './geo/getTopArtists.js';
import { geoGetTopTracks } from './geo/getTopTracks.js';

// Library
import { libraryGetArtists } from './library/getArtists.js';

// Tag
import { tagGetInfo } from './tag/getInfo.js';
import { tagGetSimilar } from './tag/getSimilar.js';
import { tagGetTopAlbums } from './tag/getTopAlbums.js';
import { tagGetTopArtists } from './tag/getTopArtists.js';
import { tagGetTopTags } from './tag/getTopTags.js';
import { tagGetWeeklyChartList } from './tag/getWeeklyChartList.js';

// Track
import { trackGetCorrection } from './track/getCorrection.js';
import { trackGetInfo } from './track/getInfo.js';
import { trackGetSimilar } from './track/getSimilar.js';
import { trackGetTags } from './track/getTags.js';
import { trackGetTopTags } from './track/getTopTags.js';
import { trackSearch } from './track/search.js';
import { trackLove } from './track/love.js';
import { trackUnlove } from './track/unlove.js';
import { trackAddTags } from './track/addTags.js';
import { trackRemoveTag } from './track/removeTag.js';
import { trackScrobble } from './track/scrobble.js';
import { trackUpdateNowPlaying } from './track/updateNowPlaying.js';

// User
import { userGetPersonalTags } from './user/getPersonalTags.js';

export type LastFmApiReturn = {
  auth: typeof auth;
  album: {
    albumGetInfo: typeof albumGetInfo;
    albumGetTags: typeof albumGetTags;
    albumGetTopTags: typeof albumGetTopTags;
    albumSearch: typeof albumSearch;
    albumAddTags: typeof albumAddTags;
    albumRemoveTag: typeof albumRemoveTag;
  };
  artist: {
    artistGetCorrection: typeof artistGetCorrection;
    artistGetInfo: typeof artistGetInfo;
    artistGetSimilar: typeof artistGetSimilar;
    artistGetTags: typeof artistGetTags;
    artistGetTopAlbums: typeof artistGetTopAlbums;
    artistGetTopTags: typeof artistGetTopTags;
    artistGetTopTracks: typeof artistGetTopTracks;
    artistSearch: typeof artistSearch;
    artistAddTags: typeof artistAddTags;
    artistRemoveTag: typeof artistRemoveTag;
  };
  authGetMobileSession: typeof authGetMobileSession;
  authGetSession: typeof authGetSession;
  chart: {
    chartTopArtists: typeof chartTopArtists;
    chartTopTracks: typeof chartTopTracks;
    chartTopTags: typeof chartTopTags;
  };
  geo: {
    geoGetTopArtists: typeof geoGetTopArtists;
    geoGetTopTracks: typeof geoGetTopTracks;
  };
  library: {
    libraryGetArtists: typeof libraryGetArtists;
  };
  tag: {
    tagTopTracks: typeof tagTopTracks;
    tagGetInfo: typeof tagGetInfo;
    tagGetSimilar: typeof tagGetSimilar;
    tagGetTopAlbums: typeof tagGetTopAlbums;
    tagGetTopArtists: typeof tagGetTopArtists;
    tagGetTopTags: typeof tagGetTopTags;
    tagGetWeeklyChartList: typeof tagGetWeeklyChartList;
  };
  track: {
    trackGetCorrection: typeof trackGetCorrection;
    trackGetInfo: typeof trackGetInfo;
    trackGetSimilar: typeof trackGetSimilar;
    trackGetTags: typeof trackGetTags;
    trackGetTopTags: typeof trackGetTopTags;
    trackSearch: typeof trackSearch;
    trackLove: typeof trackLove;
    trackUnlove: typeof trackUnlove;
    trackAddTags: typeof trackAddTags;
    trackRemoveTag: typeof trackRemoveTag;
    trackScrobble: typeof trackScrobble;
    trackUpdateNowPlaying: typeof trackUpdateNowPlaying;
  };
  user: {
    userGetPersonalTags: typeof userGetPersonalTags;
  };
  config: typeof config;
  getFriends: typeof getFriends;
  getInfo: typeof getInfo;
  getLovedTracks: typeof getLovedTracks;
  getRecentTracks: typeof getRecentTracks;
  getTopAlbums: typeof getTopAlbums;
  getTopArtists: typeof getTopArtists;
  getUserTopTags: typeof getUserTopTags;
  getTopTracks: typeof getTopTracks;
  getWeeklyAlbumChart: typeof getWeeklyAlbumChart;
  getWeeklyArtistChart: typeof getWeeklyArtistChart;
  getWeeklyChartList: typeof getWeeklyChartList;
  getWeeklyTrackChart: typeof getWeeklyTrackChart;
  method: typeof method;
};

const LastFmApi = (): LastFmApiReturn => {
  return {
    auth,
    album: {
      albumGetInfo,
      albumGetTags,
      albumGetTopTags,
      albumSearch,
      albumAddTags,
      albumRemoveTag,
    },
    artist: {
      artistGetCorrection,
      artistGetInfo,
      artistGetSimilar,
      artistGetTags,
      artistGetTopAlbums,
      artistGetTopTags,
      artistGetTopTracks,
      artistSearch,
      artistAddTags,
      artistRemoveTag,
    },
    authGetMobileSession,
    authGetSession,
    chart: {
      chartTopArtists,
      chartTopTracks,
      chartTopTags,
    },
    geo: {
      geoGetTopArtists,
      geoGetTopTracks,
    },
    library: {
      libraryGetArtists,
    },
    tag: {
      tagTopTracks,
      tagGetInfo,
      tagGetSimilar,
      tagGetTopAlbums,
      tagGetTopArtists,
      tagGetTopTags,
      tagGetWeeklyChartList,
    },
    track: {
      trackGetCorrection,
      trackGetInfo,
      trackGetSimilar,
      trackGetTags,
      trackGetTopTags,
      trackSearch,
      trackLove,
      trackUnlove,
      trackAddTags,
      trackRemoveTag,
      trackScrobble,
      trackUpdateNowPlaying,
    },
    user: {
      userGetPersonalTags,
    },
    config,
    getFriends,
    getInfo,
    getLovedTracks,
    getRecentTracks,
    getTopAlbums,
    getTopArtists,
    getUserTopTags,
    getTopTracks,
    getWeeklyAlbumChart,
    getWeeklyArtistChart,
    getWeeklyChartList,
    getWeeklyTrackChart,
    method,
  };
};

export default LastFmApi;
