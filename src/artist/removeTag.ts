import type { AuthResponse } from '../lastfm.types.js';
import { signedRequest } from '../request.js';
import { config } from '../config.js';
export async function artistRemoveTag(method: string, artist: string, tag: string, sk: string): Promise<AuthResponse> {
  return await signedRequest<AuthResponse>({ method, artist, tag, sk }, config.share_secret);
}
