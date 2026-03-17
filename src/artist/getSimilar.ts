import type { ArtistSimilarResponse } from '../lastfm.types.js';
import request from '../request.js';
export async function artistGetSimilar(method: string, artist: string, limit = '30', autocorrect = '1'): Promise<ArtistSimilarResponse> {
  return await request<ArtistSimilarResponse>({ method, artist, limit, autocorrect });
}
