import type { AuthResponse } from '../lastfm.types.js';
import { signedRequest } from '../request.js';
import { config } from '../config.js';
export async function trackUpdateNowPlaying(method: string, artist: string, track: string, album: string, sk: string): Promise<AuthResponse> {
  return await signedRequest<AuthResponse>({ method, artist, track, album, sk }, config.share_secret);
}
