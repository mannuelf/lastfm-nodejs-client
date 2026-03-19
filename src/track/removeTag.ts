import type { AuthResponse } from '../lastfm.types.js';
import { signedRequest } from '../request.js';
import { config } from '../config.js';

/**
 * Remove a user-applied tag from a track. Requires authentication.
 *
 * @see https://www.last.fm/api/show/track.removeTag
 * @param method - The Last.fm API method string (`method.track.removeTag`)
 * @param artist - The artist name
 * @param track - The track name
 * @param tag - A single tag to remove from the track
 * @param sk - A session key obtained via the auth flow
 * @returns Authentication response confirming the operation
 */
export async function trackRemoveTag(method: string, artist: string, track: string, tag: string, sk: string): Promise<AuthResponse> {
  return await signedRequest<AuthResponse>({ method, artist, track, tag, sk }, config.share_secret);
}
