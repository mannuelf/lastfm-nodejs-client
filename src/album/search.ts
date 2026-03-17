import type { AlbumSearchResponse } from '../lastfm.types.js';
import request from '../request.js';
export async function albumSearch(method: string, album: string, limit = '30', page = '1'): Promise<AlbumSearchResponse> {
  return await request<AlbumSearchResponse>({ method, album, limit, page });
}
