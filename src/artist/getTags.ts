import type { ArtistTagsResponse } from '../lastfm.types.js';
import request from '../request.js';

/**
 * Get the tags applied by an individual user to an artist on Last.fm.
 *
 * @see https://www.last.fm/api/show/artist.getTags
 * @param method - The Last.fm API method string (`method.artist.getTags`)
 * @param artist - The artist name
 * @param user - The Last.fm username whose tags to retrieve
 * @param autocorrect - Set to `'1'` to auto-correct misspelled names (default `'1'`)
 * @returns Tags applied by the user to this artist
 */
export async function artistGetTags(method: string, artist: string, user: string, autocorrect = '1'): Promise<ArtistTagsResponse> {
  return await request<ArtistTagsResponse>({ method, artist, user, autocorrect });
}
