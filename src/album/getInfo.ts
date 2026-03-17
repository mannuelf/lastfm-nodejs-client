import type { AlbumInfoResponse } from '../lastfm.types.js';
import request from '../request.js';
export async function albumGetInfo(method: string, artist: string, album: string, autocorrect = '1', lang = 'en'): Promise<AlbumInfoResponse> {
  return await request<AlbumInfoResponse>({ method, artist, album, autocorrect, lang });
}
