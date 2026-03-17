import { type RecentTracksResponse } from './lastfm.types.js';
import { createOptions } from './createOptions.js';
import request from './request.js';

/**
 * GET: Recent Tracks - LastFM
 *
 * https://www.last.fm/api/show/user.getRecentTracks
 * @returns Recent Tracks
 */
export async function getRecentTracks(
  method: string,
  user: string,
  limit: string,
  from?: string,
): Promise<RecentTracksResponse> {
  const options = createOptions(method, user, undefined, limit, undefined, from);
  return await request<RecentTracksResponse>(options);
}
