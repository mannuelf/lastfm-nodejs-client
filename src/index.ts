import config from './config';
import method from './method';
import request from './request';
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
} from '../@types';

function createOptions(
  method: string,
  user: string,
  period: string,
  limit: string) {
  return {
    method,
    user,
    period,
    limit,
  }
}

function LastFmApi() {
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
  function auth(
    method: string,
    user: string,
    period: string,
    limit: string,
  ): Promise<AuthResponse> {
    const options = createOptions(method, user, period, limit);
    return request<AuthResponse>(options);
  }

  /**
   * GET: User profile information - LastFM
   *
   * https://www.last.fm/api/show/user.getInfo
   * @returns User profile data
   */
  function getInfo(
    method: string,
    user: string,
    period: string,
    limit: string,
  ): Promise<UserResponse> {
    const options = createOptions(method, user, period, limit);
    return request<UserResponse>(options);
  }

  /**
   * GET: Love Tracks - LastFM
   *
   * https://www.last.fm/api/show/user.getLovedTracks
   * @returns Loved Tracks;
   */
  function getLovedTracks(
    method: string,
    user: string,
    period: string,
    limit: string,
  ): Promise<LovedTracksResponse> {
    const options = createOptions(method, user, period, limit);
    return request<LovedTracksResponse>(options);
  }

  /**
   * GET: Recent Tracks - LastFM
   *
   * https://www.last.fm/api/show/user.getRecentTracks
   * @returns Recent Tracks
   */
  function getRecentTracks(
    method: string,
    user: string,
    period: string,
    limit: string,
  ): Promise<RecentTracksResponse> {
    const options = createOptions(method, user, period, limit);
    return request<RecentTracksResponse>(options);
  }

  /**
   * GET: Top Albums - LastFM
   *
   * https://www.last.fm/api/show/user.getTopAlbums
   * @returns Top Albums
   */
  function getTopAlbums(
    method: string,
    user: string,
    period: string,
    limit: string,
  ): Promise<TopAlbumsResponse> {
    const options = createOptions(method, user, period, limit);
    return request<TopAlbumsResponse>(options);
  }

  /**
   * GET: Top Artist - LastFM
   *
   * https://www.last.fm/api/show/user.getTopArtists
   * @returns Top Artists
   */
  function getTopArtists(
    method: string,
    user: string,
    period: string,
    limit: string,
  ): Promise<TopArtistsResponse> {
    const options = createOptions(method, user, period, limit);
    return request<TopArtistsResponse>(options);
  }

  /**
   * GET: Top Tracks - LastFM
   *
   * https://www.last.fm/api/show/user.getTopTracks
   * @returns Top Tracks
   */
  function getTopTracks(
    method: string,
    user: string,
    period: string,
    limit: string,
  ): Promise<TopTrackResponse> {
    const options = createOptions(method, user, period, limit);
    return request<TopTrackResponse>(options);
  }

  /**
   * GET: Weekly album chart - LastFM
   *
   * https://www.last.fm/api/show/user.getWeeklyAlbumChart
   * @returns Weekly album chart
   */
  function getWeeklyAlbumChart(
    method: string,
    user: string,
    period: string,
    limit: string,
  ): Promise<WeeklyAlbumChartResponse> {
    const options = createOptions(method, user, period, limit);
    return request<WeeklyAlbumChartResponse>(options);
  }

  /**
   * GET: Weekly artist chart - LastFM
   *
   * https://www.last.fm/api/show/user.getWeeklyArtistChart
   * @returns Weekly artist chart
   */
  function getWeeklyArtistChart(
    method: string,
    user: string,
    period: string,
    limit: string,
  ): Promise<WeeklyArtistChartResponse> {
    const options = createOptions(method, user, period, limit);
    return request<WeeklyArtistChartResponse>(options);
  }

  /**
   * GET: Weekly chart list - LastFM
   *
   * https://www.last.fm/api/show/user.getWeeklyChartList
   * @returns Weekly chart list
   */
  function getWeeklyChartList(
    method: string,
    user: string,
    period: string,
    limit: string,
  ): Promise<WeeklyChartListResponse> {
    const options = createOptions(method, user, period, limit);
    return request<WeeklyChartListResponse>(options);
  }

  /**
   * GET: Weekly track chart - LastFM
   *
   * https://www.last.fm/api/show/user.getWeeklyTrackChart
   * @returns Weekly track chart
   */
  function getWeeklyTrackChart(
    method: string,
    user: string,
    period: string,
    limit: string,
  ): Promise<WeeklyTrackChartResponse> {
    const options = createOptions(method, user, period, limit);
    return request<WeeklyTrackChartResponse>(options);
  }

  return {
    auth,
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

export default LastFmApi;
