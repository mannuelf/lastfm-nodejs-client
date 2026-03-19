import type { FriendsResponse } from './lastfm.types.js';
import { createOptions } from './createOptions.js';
import request from './request.js';

/**
 * Get a list of the user's friends on Last.fm.
 *
 * @see https://www.last.fm/api/show/user.getFriends
 * @param method - The Last.fm API method string (`method.user.getFriends`)
 * @param user - The Last.fm username
 * @param limit - Number of results per page
 * @returns A list of the user's friends with their profile information
 */
export async function getFriends(
  method: string,
  user: string,
  limit: string,
): Promise<FriendsResponse> {
  const options = createOptions(method, user, undefined, limit);
  return await request<FriendsResponse>(options);
}
