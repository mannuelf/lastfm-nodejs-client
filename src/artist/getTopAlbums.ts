import type { ArtistTopAlbumsResponse } from '../lastfm.types.js';
import request from '../request.js';

/**
 * Get the top albums for an artist on Last.fm, ordered by popularity.
 *
 * @see https://www.last.fm/api/show/artist.getTopAlbums
 * @param method - The Last.fm API method string (`method.artist.getTopAlbums`)
 * @param artist - The artist name
 * @param limit - Number of results per page (default `'50'`)
 * @param page - Page number to fetch (default `'1'`)
 * @param autocorrect - Set to `'1'` to auto-correct misspelled names (default `'1'`)
 * @returns Paginated list of the artist's top albums
 */
export async function artistGetTopAlbums(method: string, artist: string, limit = '50', page = '1', autocorrect = '1'): Promise<ArtistTopAlbumsResponse> {
  return await request<ArtistTopAlbumsResponse>({ method, artist, limit, page, autocorrect });
}
