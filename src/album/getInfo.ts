import type { AlbumInfoResponse } from '../lastfm.types.js';
import request from '../request.js';

/**
 * Get the metadata and tracklist for an album on Last.fm.
 *
 * @see https://www.last.fm/api/show/album.getInfo
 * @param method - The Last.fm API method string (`method.album.getInfo`)
 * @param artist - The artist name
 * @param album - The album name
 * @param autocorrect - Set to `'1'` to auto-correct misspelled names (default `'1'`)
 * @param lang - ISO 639 alpha-2 language code for the biography text (default `'en'`)
 * @returns Album metadata including tracklist, wiki, and tags
 */
export async function albumGetInfo(method: string, artist: string, album: string, autocorrect = '1', lang = 'en'): Promise<AlbumInfoResponse> {
  return await request<AlbumInfoResponse>({ method, artist, album, autocorrect, lang });
}
