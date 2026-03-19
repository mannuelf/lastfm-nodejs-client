import { type LovedTracksResponse } from './lastfm.types.js';
import { createOptions } from './createOptions.js';
import request from './request.js';

/**
 * Get the last 50 tracks loved by a user on Last.fm.
 *
 * @see https://www.last.fm/api/show/user.getLovedTracks
 * @param method - The Last.fm API method string (`method.user.getLovedTracks`)
 * @param user - The Last.fm username
 * @param period - The time period to retrieve loved tracks for
 * @param limit - Number of results per page
 * @returns The user's loved tracks
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
