import type { ArtistSearchResponse } from '../lastfm.types.js';
import request from '../request.js';

/**
 * Search for an artist by name on Last.fm. Returns paginated results.
 *
 * @see https://www.last.fm/api/show/artist.search
 * @param method - The Last.fm API method string (`method.artist.search`)
 * @param artist - The artist name to search for
 * @param limit - Number of results per page (default `'30'`)
 * @param page - Page number to fetch (default `'1'`)
 * @returns Paginated artist search results
 */
export async function artistSearch(method: string, artist: string, limit = '30', page = '1'): Promise<ArtistSearchResponse> {
  return await request<ArtistSearchResponse>({ method, artist, limit, page });
}
