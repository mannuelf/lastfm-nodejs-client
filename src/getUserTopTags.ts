import type { UserTopTagsResponse } from './lastfm.types.js';
import { createOptions } from './createOptions.js';
import request from './request.js';

/**
 * Get the top tags used by a user on Last.fm, ordered by tag count.
 *
 * @see https://www.last.fm/api/show/user.getTopTags
 * @param method - The Last.fm API method string (`method.user.getTopTags`)
 * @param user - The Last.fm username
 * @param limit - Maximum number of tags to return
 * @returns The user's most-used tags ordered by count
 */
export async function getUserTopTags(
  method: string,
  user: string,
  limit: string,
): Promise<UserTopTagsResponse> {
  const options = createOptions(method, user, undefined, limit);
  return await request<UserTopTagsResponse>(options);
}
