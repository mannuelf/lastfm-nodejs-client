import type { AuthResponse } from '../lastfm.types.js';
import { signedRequest } from '../request.js';
import { config } from '../config.js';

/**
 * Remove a user-applied tag from an artist. Requires authentication.
 *
 * @see https://www.last.fm/api/show/artist.removeTag
 * @param method - The Last.fm API method string (`method.artist.removeTag`)
 * @param artist - The artist name
 * @param tag - A single tag to remove from the artist
 * @param sk - A session key obtained via the auth flow
 * @returns Authentication response confirming the operation
 */
export async function artistRemoveTag(method: string, artist: string, tag: string, sk: string): Promise<AuthResponse> {
  return await signedRequest<AuthResponse>({ method, artist, tag, sk }, config.share_secret);
}
