import type { AuthResponse } from '../lastfm.types.js';
import { signedRequest } from '../request.js';
import { config } from '../config.js';

/**
 * Love a track for the authenticated user. Requires authentication.
 *
 * @see https://www.last.fm/api/show/track.love
 * @param method - The Last.fm API method string (`method.track.love`)
 * @param artist - The artist name
 * @param track - The track name
 * @param sk - A session key obtained via the auth flow
 * @returns Authentication response confirming the operation
 */
export async function trackLove(method: string, artist: string, track: string, sk: string): Promise<AuthResponse> {
  return await signedRequest<AuthResponse>({ method, artist, track, sk }, config.share_secret);
}
