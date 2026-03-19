import type { UserPersonalTagsResponse } from '../lastfm.types.js';
import request from '../request.js';

/**
 * Get the items tagged by a user, of the type specified, filtered by tag.
 *
 * @see https://www.last.fm/api/show/user.getPersonalTags
 * @param method - The Last.fm API method string (`method.user.getPersonalTags`)
 * @param user - The Last.fm username
 * @param tag - The tag to filter by
 * @param taggingtype - The type of items tagged (`artist`, `album`, or `track`)
 * @param limit - Number of results per page (default `'50'`)
 * @param page - Page number to fetch (default `'1'`)
 * @returns Paginated list of items tagged by the user with the given tag
 */
export async function userGetPersonalTags(method: string, user: string, tag: string, taggingtype: string, limit = '50', page = '1'): Promise<UserPersonalTagsResponse> {
  return await request<UserPersonalTagsResponse>({ method, user, tag, limit, page });
}
