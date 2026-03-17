import type { ScrobbleResponse } from '../lastfm.types.js';
import { signedRequest } from '../request.js';
import { config } from '../config.js';
export async function trackScrobble(method: string, artist: string, track: string, timestamp: string, album: string, sk: string): Promise<ScrobbleResponse> {
  return await signedRequest<ScrobbleResponse>({ method, artist, track, timestamp, album, sk }, config.share_secret);
}
