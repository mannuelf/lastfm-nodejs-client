import type { ArtistTopTracksResponse } from '../lastfm.types.js';
import request from '../request.js';
export async function artistGetTopTracks(method: string, artist: string, limit = '50', page = '1', autocorrect = '1'): Promise<ArtistTopTracksResponse> {
  return await request<ArtistTopTracksResponse>({ method, artist, limit, page, autocorrect });
}
