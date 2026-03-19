import type { AuthResponse } from '../lastfm.types.js';
import { signedRequest } from '../request.js';
import { config } from '../config.js';

/**
 * Tag a track using a list of user-supplied tags. Requires authentication.
 *
 * @see https://www.last.fm/api/show/track.addTags
 * @param method - The Last.fm API method string (`method.track.addTags`)
 * @param artist - The artist name
 * @param track - The track name
 * @param tags - A comma-separated list of tags to apply (max 10)
 * @param sk - A session key obtained via the auth flow
 * @returns Authentication response confirming the operation
 */
export async function trackAddTags(method: string, artist: string, track: string, tags: string, sk: string): Promise<AuthResponse> {
  return await signedRequest<AuthResponse>({ method, artist, track, tags, sk }, config.share_secret);
}
