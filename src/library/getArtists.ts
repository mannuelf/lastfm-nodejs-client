import type { LibraryArtistsResponse } from '../lastfm.types.js';
import request from '../request.js';

/**
 * A paginated list of all the artists in a user's library, with playcounts and tag counts.
 *
 * @see https://www.last.fm/api/show/library.getArtists
 * @param method - The Last.fm API method string (`method.library.getArtists`)
 * @param user - The Last.fm username whose library to fetch
 * @param limit - Number of results per page (default `'50'`)
 * @param page - Page number to fetch (default `'1'`)
 * @returns Paginated list of artists from the user's library
 */
export async function libraryGetArtists(method: string, user: string, limit = '50', page = '1'): Promise<LibraryArtistsResponse> {
  return await request<LibraryArtistsResponse>({ method, user, limit, page });
}
