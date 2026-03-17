import type { AuthResponse } from '../lastfm.types.js';
import { signedRequest } from '../request.js';
import { config } from '../config.js';
export async function albumRemoveTag(method: string, artist: string, album: string, tag: string, sk: string): Promise<AuthResponse> {
  return await signedRequest<AuthResponse>({ method, artist, album, tag, sk }, config.share_secret);
}
