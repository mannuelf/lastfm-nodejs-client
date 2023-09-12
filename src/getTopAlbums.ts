import { TopAlbumsResponse } from '../@types';
import { createOptions } from './createOptions';
import request from './request';

/**
 * GET: Top Albums - LastFM
 *
 * https://www.last.fm/api/show/user.getTopAlbums
 * @returns Top Albums
 */
export function getTopAlbums(
  method: string,
  user: string,
  period: string,
  limit: string,
): Promise<TopAlbumsResponse> {
  const options = createOptions(method, user, period, limit);
  return request<TopAlbumsResponse>(options);
}
