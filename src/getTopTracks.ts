import { type TopTrackResponse } from './lastfm.types.js';
import { createOptions } from './createOptions.js';
import request from './request.js';

/**
 * Get the top tracks listened to by a user on Last.fm, over a given time period.
 *
 * @see https://www.last.fm/api/show/user.getTopTracks
 * @param method - The Last.fm API method string (`method.user.getTopTracks`)
 * @param user - The Last.fm username
 * @param period - Time period (`overall`, `7day`, `1month`, `3month`, `6month`, `12month`)
 * @param limit - Number of results per page
 * @returns The user's top tracks for the given period
 */
export async function getTopTracks(
  method: string,
  user: string,
  period: string,
  limit: string,
): Promise<TopTrackResponse> {
  const options = createOptions(method, user, period, limit);
  return await request<TopTrackResponse>(options);
}
