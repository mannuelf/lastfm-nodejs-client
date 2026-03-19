import type { ArtistSimilarResponse } from '../lastfm.types.js';
import request from '../request.js';

/**
 * Get all the artists similar to this artist.
 *
 * @see https://www.last.fm/api/show/artist.getSimilar
 * @param method - The Last.fm API method string (`method.artist.getSimilar`)
 * @param artist - The artist name
 * @param limit - Maximum number of similar artists to return (default `'30'`)
 * @param autocorrect - Set to `'1'` to auto-correct misspelled names (default `'1'`)
 * @returns A list of similar artists with match scores
 */
export async function artistGetSimilar(method: string, artist: string, limit = '30', autocorrect = '1'): Promise<ArtistSimilarResponse> {
  return await request<ArtistSimilarResponse>({ method, artist, limit, autocorrect });
}
