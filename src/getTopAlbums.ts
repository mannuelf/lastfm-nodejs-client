import { type TopAlbumsResponse } from './lastfm.types';
import request from './request';
import { createOptions } from './createOptions';

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
