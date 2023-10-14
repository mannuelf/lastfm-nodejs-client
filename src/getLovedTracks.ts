import { type LovedTracksResponse } from './lastfm.types.js';
import { createOptions } from './createOptions.js';
import request from './request.js';

/**
 * GET: Love Tracks - LastFM
 *
 * https://www.last.fm/api/show/user.getLovedTracks
 * @returns Loved Tracks;
 */
export async function getLovedTracks(
  method: string,
  user: string,
  period: string,
  limit: string,
): Promise<LovedTracksResponse> {
  const options = createOptions(method, user, period, limit);
  return await request<LovedTracksResponse>(options);
}
