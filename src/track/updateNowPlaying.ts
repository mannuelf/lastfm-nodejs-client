import type { AuthResponse } from '../lastfm.types.js';
import { signedRequest } from '../request.js';
import { config } from '../config.js';

/**
 * Notify Last.fm that a user has started listening to a track. Requires authentication.
 *
 * @see https://www.last.fm/api/show/track.updateNowPlaying
 * @param method - The Last.fm API method string (`method.track.updateNowPlaying`)
 * @param artist - The artist name
 * @param track - The track name
 * @param album - The album name
 * @param sk - A session key obtained via the auth flow
 * @returns Authentication response confirming the now-playing update
 */
export async function trackUpdateNowPlaying(method: string, artist: string, track: string, album: string, sk: string): Promise<AuthResponse> {
  return await signedRequest<AuthResponse>({ method, artist, track, album, sk }, config.share_secret);
}
