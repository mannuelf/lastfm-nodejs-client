import type { TagTopAlbumsResponse } from '../lastfm.types.js';
import request from '../request.js';
export async function tagGetTopAlbums(method: string, tag: string, limit = '50', page = '1'): Promise<TagTopAlbumsResponse> {
  return await request<TagTopAlbumsResponse>({ method, tag, limit, page });
}
