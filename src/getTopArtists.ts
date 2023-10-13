import { type TopArtistsResponse } from './lastfm.types';
import { createOptions } from './createOptions';
import request from './request';

/**
 * GET: Top Artist - LastFM
 *
 * https://www.last.fm/api/show/user.getTopArtists
 * @returns Top Artists
 */
export async function getTopArtists (
  method: string,
  user: string,
  period: string,
  limit: string
): Promise<TopArtistsResponse> {
  const options = createOptions(method, user, period, limit);
  return await request<TopArtistsResponse>(options);
}
