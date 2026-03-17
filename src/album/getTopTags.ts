import type { AlbumTopTagsResponse } from '../lastfm.types.js';
import request from '../request.js';
export async function albumGetTopTags(method: string, artist: string, album: string, autocorrect = '1'): Promise<AlbumTopTagsResponse> {
  return await request<AlbumTopTagsResponse>({ method, artist, album, autocorrect });
}
