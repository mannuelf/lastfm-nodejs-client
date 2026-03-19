import type { AlbumTagsResponse } from '../lastfm.types.js';
import request from '../request.js';

/**
 * Get the tags applied by an individual user to an album on Last.fm.
 *
 * @see https://www.last.fm/api/show/album.getTags
 * @param method - The Last.fm API method string (`method.album.getTags`)
 * @param artist - The artist name
 * @param album - The album name
 * @param user - The Last.fm username whose tags to retrieve
 * @param autocorrect - Set to `'1'` to auto-correct misspelled names (default `'1'`)
 * @returns Tags applied by the user to this album
 */
export async function albumGetTags(method: string, artist: string, album: string, user: string, autocorrect = '1'): Promise<AlbumTagsResponse> {
  return await request<AlbumTagsResponse>({ method, artist, album, user, autocorrect });
}
