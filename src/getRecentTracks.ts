import { type RecentTracksResponse } from './lastfm.types.js';
import { createOptions } from './createOptions.js';
import request from './request.js';

/**
 * Get a list of the recent tracks listened to by a user on Last.fm.
 *
 * @see https://www.last.fm/api/show/user.getRecentTracks
 * @param method - The Last.fm API method string (`method.user.getRecentTracks`)
 * @param user - The Last.fm username
 * @param limit - Number of results per page
 * @param from - Unix timestamp; only return tracks scrobbled after this time
 * @returns The user's recent tracks including any currently playing track
 */
export async function getRecentTracks(
  method: string,
  user: string,
  limit: string,
  from?: string,
): Promise<RecentTracksResponse> {
  const options = createOptions(method, user, undefined, limit, undefined, from);
  return await request<RecentTracksResponse>(options);
}
