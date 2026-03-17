import type { UserTopTagsResponse } from './lastfm.types.js';
import { createOptions } from './createOptions.js';
import request from './request.js';

/**
 * GET: User Top Tags - LastFM
 *
 * https://www.last.fm/api/show/user.getTopTags
 * @returns Top Tags for a user
 */
export async function getUserTopTags(
  method: string,
  user: string,
  limit: string,
): Promise<UserTopTagsResponse> {
  const options = createOptions(method, user, undefined, limit);
  return await request<UserTopTagsResponse>(options);
}
