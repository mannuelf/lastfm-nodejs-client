import { type TopArtistsResponse } from './lastfm.types.js';
import { createOptions } from './createOptions.js';
import request from './request.js';

/**
 * Get the top artists listened to by a user on Last.fm, over a given time period.
 *
 * @see https://www.last.fm/api/show/user.getTopArtists
 * @param method - The Last.fm API method string (`method.user.getTopArtists`)
 * @param user - The Last.fm username
 * @param period - Time period (`overall`, `7day`, `1month`, `3month`, `6month`, `12month`)
 * @param limit - Number of results per page
 * @returns The user's top artists for the given period
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
