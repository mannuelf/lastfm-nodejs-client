import type { TagTopArtistsResponse } from '../lastfm.types.js';
import request from '../request.js';

/**
 * Get the top artists tagged with a given tag on Last.fm, ordered by tag count.
 *
 * @see https://www.last.fm/api/show/tag.getTopArtists
 * @param method - The Last.fm API method string (`method.tag.getTopArtists`)
 * @param tag - The tag name
 * @param limit - Number of results per page (default `'50'`)
 * @param page - Page number to fetch (default `'1'`)
 * @returns Paginated list of top artists for the given tag
 */
export async function tagGetTopArtists(method: string, tag: string, limit = '50', page = '1'): Promise<TagTopArtistsResponse> {
  return await request<TagTopArtistsResponse>({ method, tag, limit, page });
}
