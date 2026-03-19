import type { TagSimilarResponse } from '../lastfm.types.js';
import request from '../request.js';

/**
 * Search for tags similar to this one on Last.fm. Returns tags ranked by similarity.
 *
 * @see https://www.last.fm/api/show/tag.getSimilar
 * @param method - The Last.fm API method string (`method.tag.getSimilar`)
 * @param tag - The tag name to find similar tags for
 * @returns A list of similar tags
 */
export async function tagGetSimilar(method: string, tag: string): Promise<TagSimilarResponse> {
  return await request<TagSimilarResponse>({ method, tag });
}
