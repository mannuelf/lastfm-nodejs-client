import { RecentTracksResponse } from '../@types';
import { createOptions } from './createOptions';
import request from './request';

/**
 * GET: Recent Tracks - LastFM
 *
 * https://www.last.fm/api/show/user.getRecentTracks
 * @returns Recent Tracks
 */
export function getRecentTracks(
  method: string,
  user: string,
  period: string,
  limit: string,
): Promise<RecentTracksResponse> {
  const options = createOptions(method, user, period, limit);
  return request<RecentTracksResponse>(options);
}