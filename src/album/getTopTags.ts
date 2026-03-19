import type { AlbumTopTagsResponse } from '../lastfm.types.js';
import request from '../request.js';

/**
 * Get the top tags applied to an album on Last.fm, ordered by tag count.
 *
 * @see https://www.last.fm/api/show/album.getTopTags
 * @param method - The Last.fm API method string (`method.album.getTopTags`)
 * @param artist - The artist name
 * @param album - The album name
 * @param autocorrect - Set to `'1'` to auto-correct misspelled names (default `'1'`)
 * @returns Top tags for the album ordered by tag count
 */
export async function albumGetTopTags(method: string, artist: string, album: string, autocorrect = '1'): Promise<AlbumTopTagsResponse> {
  return await request<AlbumTopTagsResponse>({ method, artist, album, autocorrect });
}
