import type { AuthResponse } from '../lastfm.types.js';
import { signedRequest } from '../request.js';
import { config } from '../config.js';
export async function trackRemoveTag(method: string, artist: string, track: string, tag: string, sk: string): Promise<AuthResponse> {
  return await signedRequest<AuthResponse>({ method, artist, track, tag, sk }, config.share_secret);
}
