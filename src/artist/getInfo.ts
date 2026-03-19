import type { ArtistInfoResponse } from '../lastfm.types.js';
import request from '../request.js';

/**
 * Get the metadata for an artist on Last.fm. Includes biography, tags, and similar artists.
 *
 * @see https://www.last.fm/api/show/artist.getInfo
 * @param method - The Last.fm API method string (`method.artist.getInfo`)
 * @param artist - The artist name
 * @param autocorrect - Set to `'1'` to auto-correct misspelled names (default `'1'`)
 * @param lang - ISO 639 alpha-2 language code for the biography text (default `'en'`)
 * @returns Artist metadata including biography, similar artists, and top tags
 */
export async function artistGetInfo(method: string, artist: string, autocorrect = '1', lang = 'en'): Promise<ArtistInfoResponse> {
  return await request<ArtistInfoResponse>({ method, artist, autocorrect, lang });
}
