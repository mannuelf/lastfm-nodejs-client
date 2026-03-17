import type { ArtistSearchResponse } from '../lastfm.types.js';
import request from '../request.js';
export async function artistSearch(method: string, artist: string, limit = '30', page = '1'): Promise<ArtistSearchResponse> {
  return await request<ArtistSearchResponse>({ method, artist, limit, page });
}
