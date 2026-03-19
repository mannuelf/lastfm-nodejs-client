import type { TagTopAlbumsResponse } from '../lastfm.types.js';
import request from '../request.js';

/**
 * Get the top albums tagged with a given tag on Last.fm, ordered by tag count.
 *
 * @see https://www.last.fm/api/show/tag.getTopAlbums
 * @param method - The Last.fm API method string (`method.tag.getTopAlbums`)
 * @param tag - The tag name
 * @param limit - Number of results per page (default `'50'`)
 * @param page - Page number to fetch (default `'1'`)
 * @returns Paginated list of top albums for the given tag
 */
export async function tagGetTopAlbums(method: string, tag: string, limit = '50', page = '1'): Promise<TagTopAlbumsResponse> {
  return await request<TagTopAlbumsResponse>({ method, tag, limit, page });
}
