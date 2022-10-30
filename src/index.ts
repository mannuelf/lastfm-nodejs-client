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
import request from './request';

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
  const auth = (
    method: string,
    user: string,
    period: string,
    limit: number
  ): Promise<AuthResponse> => {
    return request(method, user, period, limit);
  };

  /**
   * GET: User profile information - LastFM
   *
   * https://www.last.fm/api/show/user.getInfo
   * @returns User profile data
   */
  const getInfo = (
    method: string,
    user: string,
    period: string,
    limit: number
  ): Promise<UserResponse> => {
    return request(method, user, period, limit);
  };

  /**
   * GET: Love Tracks - LastFM
   *
   * https://www.last.fm/api/show/user.getLovedTracks
   * @returns Loved Tracks;
   */
  const getLovedTracks = (
    method: string,
    user: string,
    period: string,
    limit: number
  ): Promise<LovedTracksResponse> => {
    return request(method, user, period, limit);
  };

  /**
   * GET: Recent Tracks - LastFM
   *
   * https://www.last.fm/api/show/user.getRecentTracks
   * @returns Recent Tracks
   */
  const getRecentTracks = (
    method: string,
    user: string,
    period: string,
    limit: number
  ): Promise<RecentTracksResponse> => {
    return request(method, user, period, limit);
  };

  /**
   * GET: Top Albums - LastFM
   *
   * https://www.last.fm/api/show/user.getTopAlbums
   * @returns Top Albums
   */
  const getTopAlbums = (
    method: string,
    user: string,
    period: string,
    limit: number
  ): Promise<TopAlbumsResponse> => {
    return request(method, user, period, limit);
  };

  /**
   * GET: Top Artist - LastFM
   *
   * https://www.last.fm/api/show/user.getTopArtists
   * @returns Top Artists
   */
  const getTopArtists = (
    method: string,
    user: string,
    period: string,
    limit: number
  ): Promise<TopArtistsResponse> => {
    return request(method, user, period, limit);
  };

  /**
   * GET: Top Tracks - LastFM
   *
   * https://www.last.fm/api/show/user.getTopTracks
   * @returns Top Tracks
   */
  const getTopTracks = (
    method: string,
    user: string,
    period: string,
    limit: number
  ): Promise<TopTrackResponse> => {
    return request(method, user, period, limit);
  };

  /**
   * GET: Weekly album chart - LastFM
   *
   * https://www.last.fm/api/show/user.getWeeklyAlbumChart
   * @returns Weekly album chart
   */
  const getWeeklyAlbumChart = (
    method: string,
    user: string,
    period: string,
    limit: number
  ): Promise<WeeklyAlbumChartResponse> => {
    return request(method, user, period, limit);
  };

  /**
   * GET: Weekly artist chart - LastFM
   *
   * https://www.last.fm/api/show/user.getWeeklyArtistChart
   * @returns Weekly artist chart
   */
  const getWeeklyArtistChart = (
    method: string,
    user: string,
    period: string,
    limit: number
  ): Promise<WeeklyArtistChartResponse> => {
    return request(method, user, period, limit);
  };

  /**
   * GET: Weekly chart list - LastFM
   *
   * https://www.last.fm/api/show/user.getWeeklyChartList
   * @returns Weekly chart list
   */
  const getWeeklyChartList = (
    method: string,
    user: string,
    period: string,
    limit: number
  ): Promise<WeeklyChartListResponse> => {
    return request(method, user, period, limit);
  };

  /**
   * GET: Weekly track chart - LastFM
   *
   * https://www.last.fm/api/show/user.getWeeklyTrackChart
   * @returns Weekly track chart
   */
  const getWeeklyTrackChart = (
    method: string,
    user: string,
    period: string,
    limit: number
  ): Promise<WeeklyTrackChartResponse> => {
    return request(method, user, period, limit);
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
