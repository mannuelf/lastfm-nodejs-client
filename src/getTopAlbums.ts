import { type TopAlbumsResponse } from './lastfm.types.js';
import request from './request.js';
import { createOptions } from './createOptions.js';

/**
 * Get the top albums listened to by a user on Last.fm, over a given time period.
 *
 * @see https://www.last.fm/api/show/user.getTopAlbums
 * @param method - The Last.fm API method string (`method.user.getTopAlbums`)
 * @param user - The Last.fm username
 * @param period - Time period (`overall`, `7day`, `1month`, `3month`, `6month`, `12month`)
 * @param limit - Number of results per page
 * @returns The user's top albums for the given period
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
