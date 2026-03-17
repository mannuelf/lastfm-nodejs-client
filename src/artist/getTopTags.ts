import type { ArtistTopTagsResponse } from '../lastfm.types.js';
import request from '../request.js';
export async function artistGetTopTags(method: string, artist: string, autocorrect = '1'): Promise<ArtistTopTagsResponse> {
  return await request<ArtistTopTagsResponse>({ method, artist, autocorrect });
}
