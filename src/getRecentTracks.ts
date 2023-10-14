import { type RecentTracksResponse } from './lastfm.types';
import { createOptions } from './createOptions';
import request from './request';

/**
 * GET: Recent Tracks - LastFM
 *
 * https://www.last.fm/api/show/user.getRecentTracks
 * @returns Recent Tracks
 */
export async function getRecentTracks(
  method: string,
  user: string,
  period: string,
  limit: string,
): Promise<RecentTracksResponse> {
  const options = createOptions(method, user, period, limit);
  return await request<RecentTracksResponse>(options);
}
