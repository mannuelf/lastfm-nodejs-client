import type { AuthResponse } from '../lastfm.types.js';
import { signedRequest } from '../request.js';
import { config } from '../config.js';
export async function albumAddTags(method: string, artist: string, album: string, tags: string, sk: string): Promise<AuthResponse> {
  return await signedRequest<AuthResponse>({ method, artist, album, tags, sk }, config.share_secret);
}
