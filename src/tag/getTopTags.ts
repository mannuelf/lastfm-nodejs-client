import type { TagTopTagsResponse } from '../lastfm.types.js';
import request from '../request.js';

/**
 * Fetches the top global tags on Last.fm, sorted by popularity (number of times used).
 *
 * @see https://www.last.fm/api/show/tag.getTopTags
 * @param method - The Last.fm API method string (`method.tag.getTopTags`)
 * @returns The top tags on Last.fm ordered by usage count
 */
export async function tagGetTopTags(method: string): Promise<TagTopTagsResponse> {
  return await request<TagTopTagsResponse>({ method });
}
