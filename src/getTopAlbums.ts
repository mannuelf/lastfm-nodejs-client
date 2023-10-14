import { type TopAlbumsResponse } from './lastfm.types.js';
import request from './request.js';
import { createOptions } from './createOptions.js';

/**
 * GET: Top Albums - LastFM
 *
 * https://www.last.fm/api/show/user.getTopAlbums
 * @returns Top Albums
 */
export async function getTopAlbums(
  method: string,
  user: string,
  period: string,
  limit: string,
): Promise<TopAlbumsResponse> {
  const options = createOptions(method, user, period, limit);
  return await request<TopAlbumsResponse>(options);
}
