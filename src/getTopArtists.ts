import { type TopArtistsResponse } from './lastfm.types.js';
import { createOptions } from './createOptions.js';
import request from './request.js';

/**
 * GET: Top Artist - LastFM
 *
 * https://www.last.fm/api/show/user.getTopArtists
 * @returns Top Artists
 */
export async function getTopArtists(
  method: string,
  user: string,
  period: string,
  limit: string,
): Promise<TopArtistsResponse> {
  const options = createOptions(method, user, period, limit);
  return await request<TopArtistsResponse>(options);
}
