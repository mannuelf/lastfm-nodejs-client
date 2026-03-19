import type { ArtistTopTagsResponse } from '../lastfm.types.js';
import request from '../request.js';

/**
 * Get the top tags for an artist on Last.fm, ordered by popularity.
 *
 * @see https://www.last.fm/api/show/artist.getTopTags
 * @param method - The Last.fm API method string (`method.artist.getTopTags`)
 * @param artist - The artist name
 * @param autocorrect - Set to `'1'` to auto-correct misspelled names (default `'1'`)
 * @returns Top tags for the artist ordered by tag count
 */
export async function artistGetTopTags(method: string, artist: string, autocorrect = '1'): Promise<ArtistTopTagsResponse> {
  return await request<ArtistTopTagsResponse>({ method, artist, autocorrect });
}
