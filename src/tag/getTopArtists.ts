import type { TagTopArtistsResponse } from '../lastfm.types.js';
import request from '../request.js';
export async function tagGetTopArtists(method: string, tag: string, limit = '50', page = '1'): Promise<TagTopArtistsResponse> {
  return await request<TagTopArtistsResponse>({ method, tag, limit, page });
}
