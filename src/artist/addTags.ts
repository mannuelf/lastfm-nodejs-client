import type { AuthResponse } from '../lastfm.types.js';
import { signedRequest } from '../request.js';
import { config } from '../config.js';
export async function artistAddTags(method: string, artist: string, tags: string, sk: string): Promise<AuthResponse> {
  return await signedRequest<AuthResponse>({ method, artist, tags, sk }, config.share_secret);
}
