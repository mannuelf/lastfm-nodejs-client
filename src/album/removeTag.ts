import type { AuthResponse } from '../lastfm.types.js';
import { signedRequest } from '../request.js';
import { config } from '../config.js';

/**
 * Remove a user-applied tag from an album. Requires authentication.
 *
 * @see https://www.last.fm/api/show/album.removeTag
 * @param method - The Last.fm API method string (`method.album.removeTag`)
 * @param artist - The artist name
 * @param album - The album name
 * @param tag - A single tag to remove from the album
 * @param sk - A session key obtained via the auth flow
 * @returns Authentication response confirming the operation
 */
export async function albumRemoveTag(method: string, artist: string, album: string, tag: string, sk: string): Promise<AuthResponse> {
  return await signedRequest<AuthResponse>({ method, artist, album, tag, sk }, config.share_secret);
}
