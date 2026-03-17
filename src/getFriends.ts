import type { FriendsResponse } from './lastfm.types.js';
import { createOptions } from './createOptions.js';
import request from './request.js';

/**
 * GET: Friends - LastFM
 *
 * https://www.last.fm/api/show/user.getFriends
 * @returns Friends of a user
 */
export async function getFriends(
  method: string,
  user: string,
  limit: string,
): Promise<FriendsResponse> {
  const options = createOptions(method, user, undefined, limit);
  return await request<FriendsResponse>(options);
}
