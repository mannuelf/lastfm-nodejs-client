import type { AuthResponse } from '../lastfm.types.js';
import { signedRequest } from '../request.js';
import { config } from '../config.js';
export async function trackAddTags(method: string, artist: string, track: string, tags: string, sk: string): Promise<AuthResponse> {
  return await signedRequest<AuthResponse>({ method, artist, track, tags, sk }, config.share_secret);
}
