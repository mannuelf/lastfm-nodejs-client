import type { AlbumTagsResponse } from '../lastfm.types.js';
import request from '../request.js';
export async function albumGetTags(method: string, artist: string, album: string, user: string, autocorrect = '1'): Promise<AlbumTagsResponse> {
  return await request<AlbumTagsResponse>({ method, artist, album, user, autocorrect });
}
