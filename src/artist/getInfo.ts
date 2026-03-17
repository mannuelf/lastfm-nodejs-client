import type { ArtistInfoResponse } from '../lastfm.types.js';
import request from '../request.js';
export async function artistGetInfo(method: string, artist: string, autocorrect = '1', lang = 'en'): Promise<ArtistInfoResponse> {
  return await request<ArtistInfoResponse>({ method, artist, autocorrect, lang });
}
