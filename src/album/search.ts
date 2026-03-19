import type { AlbumSearchResponse } from '../lastfm.types.js';
import request from '../request.js';

/**
 * Search for an album by name on Last.fm. Returns paginated results.
 *
 * @see https://www.last.fm/api/show/album.search
 * @param method - The Last.fm API method string (`method.album.search`)
 * @param album - The album name to search for
 * @param limit - Number of results per page (default `'30'`)
 * @param page - Page number to fetch (default `'1'`)
 * @returns Paginated album search results
 */
export async function albumSearch(method: string, album: string, limit = '30', page = '1'): Promise<AlbumSearchResponse> {
  return await request<AlbumSearchResponse>({ method, album, limit, page });
}
