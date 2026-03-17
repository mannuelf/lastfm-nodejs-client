import type { AuthResponse } from '../lastfm.types.js';
import { signedRequest } from '../request.js';
import { config } from '../config.js';
export async function trackLove(method: string, artist: string, track: string, sk: string): Promise<AuthResponse> {
  return await signedRequest<AuthResponse>({ method, artist, track, sk }, config.share_secret);
}
