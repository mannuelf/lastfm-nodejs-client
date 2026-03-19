import type { AuthResponse } from '../lastfm.types.js';
import { signedRequest } from '../request.js';
import { config } from '../config.js';

/**
 * Tag an artist using a list of user-supplied tags. Requires authentication.
 *
 * @see https://www.last.fm/api/show/artist.addTags
 * @param method - The Last.fm API method string (`method.artist.addTags`)
 * @param artist - The artist name
 * @param tags - A comma-separated list of tags to apply (max 10)
 * @param sk - A session key obtained via the auth flow
 * @returns Authentication response confirming the operation
 */
export async function artistAddTags(method: string, artist: string, tags: string, sk: string): Promise<AuthResponse> {
  return await signedRequest<AuthResponse>({ method, artist, tags, sk }, config.share_secret);
}
