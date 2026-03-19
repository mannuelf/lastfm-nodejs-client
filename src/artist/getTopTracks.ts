import type { ArtistTopTracksResponse } from '../lastfm.types.js';
import request from '../request.js';

/**
 * Get the top tracks for an artist on Last.fm, ordered by popularity.
 *
 * @see https://www.last.fm/api/show/artist.getTopTracks
 * @param method - The Last.fm API method string (`method.artist.getTopTracks`)
 * @param artist - The artist name
 * @param limit - Number of results per page (default `'50'`)
 * @param page - Page number to fetch (default `'1'`)
 * @param autocorrect - Set to `'1'` to auto-correct misspelled names (default `'1'`)
 * @returns Paginated list of the artist's top tracks
 */
export async function artistGetTopTracks(method: string, artist: string, limit = '50', page = '1', autocorrect = '1'): Promise<ArtistTopTracksResponse> {
  return await request<ArtistTopTracksResponse>({ method, artist, limit, page, autocorrect });
}
