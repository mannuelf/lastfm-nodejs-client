import type { ScrobbleResponse } from '../lastfm.types.js';
import { signedRequest } from '../request.js';
import { config } from '../config.js';

/**
 * Add a track-play to a user's scrobble history. Requires authentication.
 *
 * @see https://www.last.fm/api/show/track.scrobble
 * @param method - The Last.fm API method string (`method.track.scrobble`)
 * @param artist - The artist name
 * @param track - The track name
 * @param timestamp - Unix timestamp of when the track was listened to
 * @param album - The album name
 * @param sk - A session key obtained via the auth flow
 * @returns The accepted and ignored scrobble counts
 */
export async function trackScrobble(method: string, artist: string, track: string, timestamp: string, album: string, sk: string): Promise<ScrobbleResponse> {
  return await signedRequest<ScrobbleResponse>({ method, artist, track, timestamp, album, sk }, config.share_secret);
}
