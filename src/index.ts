import {
  AUTH_URL,
  LOVED_TRACKS_URL,
  RECENT_TRACKS_URL,
  TOP_ALBUMS_URL,
  TOP_ARTIST_URL,
  TOP_TRACKS,
  USER_URL,
  WEEKLY_ALBUM_CHART_URL,
  WEEKLY_ARTIST_CHART_URL,
  WEEKLY_CHART_LIST_URL,
  WEEKLY_TRACK_CHART_URL,
} from './config';
import fetchData from './fetchData';
import {
  AuthResponse,
  LovedTracksResponse,
  RecentTracksResponse,
  TopAlbumsResponse,
  TopArtistsResponse,
  TopTrackResponse,
  UserResponse,
  WeeklyAlbumChartResponse,
  WeeklyArtistChartResponse,
  WeeklyChartListResponse,
  WeeklyTrackChartResponse,
} from './lastFm.types';

const LastFmApi = function LastFmApi() {
  /**
   * POST: Auth - LastFM
   *
   * https://www.last.fm/api/show/auth.getToken
   *
   * Authentication tokens are API account specific.
   * They are valid for 60 minutes from the moment they are granted.
   * Can only used once (they are consumed when a session is created).
   * @returns Auth token
   */
  const auth = (): Promise<AuthResponse> => {
    return fetchData(`${AUTH_URL}`);
  };

  /**
   * GET: User profile information - LastFM
   *
   * https://www.last.fm/api/show/user.getInfo
   * @returns User profile data
   */
  const getInfo = (): Promise<UserResponse> => {
    return fetchData(`${USER_URL}`);
  };

  /**
   * GET: Love Tracks - LastFM
   *
   * https://www.last.fm/api/show/user.getLovedTracks
   * @returns Loved Tracks
   */
  const getLovedTracks = (): Promise<LovedTracksResponse> => {
    return fetchData(`${LOVED_TRACKS_URL}`);
  };

  /**
   * GET: Recent Tracks - LastFM
   *
   * https://www.last.fm/api/show/user.getRecentTracks
   * @returns Recent Tracks
   */
  const getRecentTracks = (): Promise<RecentTracksResponse> => {
    return fetchData(`${RECENT_TRACKS_URL}`);
  };

  /**
   * GET: Top Albums - LastFM
   *
   * https://www.last.fm/api/show/user.getTopAlbums
   * @returns Top Albums
   */
  const getTopAlbums = (): Promise<TopAlbumsResponse> => {
    return fetchData(`${TOP_ALBUMS_URL}`);
  };

  /**
   * GET: Top Artist - LastFM
   *
   * https://www.last.fm/api/show/user.getTopArtists
   * @returns Top Artists
   */
  const getTopArtists = (): Promise<TopArtistsResponse> => {
    return fetchData(`${TOP_ARTIST_URL}`);
  };

  /**
   * GET: Top Tracks - LastFM
   *
   * https://www.last.fm/api/show/user.getTopTracks
   * @returns Top Tracks
   */
  const getTopTracks = (): Promise<TopTrackResponse> => {
    return fetchData(`${TOP_TRACKS}`);
  };

  /**
   * GET: Weekly album chart - LastFM
   *
   * https://www.last.fm/api/show/user.getWeeklyAlbumChart
   * @returns Weekly album chart
   */
  const getWeeklyAlbumChart = (): Promise<WeeklyAlbumChartResponse> => {
    return fetchData(`${WEEKLY_ALBUM_CHART_URL}`);
  };

  /**
   * GET: Weekly artist chart - LastFM
   *
   * https://www.last.fm/api/show/user.getWeeklyArtistChart
   * @returns Weekly artist chart
   */
  const getWeeklyArtistChart = (): Promise<WeeklyArtistChartResponse> => {
    return fetchData(`${WEEKLY_ARTIST_CHART_URL}`);
  };

  /**
   * GET: Weekly chart list - LastFM
   *
   * https://www.last.fm/api/show/user.getWeeklyChartList
   * @returns Weekly chart list
   */
  const getWeeklyChartList = (): Promise<WeeklyChartListResponse> => {
    return fetchData(`${WEEKLY_CHART_LIST_URL}`);
  };

  /**
   * GET: Weekly track chart - LastFM
   *
   * https://www.last.fm/api/show/user.getWeeklyTrackChart
   * @returns Weekly track chart
   */
  const getWeeklyTrackChart = (): Promise<WeeklyTrackChartResponse> => {
    return fetchData(`${WEEKLY_TRACK_CHART_URL}`);
  };

  return {
    auth,
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
  };
};

export default LastFmApi;
