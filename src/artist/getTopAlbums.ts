import type { ArtistTopAlbumsResponse } from '../lastfm.types.js';
import request from '../request.js';
export async function artistGetTopAlbums(method: string, artist: string, limit = '50', page = '1', autocorrect = '1'): Promise<ArtistTopAlbumsResponse> {
  return await request<ArtistTopAlbumsResponse>({ method, artist, limit, page, autocorrect });
}
